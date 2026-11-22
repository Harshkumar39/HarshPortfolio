import { ArrowLeft, ArrowUpRight, Layers3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SocialIcon } from '../../components/ui/SocialIcon'
import { projects } from '../../data/projects'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <section className="section container page-section">
        <Card className="empty-state">
          <span className="empty-icon"><Layers3 /></span>
          <span className="eyebrow">PROJECT NOT FOUND</span>
          <h2>This project is not in the portfolio.</h2>
          <Link className="text-link" to="/projects"><ArrowLeft size={16} /> Back to projects</Link>
        </Card>
      </section>
    )
  }

  return (
    <article className="section container page-section project-detail-page">
      <Link className="text-link project-detail-back" to="/projects"><ArrowLeft size={16} /> All projects</Link>
      <div className="project-detail-heading">
        <span className="eyebrow">{project.category}{project.featured ? ' / FEATURED' : ''}</span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <div className="project-detail-layout">
        <div className="project-detail-content">
          {(project.gallery?.length ? project.gallery : project.image ? [project.image] : []).map((image) => (
            <img className="project-detail-image" src={image} alt={`${project.title} project screenshot`} key={image} />
          ))}
          <section className="project-detail-section">
            <span className="eyebrow">OVERVIEW</span>
            <h2>About this project</h2>
            <p>{project.longDescription || project.description}</p>
          </section>
        </div>
        <aside className="project-detail-aside">
          <Card className="project-detail-info">
            <span className="eyebrow">TECH STACK</span>
            <div className="badge-row">{project.tech.map((item) => <Badge key={item}>{item}</Badge>)}</div>
            {project.githubUrl && <a className="button-primary project-source-link" href={project.githubUrl} target="_blank" rel="noreferrer"><SocialIcon name="GitHub" size={17} /> View source <ArrowUpRight size={15} /></a>}
            {project.liveUrl && <a className="button-secondary project-source-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}
          </Card>
        </aside>
      </div>
    </article>
  )
}
