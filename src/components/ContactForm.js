'use client';
import { useState } from 'react';

const TOPICS = [
  ['gtm-engine', 'GTM Engine & Sales Professional (retainer)'],
  ['revenue-infrastructure', 'Revenue infrastructure implementation'],
  ['training', 'Sales or cold-call training'],
  ['lead-data', 'Enriched lead data'],
  ['speaking', 'Speaking or workshop'],
  ['other', 'Something else'],
];
const SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];

export default function ContactForm({ defaultTopic = '' }) {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please email sales@saleslights.com.');
      setState('done');
      setMessage(data.message);
      form.reset();
    } catch (err) {
      setState('error');
      setMessage(err.message);
    }
  }

  return (
    <form className="contact-form" method="post" action="/api/contact" onSubmit={onSubmit}>
      <div className="field-row">
        <label>Name<input name="name" required autoComplete="name" maxLength={120} /></label>
        <label>Work email<input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
      </div>
      <div className="field-row">
        <label>Company<input name="company" autoComplete="organization" maxLength={160} /></label>
        <label>Company size
          <select name="size" defaultValue="">
            <option value="">Select</option>
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <label>Interested in
        <select name="topic" required defaultValue={defaultTopic}>
          <option value="" disabled>Select</option>
          {TOPICS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label>What are you trying to solve?<textarea name="message" required rows={5} maxLength={4000} /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="button" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send'}</button>
      <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
