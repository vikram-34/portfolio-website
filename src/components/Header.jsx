import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Pause, Play } from 'lucide-react';
import { content } from '../data/content';
import { useUI } from '../lib/store';
import { useReducedMotion } from '../hooks/useMotion';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const toggleMotion = useUI((state) => state.toggleMotion);
  const reduced = useReducedMotion();
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    function escape(event) { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } }
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header">
    <a className="logo" href="#top" aria-label={`${content.name}, back to top`}>{content.initials}<span>®</span></a>
    <span className="header-caption">SOFTWARE DEVELOPER<br />AI / LLM ENGINEER</span>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {[['Work', 'work'], ['About', 'about'], ['Experience', 'experience'], ['Background', 'education']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>{content.cta} <ArrowUpRight size={16} /></a>
    </nav>
    <button className="icon-button motion-toggle" onClick={toggleMotion} disabled={systemReduced} aria-label={systemReduced ? 'Reduced motion enabled by your system' : reduced ? 'Enable animation' : 'Pause animation'} title={systemReduced ? 'System reduced motion enabled' : reduced ? 'Enable animation' : 'Pause animation'}>{reduced ? <Play size={16} /> : <Pause size={16} />}</button>
    <button ref={menuButton} className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
  </header>;
}
