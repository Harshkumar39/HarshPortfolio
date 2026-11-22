import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Compass, Download, Layers3, Sparkles, Target } from 'lucide-react'
import type { PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { SocialIcon } from '../../components/ui/SocialIcon'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { experience } from '../../data/experience'
import { socialLinks } from '../../data/social'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { MarkerText, RotatingSplitText, ScrambleText, StaggerText } from '../../components/ui/TextEffects'

const roles = ['Java Full Stack Developer', 'Frontend Developer', 'Lifelong Learner']

export default function Home() {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [6, -6]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), { stiffness: 120, damping: 18 })
  const handleVisualPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width)
    pointerY.set((event.clientY - bounds.top) / bounds.height)
  }
  const resetVisualPointer = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }
  const previewCards = [
    { key: 'intro', icon: Compass, label: '01 / INTRO', title: 'Creating with purpose.', body: 'My focus is growing as a full stack developer, learning modern frontend practices and building a strong foundation in Java and Spring.', link: 'More about me', to: '/about' },
    { key: 'toolkit', icon: Code2, label: '02 / TOOLKIT', title: 'Tools I work with.', link: 'Explore my skills', to: '/skills' },
    { key: 'work', icon: Layers3, label: '03 / SELECTED WORK', title: 'Learning by building.', body: `${projects.length} full-stack and frontend projects are showcased.`, link: 'See projects', to: '/projects' },
    { key: 'experience', icon: Target, label: '04 / EXPERIENCE', title: 'Growing every day.', body: experience.length ? 'Explore my professional experience.' : 'Professional experience will be added when verified details are available.', link: 'View experience', to: '/experience' },
  ]
  return (
    <div className="home-page">
      <section className="hero-section container">
        <motion.div className="hero-ambient" aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="hero-copy">
          <motion.div className="availability" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><span /><ScrambleText text="Open to opportunities" /></motion.div>
          <motion.p className="hero-kicker" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}><ScrambleText text="HELLO, I'M HARSH KUMAR" /></motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            I build things for<br /><MarkerText className="gradient-text">the digital world.</MarkerText>
          </motion.h1>
          <motion.p className="hero-role" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}><span className="role-caret" aria-hidden="true">▍</span><RotatingSplitText words={roles} /></motion.p>
          <motion.p className="hero-description" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <StaggerText>Aspiring Java Full Stack Developer turning ideas into thoughtful, intuitive web experiences.</StaggerText>
          </motion.p>
          <motion.div className="hero-actions" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <motion.span whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}><Button to="/projects">Explore my work <ArrowRight size={17} /></Button></motion.span>
            <motion.a className="button-secondary" href="/resume.pdf" download whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}><Download size={17} /> Download resume</motion.a>
          </motion.div>
          <motion.div className="hero-socials" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            {socialLinks.map((social) => {
              return (
                <motion.a
                  key={social.name}
                  className="hero-social-link"
                  href={social.url}
                  aria-label={`Open ${social.name}`}
                  title={social.name}
                  target={social.name === 'Email' ? undefined : '_blank'}
                  rel="noreferrer"
                  whileHover={reducedMotion ? undefined : { y: -4, rotateX: 8, scale: 1.04 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  <SocialIcon name={social.name} size={18} />
                  <span>{social.name}</span>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
        <motion.div className="hero-visual" onPointerMove={handleVisualPointerMove} onPointerLeave={resetVisualPointer} initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <motion.div className="hero-orbit orbit-one" aria-hidden="true" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="hero-orbit orbit-two" aria-hidden="true" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="hero-avatar" aria-label="Portrait of Harsh Kumar" style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}>
            <img className="profile-image" src="/images/profile.jpg" alt="Harsh Kumar" />
            <div className="avatar-caption"><Code2 size={16} /> Developer in progress</div>
          </motion.div>
          <motion.div className="floating-chip chip-code" animate={reducedMotion ? undefined : { y: [0, -9, 0] }} whileHover={reducedMotion ? undefined : { scale: 1.04 }} transition={{ duration: 4, repeat: Infinity }}>{"<code />"}</motion.div>
          <motion.div className="floating-chip chip-spark" animate={reducedMotion ? undefined : { y: [0, 8, 0] }} whileHover={reducedMotion ? undefined : { scale: 1.04 }} transition={{ duration: 4.5, repeat: Infinity }}><Sparkles size={18} /> Curious by nature</motion.div>
        </motion.div>
        <motion.a href="#intro" className="scroll-cue" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} whileHover={reducedMotion ? undefined : { x: 4 }}> <ArrowDown size={16} /> Scroll to explore</motion.a>
      </section>
      <section className="section container" id="intro">
        <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity meets code." description="I enjoy learning how things work and using that knowledge to build useful, well-crafted digital products." />
        <div className="preview-grid">
          {previewCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.key}
                className={`surface-card intro-card intro-card-${card.key}`}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reducedMotion ? undefined : { y: -7, rotateX: 2, rotateY: index % 2 ? -1.5 : 1.5, scale: 1.01 }}
              >
                <div className="intro-card-top"><span className="card-index"><ScrambleText text={card.label} /></span><span className="intro-card-icon"><Icon size={18} /></span></div>
                <h3><StaggerText>{card.title}</StaggerText></h3>
                {card.body && <p><StaggerText>{card.body}</StaggerText></p>}
                {card.key === 'toolkit' && <div className="mini-tags">{skills.slice(0, 5).map((skill) => <span key={skill.name}>{skill.name}</span>)}</div>}
                <Link className="text-link" to={card.to}>{card.link} <ArrowUpRight size={16} /></Link>
              </motion.article>
            )
          })}
        </div>
        <div className="home-more-links">
          <Link className="text-link" to="/leetcode">View live LeetCode statistics <ArrowUpRight size={16} /></Link>
          <Link className="text-link" to="/resume">Open printable resume <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
