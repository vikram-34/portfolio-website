import { useRef } from 'react';
import { GraduationCap, Users } from 'lucide-react';
import { content } from '../data/content';
import { reveal } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

export default function Background() {
  const ref = useRef(null);
  useMotion(ref, () => reveal(ref.current));
  return <section ref={ref} id="education" className="section background-section" aria-labelledby="background-title">
    <p className="eyebrow" data-reveal>05 / EDUCATION & ACTIVITIES</p><h2 id="background-title" className="section-title" data-reveal>Learning.<br /><span className="text-muted">Contributing. Building.</span></h2>
    <div className="background-grid">
      <div><h3 className="background-label" data-reveal><GraduationCap size={22} />College education</h3>
        {content.education.map((item) => <article className="education-card" key={item.degree} data-reveal><p className="eyebrow text-accent">{item.year}</p><h4>{item.degree}</h4><p>{item.school}</p><p className="text-muted">{item.affiliation}</p><strong>{item.result}</strong>
          <h5 className="eyebrow coursework-heading">RELEVANT COURSEWORK</h5><div className="tags">{item.coursework.map((course) => <span key={course}>{course}</span>)}</div>
          <ul className="detail-list education-achievements">{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
        </article>)}
      </div>
      <div id="leadership"><h3 className="background-label" data-reveal><Users size={22} />Leadership & activities</h3>
        {content.activities.map((activity) => <article className="activity-card" key={activity.role} data-reveal>{activity.period && <p className="eyebrow text-accent">{activity.period}</p>}<h4>{activity.role}</h4><p className="activity-organization">{activity.organization}</p><p className="text-muted">{activity.description}</p></article>)}
      </div>
    </div>
  </section>;
}
