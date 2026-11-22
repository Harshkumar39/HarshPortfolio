import { ArrowUpRight, Compass, Lightbulb, Target } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Button } from '../../components/ui/Button'

export default function About() {
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="ABOUT ME" title="A developer shaped by curiosity." description="A little about my journey, what I value, and where I hope to go." />
      <div className="about-layout">
        <div className="about-photo"><img src="/images/profile.jpg" alt="Harsh Kumar" /></div>
        <div className="about-copy">
          <span className="eyebrow">MY STORY</span>
          <h3>Learning, building, and getting better with every project.</h3>
          <p>I'm Harsh Kumar, an aspiring Java Full Stack Developer interested in building useful software from the interface down to the application layer. I enjoy exploring how design and engineering come together to make products feel clear and effortless.</p>
          <p>Right now, I'm focused on strengthening my skills across Java, Spring Boot, React, and modern web development. Every project is an opportunity to ask better questions, learn a new tool, and make the next version a little stronger.</p>
          <Button to="/contact" variant="secondary">Let's connect <ArrowUpRight size={17} /></Button>
        </div>
      </div>
      <div className="values-grid">
        <article className="value-card"><Compass /><h3>Curiosity</h3><p>Stay open, explore deeply, and keep asking why.</p></article>
        <article className="value-card"><Lightbulb /><h3>Craft</h3><p>Care about the details that make a product easier to use.</p></article>
        <article className="value-card"><Target /><h3>Growth</h3><p>Learn through practice, feedback, and iteration.</p></article>
      </div>
      <div className="resume-banner"><div><span className="eyebrow">WANT THE FULL STORY?</span><h3>Take a look at my resume.</h3></div><a className="button-primary" href="/resume.pdf" download>Download resume <ArrowUpRight size={17} /></a></div>
    </section>
  )
}
