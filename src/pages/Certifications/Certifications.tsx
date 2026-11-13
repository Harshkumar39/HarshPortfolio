import { useState, type TouchEvent } from 'react'
import { ArrowLeft, ArrowRight, Award } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { certifications } from '../../data/certifications'

export default function Certifications() {
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const move = (offset: number) => setIndex((current) => (current + offset + certifications.length) % certifications.length)
  const onTouchStart = (event: TouchEvent<HTMLElement>) => setTouchStart(event.touches[0]?.clientX ?? null)
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const end = event.changedTouches[0]?.clientX
    if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 40) move(end < touchStart ? 1 : -1)
    setTouchStart(null)
  }
  const current = certifications[index]
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="CERTIFICATIONS" title="Learning, recognized." description="A selection of courses and credentials that support continuous learning." />
      {current ? <div className="certificate-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><button className="icon-button carousel-button" onClick={() => move(-1)} aria-label="Previous certificate"><ArrowLeft /></button><Card className="certificate-card"><span className="certificate-art"><Award size={54} /></span><span className="eyebrow">{current.organization}</span><h3>{current.name}</h3><p>Issued {current.issueDate}</p>{current.certificateUrl && <a className="text-link" href={current.certificateUrl} target="_blank" rel="noreferrer">View certificate <ArrowRight size={16} /></a>}</Card><button className="icon-button carousel-button" onClick={() => move(1)} aria-label="Next certificate"><ArrowRight /></button></div> :
        <Card className="empty-state"><span className="empty-icon"><Award /></span><span className="eyebrow">KEEP GROWING</span><h3>No certifications added yet.</h3><p>Verified certificates and course credentials will be listed here.</p></Card>}
      {certifications.length > 1 && <div className="carousel-dots" aria-label={`Certificate ${index + 1} of ${certifications.length}`}>{certifications.map((item, dot) => <button key={item.id} onClick={() => setIndex(dot)} className={index === dot ? 'active' : ''} aria-label={`Show certificate ${dot + 1}`} />)}</div>}
    </section>
  )
}
