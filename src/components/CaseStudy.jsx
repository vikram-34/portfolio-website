import { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../lib/store';
import { scrollEngine } from '../lib/motion';
import { useReducedMotion } from '../hooks/useMotion';
import ProjectArt from './ProjectArt';

export default function CaseStudy() {
  const project = useUI((state) => state.project), close = useUI((state) => state.closeProject);
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current, previous = document.activeElement;
    const overflow = document.body.style.overflow;
    scrollEngine.current?.stop(); document.body.style.overflow = 'hidden';
    dialog.showModal(); dialog.scrollTop = 0;
    return () => { dialog.close(); document.body.style.overflow = overflow; scrollEngine.current?.start(); previous?.focus({ preventScroll: true }); };
  }, [project]);
  return <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === ref.current) close(); }} data-lenis-prevent>
    {project && <motion.article className="case-content" initial={reduced ? false : { y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="case-top"><span className="eyebrow">PROJECT / {project.number} / {project.type}</span><button autoFocus className="icon-button" aria-label="Close case study" onClick={close}><X /></button></div>
      <h2 id="case-title">{project.fullName || project.name}</h2><p className="case-subtitle">{project.title}</p><ProjectArt project={project} />
      <dl className="case-facts"><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>TEAM</dt><dd>{project.team}</dd></div>{project.status && <div><dt>STATUS</dt><dd>{project.status}</dd></div>}</dl>
      <section className="case-section"><h3>The project</h3><p>{project.summary}</p></section>
      {project.problem && <section className="case-section"><h3>The problem</h3><p>{project.problem}</p></section>}
      {project.features.length > 0 && <section className="case-section"><h3>What it does</h3><ul className="detail-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}
      {project.contribution && <section className="case-section"><h3>My contribution</h3><p>{project.contribution}</p></section>}
      {project.architecture && <section className="case-section"><h3>Architecture</h3><p>{project.architecture}</p></section>}
      {project.outcomes.length > 0 && <section className="case-section"><h3>Results & evaluation</h3><ul className="detail-list">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>}
      <section className="case-section"><h3>Technology</h3><div className="tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
      {project.screenshots.slice(1).map((screenshot) => <figure className="case-screenshot" key={screenshot.src}><img src={screenshot.src} alt={screenshot.alt || `${project.name} screenshot`} loading="lazy" /></figure>)}
      {project.videos?.map((video) => <figure className="case-screenshot case-video" key={video.src}><video src={video.src} controls playsInline preload="metadata" aria-label={video.title} /></figure>)}
      {(project.repository || project.live) && <div className="case-links">
        {project.live && <a className="button button-primary" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live demo (opens new tab)`}><ExternalLink size={18} />Live demo</a>}
        {project.repository && <a className="button button-secondary" href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} repository (opens new tab)`}><Github size={18} />View repository<ArrowUpRight size={18} /></a>}
      </div>}
    </motion.article>}
  </dialog>;
}
