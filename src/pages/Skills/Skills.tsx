import { motion } from 'framer-motion'
import { Badge } from '../../components/ui/Badge'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { skills } from '../../data/skills'

const categories = ['Frontend', 'Backend', 'Database', 'Tools'] as const

export default function Skills() {
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="MY TOOLKIT" title="Skills in progress." description="A growing set of tools and technologies I use to shape ideas into software. Proficiency levels are illustrative placeholders." />
      <div className="skills-categories">
        {categories.map((category) => {
          const items = skills.filter((skill) => skill.category === category)
          return <div className="skill-group" key={category}><div className="skill-group-heading"><h3>{category}</h3><Badge>{items.length} skills</Badge></div>
            <div className="skill-list">{items.map((skill, index) => <motion.article className="skill-item" key={skill.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <div className="skill-meta"><span>{skill.name}</span><span className="skill-level">{skill.level}%</span></div>
              <div className="skill-track"><motion.span initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.07 }} /></div>
            </motion.article>)}</div>
          </div>
        })}
      </div>
    </section>
  )
}
