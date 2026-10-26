'use client';
import { useState } from 'react';

/* Replaces the old Stripe "pay now" button. The visitor asks for an invoice;
   Mercury emails it in Saleslights Inc.'s name and they pay by bank transfer. */

export default function BookInvoiceForm() {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    setUrl('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please email sales@saleslights.com.');
      setState('done');
      setMessage(data.message);
      if (data.url) setUrl(data.url);
      form.reset();
    } catch (err) {
      setState('error');
      setMessage(err.message);
    }
  }

  return (
    <form className="contact-form" method="post" action="/api/book" onSubmit={onSubmit}>
      <label>Name<input name="name" required autoComplete="name" maxLength={120} /></label>
      <label>Work email<input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={160} /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="button" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Request the invoice'}
      </button>
      <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
      {url ? <p className="muted small"><a href={url} rel="noopener noreferrer" target="_blank">Open your invoice to pay</a></p> : null}
    </form>
  );
}
