import { IS_PRODUCTION, SITE_ENV } from '../../../lib/env';

export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({ ok: true, env: SITE_ENV, production: IS_PRODUCTION, sha: process.env.DEPLOY_SHA || 'unknown' }, { headers: { 'Cache-Control': 'no-store' } });
}
