import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { content } from '../data/content';
import { reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';
import Magnetic from './Magnetic';

const socialIcons = { Github, Linkedin };
const ContactScene = lazy(() => import('../scenes/ContactScene'));
export default function Contact() {
  const ref = useRef(null), request = useRef(null), timer = useRef(null);
  const [status, setStatus] = useState(''), [busy, setBusy] = useState(false), [copied, setCopied] = useState(false);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  useMotion(ref, () => reveal(ref.current));
  useEffect(() => () => { request.current?.abort(); clearTimeout(timer.current); }, []);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.website) return;
    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
      window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
      setStatus('Your email app has been requested. Review and send your message there. If it does not open, copy the email address beside this form.');
      return;
    }
    setBusy(true); setStatus('Sending your message…');
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
      if (!response.ok) throw new Error('Request rejected');
      setStatus('Your message was received. Thank you for getting in touch.'); form.reset();
    } catch { setStatus('Your message could not be sent. Please try again or contact me by email. Your draft is still here.'); }
    finally { clearTimeout(timeout); setBusy(false); request.current = null; }
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(content.email); setCopied(true); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2500); }
    catch { setStatus(`You can email me at ${content.email}.`); }
  }
  return <section ref={ref} id="contact" className="section contact" aria-labelledby="contact-title"><Suspense fallback={null}><ContactScene /></Suspense><div className="contact-copy"><p className="eyebrow" data-reveal>06 / GET IN TOUCH</p><h2 id="contact-title" data-reveal>{content.contactHeading[0]}<br /><span className="text-accent">{content.contactHeading[1]}</span></h2><p className="large-copy" data-reveal><span className="text-muted">{content.contactMessage}</span></p><p className="contact-availability" data-reveal>{content.opportunity}</p><div className="tags target-roles" data-reveal>{content.targetRoles.map((role) => <span key={role}>{role}</span>)}</div><div className="email-row" data-reveal><a href={`mailto:${content.email}`}>{content.email}</a><button className="icon-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={18} /> : <Copy size={18} />}</button><span className="sr-only" role="status">{copied ? 'Email address copied' : ''}</span></div><a className="phone-link" href={content.phoneHref} data-reveal><Phone size={17} />{content.phone}</a><div className="social-links" data-reveal>{content.socials.filter((social) => social.contact).map((social) => { const Icon = socialIcons[social.icon] || Mail; return <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens new tab)`}><Icon size={18} />{social.label}<ArrowUpRight size={14} /></a>; })}</div></div>
    <form className="contact-form" onSubmit={submit} data-reveal><div className="field"><input id="contact-name" name="name" placeholder=" " autoComplete="name" minLength={2} maxLength={100} required /><label htmlFor="contact-name">Your name</label></div><div className="field"><input id="contact-email" name="email" type="email" placeholder=" " autoComplete="email" maxLength={254} required /><label htmlFor="contact-email">Email address</label></div><div className="field"><textarea id="contact-message" name="message" placeholder=" " rows={4} minLength={10} maxLength={5000} required /><label htmlFor="contact-message">Tell me what you’re thinking</label></div><div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div><Magnetic><button type="submit" className="button button-primary" disabled={busy}>{busy ? 'Sending…' : endpoint ? 'Send message' : 'Compose email'}<ArrowUpRight size={18} /></button></Magnetic><p className="form-help">{endpoint ? 'Your details are used only to reply to your enquiry.' : 'Opens your email app with your message ready to send.'}</p><p className="form-status" role="status" aria-live="polite">{status}</p></form>
  </section>;
}
