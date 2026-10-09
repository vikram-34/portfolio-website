import { useRef } from 'react';
import { Code2, Database, Braces, Container, Server, Radio } from 'lucide-react';
import { content } from '../data/content';
import { gsap, reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

const icons = [Code2, Server, Database, Database, Container, Braces, Radio, Server];
export default function Skills() {
  const ref = useRef(null);
  useMotion(ref, () => {
    reveal(ref.current);
    // Scroll drives both the technology strip and a restrained rotation of its icons.
    gsap.to('.tech-strip', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.tech-icon', { rotation: 30, stagger: 0.03, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  return <section ref={ref} id="skills" className="skills-section" aria-labelledby="skills-title">
    <div className="skills-heading" data-reveal><h2 id="skills-title" className="eyebrow">03 / SYSTEMS BLUEPRINT</h2><p className="text-muted">AI applications. Backend systems. Cloud.</p></div>
    <div className="tech-overflow"><div className="tech-strip">{[0, 1].map((copy) => <div className="tech-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{content.stack.map((name, index) => { const Icon = icons[index % icons.length]; return <span className="tech-item" key={name}><Icon className="tech-icon" strokeWidth={1} />{name}<span className="tech-divider">/</span></span>; })}</div>)}</div></div>
    <div className="skill-strengths" data-reveal><h3 className="eyebrow">CORE STRENGTHS</h3><div className="tags">{content.strongestSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="stack-categories">{content.skills.map((group) => <div className="stack-category" key={group.name} data-reveal><h3>{group.name}</h3><div className="tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
  <div className="learning-block" data-reveal><h3 className="eyebrow">CURRENTLY LEARNING & DEEPENING</h3><div className="tags">{content.learning.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>;
}
