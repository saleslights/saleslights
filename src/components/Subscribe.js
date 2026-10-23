'use client';
import { useState } from 'react';

/* Newsletter sign-up. Posts to /api/subscribe; works without JS as a plain POST. */
export default function Subscribe({ source = 'site', compact = false }) {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setState('done');
      setMessage(data.message || 'You are on the list.');
      form.reset();
    } catch (err) {
      setState('error');
      setMessage(err.message);
    }
  }

  return (
    <form className={`subscribe ${compact ? 'compact' : ''}`} method="post" action="/api/subscribe" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={`email-${source}`}>Email address</label>
      <input id={`email-${source}`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      <input type="hidden" name="source" value={source} />
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Joining…' : 'Subscribe'}</button>
      <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
