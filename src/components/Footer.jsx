import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { content } from '../data/content';
import { gsap, reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

export default function Footer() {
  const ref = useRef(null), word = useRef(null), hoverTween = useRef(null);
  const reduced = useMotion(ref, () => {
    reveal(ref.current);
    return () => hoverTween.current?.kill();
  });
  function distort(active) {
    if (reduced) return;
    hoverTween.current?.kill();
    // A single transform tween adds kinetic type without forcing text reflow.
    hoverTween.current = gsap.to(word.current, { skewX: active ? -7 : 0, x: active ? 10 : 0, duration: 0.5, ease: 'power3.out' });
  }
  return <footer ref={ref} className="footer"><a href={`mailto:${content.email}`} className="footer-call" onPointerEnter={() => distort(true)} onPointerLeave={() => distort(false)} onFocus={() => distort(true)} onBlur={() => distort(false)} data-reveal><span ref={word}>LET’S TALK</span><ArrowUpRight strokeWidth={1} /></a><div className="footer-bottom"><span>© {new Date().getFullYear()} {content.name}</span><nav className="footer-socials" aria-label="Social profiles">{content.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens new tab)`}>{social.label}</a>)}</nav><a href="#top">BACK TO TOP ↑</a></div></footer>;
}
