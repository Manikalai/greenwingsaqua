import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

// The enquiry goes two ways at once: WhatsApp opens with the message typed out,
// and the same enquiry lands in the staff dashboard as a lead, so a visitor who
// never presses Send in WhatsApp still gets a call back.
//
// The key is the public "anon" key: all it can do here is call submit_enquiry,
// which accepts one enquiry and reads nothing back (db/018 in greenwings-app).
const ENQUIRY_URL = 'https://hgprjbmelbmawnewsawh.supabase.co/rest/v1/rpc/submit_enquiry';
const ENQUIRY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHJqYm1lbGJtYXduZXdzYXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5ODY0NjAsImV4cCI6MjEwMzU2MjQ2MH0.SPx2SqTQXaIqniA5DoVaQmv5zb1VLJIXjnORZCV85rc';

const SERVICES = ['New purifier purchase', 'Installation', 'Repair / not working', 'Filter / membrane change', 'AMC plan enquiry', 'Other'];
const field = 'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100';

export default function EnquiryForm({ waNumber }: { waNumber: string }) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const [name, phone, service, address, details] = ['name', 'phone', 'service', 'address', 'message'].map(get);

    // WhatsApp first: a popup opened after waiting on the network is blocked by
    // most browsers, because it no longer counts as the visitor's tap.
    const lines = ['New enquiry from greenwingsaqua.com', `Name: ${name}`, `Phone: ${phone}`, `Service needed: ${service}`];
    if (address) lines.push(`Address: ${address}`);
    if (details) lines.push(`Details: ${details}`);
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');

    if (get('company_url')) return;   // spam trap: people never fill the hidden field
    setState('saving');
    const form = e.currentTarget;
    fetch(ENQUIRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: ENQUIRY_KEY, Authorization: `Bearer ${ENQUIRY_KEY}` },
      body: JSON.stringify({ p_name: name, p_phone: phone, p_service: service, p_area: address || null, p_message: details || null }),
    }).then(async (res) => {
      if (res.ok) { setState('saved'); form.reset(); return; }
      // The database words a bad phone number in a way the visitor can act on.
      const body = await res.json().catch(() => ({}));
      setMessage(body.message || 'We could not save your enquiry. Please send it on WhatsApp or call us.');
      setState('error');
    }).catch(() => {
      setMessage('We could not save your enquiry. Please send it on WhatsApp or call us.');
      setState('error');
    });
  };

  if (state === 'saved') {
    return (
      <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-brand-50 to-aqua-50 px-6 py-14 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-white text-emerald-500 shadow-lg"><CheckCircle2 className="size-9" /></span>
        <h3 className="mt-5 text-2xl font-bold">Thank you!</h3>
        <p className="mt-2 max-w-sm text-ink-600">We have your enquiry and will call you back soon. If WhatsApp opened, press Send there too.</p>
        <button type="button" onClick={() => setState('idle')} className="btn-ghost mt-6">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-ink-800">Full name
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-ink-800">Phone number
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-ink-800">What do you need?
        <select name="service" required defaultValue="" className={field}>
          <option value="" disabled>Select an option</option>
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink-800">Address / area in Sivagangai
        <input name="address" autoComplete="street-address" placeholder="e.g. Aranmanai Vaasal, Sivaganga" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink-800">Additional details <span className="font-normal text-ink-500">(optional)</span>
        <textarea name="message" rows={4} placeholder="Tell us more about the issue or request" className={`${field} h-auto py-3`} />
      </label>
      <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label>Leave this empty<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state === 'error' && <p role="status" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
      <button type="submit" disabled={state === 'saving'} className="btn-whatsapp mt-1 w-full !py-3.5 text-base">
        {state === 'saving' ? <Loader2 className="size-5 animate-spin" /> : <MessageCircle className="size-5" />}
        Send enquiry
      </button>
      <p className="text-center text-xs text-ink-500">We'll call you back — WhatsApp also opens with your message ready to send.</p>
    </form>
  );
}
