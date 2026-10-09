import { useRef } from 'react';
import { content } from '../data/content';
import { useMotion } from '../hooks/useMotion';
import { gsap, reveal } from '../lib/motion';

export default function About() {
  const ref = useRef(null);
  useMotion(ref, () => {
    reveal(ref.current);
    const media = gsap.matchMedia();
    // Keep the systems diagram visible while the biography scrolls past.
    media.add('(min-width: 1024px)', () => {
      gsap.to('.about-image img', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true } });
      gsap.to('.about-image', { scrollTrigger: { trigger: '.about-image', start: 'top 120px', endTrigger: '.about-copy', end: 'bottom 75%', pin: true, pinSpacing: false, invalidateOnRefresh: true } });
    });
    gsap.from('.about-image', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.about-image', start: 'top 85%', once: true } });
    return () => media.revert();
  });
  return <section ref={ref} id="about" className="section about" aria-labelledby="about-title">
    <div className="section-label" data-reveal><span className="eyebrow">01 / THE ENGINEER BEHIND THE SYSTEMS</span><span className="section-rule" /></div>
    <div className="about-layout">
      <figure className="about-image"><img src="/process.svg" width="640" height="680" alt="Vikram's engineering focus: AI agents, backend APIs, distributed systems, and cloud infrastructure." loading="lazy" /><figcaption className="eyebrow">PYTHON · FASTAPI · LANGGRAPH · AWS</figcaption></figure>
      <div className="about-copy">
        <h2 id="about-title" className="section-title" data-reveal>Intelligent software.<br />Reliable systems.<br /><span className="text-muted">Curiosity at the core.</span></h2>
        <p className="large-copy" data-reveal>{content.bio}</p>
        {content.aboutDetails.map((paragraph) => <p className="text-muted" key={paragraph} data-reveal>{paragraph}</p>)}
        <div className="about-focus" data-reveal><h3 className="eyebrow">CURRENT FOCUS</h3><div className="tags">{content.focus.map((item) => <span key={item}>{item}</span>)}</div></div>
        <dl className="profile-metrics" data-reveal>{content.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
        <p className="text-muted" data-reveal>{content.careerObjective}</p>
      </div>
    </div>
  </section>;
}
