import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { content } from '../data/content';
import { useMotion } from '../hooks/useMotion';
import { gsap, reveal } from '../lib/motion';
import { useUI } from '../lib/store';
import ProjectArt from './ProjectArt';

export default function Projects() {
  const ref = useRef(null), track = useRef(null), tween = useRef(null);
  const open = useUI((state) => state.openProject);
  useMotion(ref, () => {
    reveal(ref.current);
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px)', () => {
      // One pixel of vertical travel advances one pixel through the pinned gallery.
      const distance = () => Math.max(0, track.current.scrollWidth - track.current.clientWidth);
      tween.current = gsap.to(track.current, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '.work-pin', start: 'top 76px', end: () => `+=${distance()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } });
      return () => { tween.current = null; };
    });
    return () => media.revert();
  });
  function move(direction) {
    const trigger = tween.current?.scrollTrigger;
    if (trigger) {
      const step = (trigger.end - trigger.start) / Math.max(1, content.projects.length - 1);
      window.scrollTo({ top: Math.min(trigger.end, Math.max(trigger.start, window.scrollY + direction * step)), behavior: 'instant' });
    } else track.current.scrollBy({ left: direction * track.current.clientWidth * 0.85, behavior: 'instant' });
  }
  function focusCard(index) {
    const trigger = tween.current?.scrollTrigger;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * index / Math.max(1, content.projects.length - 1), behavior: 'instant' });
  }
  return <section ref={ref} id="work" className="work-section" aria-labelledby="work-title"><div className="work-pin">
    <div className="work-heading"><div><p className="eyebrow" data-reveal>02 / SELECTED PROJECT WORK</p><h2 id="work-title" className="section-title" data-reveal>Intelligence in practice<span className="text-accent">.</span></h2></div><div className="gallery-controls"><button className="icon-button" aria-label="Previous project" onClick={() => move(-1)}><ArrowLeft size={20} /></button><button className="icon-button" aria-label="Next project" onClick={() => move(1)}><ArrowRight size={20} /></button></div></div>
    <div className="work-viewport"><div ref={track} className="work-track">{content.projects.map((project, index) => <button key={project.id} className="project-card" data-cursor="view" onClick={() => open(project)} onFocus={() => focusCard(index)} aria-label={`Read ${project.name} case study`}><div className="project-cover"><ProjectArt project={project} /><span className="project-open"><ArrowUpRight size={24} /></span></div><div className="project-caption"><div><span className="eyebrow text-muted">{project.number} / {project.type}</span><h3>{project.name}</h3></div><span className="eyebrow">{project.number} / {String(content.projects.length).padStart(2, '0')}</span></div><p>{project.summary}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></button>)}</div></div>
    <p className="work-note eyebrow text-muted">SCROLL TO EXPLORE / SELECT A PROJECT FOR THE STORY</p>
  </div></section>;
}
