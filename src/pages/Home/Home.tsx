import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { experience } from '../../data/experience'
import { socialLinks } from '../../data/social'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'

export default function Home() {
  const reducedMotion = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = ['Java Full Stack Developer', 'Frontend Developer', 'Lifelong Learner']
  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 2600)
    return () => window.clearInterval(timer)
  }, [reducedMotion, roles.length])
  const socials = { GitHub: Code2, LinkedIn: BriefcaseBusiness, Email: ArrowUpRight, LeetCode: ArrowUpRight, GeeksforGeeks: ArrowUpRight }
  return (
    <>
      <section className="hero-section container">
        <div className="hero-copy">
          <motion.div className="availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span /> Open to opportunities</motion.div>
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>HELLO, I'M HARSH KUMAR</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            I build things for<br /><span className="gradient-text">the digital world.</span>
          </motion.h1>
          <p className="hero-role" aria-live="polite"><span className="role-caret" aria-hidden="true">▍</span><motion.span key={roles[roleIndex]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{roles[roleIndex]}</motion.span></p>
          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Aspiring Java Full Stack Developer turning ideas into thoughtful, intuitive web experiences.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Button to="/projects">Explore my work <ArrowRight size={17} /></Button>
            <a className="button-secondary" href="/resume.pdf" download><Download size={17} /> Download resume</a>
          </motion.div>
          <div className="hero-socials">
            {socialLinks.map((social) => {
              const Icon = socials[social.name]
              return <a key={social.name} href={social.url} aria-label={social.name} target={social.name === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={18} /></a>
            })}
          </div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-avatar" aria-label="Profile photo placeholder">
            {/* TODO: Add public/images/profile.jpg when Harsh provides a profile photograph. */}
            <div className="avatar-monogram">H<span>.</span></div>
            <div className="avatar-caption"><Code2 size={16} /> Developer in progress</div>
          </div>
          <motion.div className="floating-chip chip-code" animate={reducedMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 4, repeat: Infinity }}>{"<code />"}</motion.div>
          <motion.div className="floating-chip chip-spark" animate={reducedMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}><Sparkles size={18} /> Curious by nature</motion.div>
        </motion.div>
        <a href="#intro" className="scroll-cue"><ArrowDown size={16} /> Scroll to explore</a>
      </section>
      <section className="section container" id="intro">
        <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity meets code." description="I enjoy learning how things work and using that knowledge to build useful, well-crafted digital products." />
        <div className="preview-grid">
          <Card className="intro-card"><span className="card-index">01 / INTRO</span><h3>Creating with purpose.</h3><p>My focus is growing as a full stack developer, learning modern frontend practices and building a strong foundation in Java and Spring.</p><Link className="text-link" to="/about">More about me <ArrowUpRight size={16} /></Link></Card>
          <Card className="intro-card"><span className="card-index">02 / TOOLKIT</span><h3>Tools I work with.</h3><div className="mini-tags">{skills.slice(0, 5).map((skill) => <span key={skill.name}>{skill.name}</span>)}</div><Link className="text-link" to="/skills">Explore my skills <ArrowUpRight size={16} /></Link></Card>
          <Card className="intro-card"><span className="card-index">03 / SELECTED WORK</span><h3>Learning by building.</h3><p>{projects.length} sample project concepts are ready to be replaced with real work.</p><Link className="text-link" to="/projects">See projects <ArrowUpRight size={16} /></Link></Card>
          <Card className="intro-card"><span className="card-index">04 / EXPERIENCE</span><h3>Growing every day.</h3><p>{experience.length ? 'Explore my professional experience.' : 'Professional experience will be added when verified details are available.'}</p><Link className="text-link" to="/experience">View experience <ArrowUpRight size={16} /></Link></Card>
        </div>
      </section>
    </>
  )
}
