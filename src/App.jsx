import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { content } from './data/content';
import { useUI } from './lib/store';
import { ScrollTrigger } from './lib/motion';
import { useReducedMotion } from './hooks/useMotion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Header from './components/Header';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CaseStudy from './components/CaseStudy';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Background from './components/Background';
import Footer from './components/Footer';

export default function App() {
  const ready = useUI((state) => state.ready);
  const reduced = useReducedMotion();
  useSmoothScroll();
  useEffect(() => {
    document.title = `${content.name} — ${content.role}`;
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [reduced, ready]);
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; };
  }, []);
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{!ready && <Preloader />}<a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><Hero /><About /><Projects /><Skills /><Experience /><Background /><Contact /></main><Footer /><CaseStudy /><Cursor /></MotionConfig>;
}
