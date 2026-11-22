import { Printer } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { experience } from '../../data/experience'
import { education } from '../../data/education'
import { projects } from '../../data/projects'
import { certifications } from '../../data/certifications'
import { skills } from '../../data/skills'
import { socialLinks } from '../../data/social'

export default function Resume() {
  const github = socialLinks.find((link) => link.name === 'GitHub')
  const linkedIn = socialLinks.find((link) => link.name === 'LinkedIn')

  return (
    <article className="section container page-section resume-page">
      <div className="resume-toolbar no-print">
        <p>Print-friendly resume view</p>
        <Button type="button" onClick={() => window.print()}><Printer size={16} /> Print / Save as PDF</Button>
      </div>
      <div className="resume-sheet">
        <header className="resume-header">
          <div>
            <h1>Harsh Kumar</h1>
            <p>Java Full Stack Developer</p>
          </div>
          <div className="resume-contact">
            <a href="mailto:nwithproof@gmail.com">nwithproof@gmail.com</a>
            {github && <a href={github.url}>{github.url}</a>}
            {linkedIn && <a href={linkedIn.url}>LinkedIn profile</a>}
          </div>
        </header>

        <section>
          <h2>Education</h2>
          {education.map((item) => (
            <div className="resume-entry" key={item.id}>
              <div><h3>{item.degree}</h3><p>{item.institution}</p></div>
              <span>{item.duration}</span>
              {item.milestones?.map((milestone) => <p className="resume-detail" key={milestone}>{milestone}</p>)}
            </div>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((item) => (
            <div className="resume-entry" key={item.id}>
              <div><h3>{item.role}</h3><p>{item.company}</p></div>
              <span>{item.duration}</span>
              <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((project) => (
            <div className="resume-entry resume-project" key={project.id}>
              <div><h3>{project.title}</h3><p>{project.longDescription || project.description}</p></div>
              <span>{project.tech.join(' · ')}</span>
              {project.githubUrl && <a href={project.githubUrl}>{project.githubUrl}</a>}
            </div>
          ))}
        </section>

        <section>
          <h2>Technical Skills</h2>
          <p>{skills.map((skill) => skill.name).join(' · ')}</p>
        </section>

        <section>
          <h2>Certifications</h2>
          <ul className="resume-certifications">{certifications.map((certification) => <li key={certification.id}>{certification.name} — {certification.organization}</li>)}</ul>
        </section>
      </div>
    </article>
  )
}
