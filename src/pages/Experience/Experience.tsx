import { BriefcaseBusiness, CalendarDays } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { experience } from '../../data/experience'

export default function ExperiencePage() {
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="MY JOURNEY" title="Experience & growth." description="The roles and experiences that have shaped my path so far." />
      {experience.length ? <div className="timeline">{experience.map((item) => <Card className="timeline-card" key={item.id}><span className="eyebrow">{item.company}</span><h3>{item.role}</h3><p className="timeline-date"><CalendarDays size={15} />{item.duration}</p><ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>{item.achievements?.map((achievement) => <p key={achievement}>{achievement}</p>)}</Card>)}</div> :
        <Card className="empty-state"><span className="empty-icon"><BriefcaseBusiness /></span><span className="eyebrow">THE NEXT CHAPTER</span><h3>Experience will appear here.</h3><p>Verified roles, internships, and contributions will be added here when available.</p></Card>}
    </section>
  )
}
