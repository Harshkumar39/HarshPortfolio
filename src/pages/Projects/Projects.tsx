import { useMemo, useState } from 'react'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import type { PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'

const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Other'] as const
type Filter = typeof filters[number]

function updateCardSpotlight(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.category === filter), [filter])
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="SELECTED WORK" title="A few things I've been building." description="A selection of full-stack and frontend projects with source code available on GitHub." />
      <div className="filter-row" role="group" aria-label="Filter projects by category">{filters.map((item) => <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
      <div className="project-grid">{visibleProjects.map((project, index) => <Card className={`project-card ${project.featured ? 'featured-project' : ''}`} key={project.id} onPointerMove={updateCardSpotlight}>
        <div className={`project-art project-art-${index % 4}`} aria-label={`${project.title} project preview`}>
          {project.image ? <img src={project.image} alt={`${project.title} preview`} /> : <><span>0{index + 1}</span><Layers3 size={48} strokeWidth={1.2} /><i>{project.tech[0]}</i></>}
        </div>
        <div className="project-body"><div className="project-title-row"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3></div>{project.featured && <span className="featured-tag">Featured</span>}</div>
          <p>{project.description}</p><div className="badge-row">{project.tech.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
          <div className="project-links"><Link to={`/projects/${project.id}`}>Case study <ArrowUpRight size={15} /></Link>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight size={15} /></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}<details className="project-details"><summary>View details <ArrowUpRight size={14} /></summary><p>{project.longDescription || project.description}</p></details></div>
        </div>
      </Card>)}</div>
    </section>
  )
}
