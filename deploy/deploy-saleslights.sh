#!/usr/bin/env bash
# Saleslights deploy for the KVM 2 host (srv2043202 / 179.236.255.156).
#   bash deploy-saleslights.sh staging|production <40-char-sha>   (GitHub token on stdin)
# Isolated from other apps on the host: own release tree, PM2 name and loopback ports.
# Builds a candidate, proves it on a spare port with the repo's route gate, then swaps.
set -Eeuo pipefail
umask 027
export PATH=/opt/node-v22/bin:$PATH
TIER=${1:?staging|production required}
EXPECTED_SHA=${2:?expected commit SHA required}
[[ "$EXPECTED_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo INVALID_SHA; exit 2; }
case "$TIER" in
  staging)    ROOT=/var/www/saleslights-staging; APP=saleslights-staging; PORT=3011; CANDIDATE_PORT=3013; REF=${DEPLOY_REF:-staging}; ORIGIN=https://staging.saleslights.com ;;
  production) ROOT=/var/www/saleslights;         APP=saleslights-prod;    PORT=3010; CANDIDATE_PORT=3012; REF=${DEPLOY_REF:-main};    ORIGIN=https://saleslights.com ;;
  *) echo INVALID_TIER; exit 2 ;;
esac
ENVFILE="$ROOT/shared/env"
[[ -f "$ENVFILE" ]] || { echo "MISSING_ENV_FILE $ENVFILE"; exit 2; }

exec 9>"/var/lock/$APP-deploy.lock"
flock -n 9 || { echo DEPLOY_LOCKED; exit 75; }

IFS= read -r GH_TOKEN
[[ -n "$GH_TOKEN" ]] || { echo MISSING_TOKEN; exit 2; }
export GIT_TERMINAL_PROMPT=0 GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=http.https://github.com/.extraheader
GIT_CONFIG_VALUE_0="AUTHORIZATION: basic $(printf 'x-access-token:%s' "$GH_TOKEN" | base64 -w0)"
export GIT_CONFIG_VALUE_0

RELEASE="$ROOT/releases/$(date -u +%Y%m%dT%H%M%SZ)-${EXPECTED_SHA:0:12}"
mkdir -p "$ROOT/releases" "$RELEASE"
git -c credential.helper= clone --quiet --depth=20 --branch "$REF" --single-branch https://github.com/saleslights/saleslights.git "$RELEASE"
unset GH_TOKEN GIT_CONFIG_VALUE_0 GIT_CONFIG_COUNT GIT_CONFIG_KEY_0
cd "$RELEASE"
git checkout --quiet "$EXPECTED_SHA" || { echo "SHA_NOT_ON_$REF"; exit 3; }

set -a; . "$ENVFILE"; set +a
export SITE_ENV="$TIER" DEPLOY_SHA="$EXPECTED_SHA" NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL="$ORIGIN"
[[ "$TIER" == staging ]] && export FORMS_DRY_RUN=true

npm ci --no-audit --no-fund
npm audit --omit=dev
npm run build

node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port "$CANDIDATE_PORT" > "$ROOT/shared/candidate.log" 2>&1 &
CANDIDATE_PID=$!
trap 'kill $CANDIDATE_PID 2>/dev/null || true' EXIT
for _ in $(seq 1 45); do
  curl -fsS "http://127.0.0.1:$CANDIDATE_PORT/api/health/" | grep -q "\"sha\":\"$EXPECTED_SHA\"" && break
  sleep 2
done
BASE_URL="http://127.0.0.1:$CANDIDATE_PORT" EXPECT_ENV="$TIER" node scripts/verify-routes.mjs
kill "$CANDIDATE_PID" 2>/dev/null || true; trap - EXIT

OLD=$(readlink -f "$ROOT/current" 2>/dev/null || true)
ln -sfn "$RELEASE" "$ROOT/current.next" && mv -Tf "$ROOT/current.next" "$ROOT/current"
pm2 describe "$APP" >/dev/null 2>&1 && pm2 delete "$APP" >/dev/null
pm2 start "$ROOT/current/node_modules/next/dist/bin/next" --name "$APP" --cwd "$ROOT/current" \
  --interpreter /opt/node-v22/bin/node -- start --hostname 127.0.0.1 --port "$PORT" >/dev/null
for _ in $(seq 1 45); do
  if curl -fsS "http://127.0.0.1:$PORT/api/health/" | grep -q "\"sha\":\"$EXPECTED_SHA\""; then
    pm2 save >/dev/null
    ls -1dt "$ROOT"/releases/* | tail -n +4 | xargs -r rm -rf
    echo "HEALTHY $TIER $EXPECTED_SHA"; exit 0
  fi
  sleep 2
done
pm2 delete "$APP" >/dev/null || true
if [[ -n "$OLD" && -d "$OLD" ]]; then
  ln -sfn "$OLD" "$ROOT/current.rb" && mv -Tf "$ROOT/current.rb" "$ROOT/current"
  pm2 start "$ROOT/current/node_modules/next/dist/bin/next" --name "$APP" --cwd "$ROOT/current" \
    --interpreter /opt/node-v22/bin/node -- start --hostname 127.0.0.1 --port "$PORT" >/dev/null
fi
pm2 save >/dev/null
echo DEPLOY_FAILED_ROLLED_BACK; exit 6
