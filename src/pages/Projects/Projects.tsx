import { useMemo, useState } from 'react'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'

const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Other'] as const
type Filter = typeof filters[number]

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.category === filter), [filter])
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="SELECTED WORK" title="A few things I've been building." description="Project examples are placeholders until verified work, screenshots, and repository links are provided." />
      <div className="filter-row" role="group" aria-label="Filter projects by category">{filters.map((item) => <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
      <div className="project-grid">{visibleProjects.map((project, index) => <Card className={`project-card ${project.featured ? 'featured-project' : ''}`} key={project.id}>
        <div className={`project-art project-art-${index % 4}`} aria-label={`${project.title} project preview placeholder`}><span>0{index + 1}</span><Layers3 size={48} strokeWidth={1.2} /><i>{project.tech[0]}</i></div>
        <div className="project-body"><div className="project-title-row"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3></div></div>
          <p>{project.description}</p><div className="badge-row">{project.tech.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
          <div className="project-links">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight size={15} /></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}<details className="project-details"><summary>View details <ArrowUpRight size={14} /></summary><p>{project.longDescription || project.description}</p></details></div>
        </div>
      </Card>)}</div>
    </section>
  )
}
