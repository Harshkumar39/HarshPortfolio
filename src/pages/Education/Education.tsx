import { GraduationCap } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { education } from '../../data/education'

export default function EducationPage() {
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="EDUCATION" title="The foundations." description="Academic milestones and learning experiences along the way." />
      {education.length ? <div className="timeline">{education.map((item) => <Card className="timeline-card" key={item.id}><span className="eyebrow">{item.duration}</span><h3>{item.degree}</h3><p>{item.institution}</p>{item.milestones?.length ? <ul>{item.milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}</ul> : null}</Card>)}</div> :
        <Card className="empty-state"><span className="empty-icon"><GraduationCap /></span><span className="eyebrow">ALWAYS LEARNING</span><h3>Education details coming soon.</h3><p>Institution, degree, dates, and academic milestones will be added once confirmed.</p></Card>}
    </section>
  )
}
