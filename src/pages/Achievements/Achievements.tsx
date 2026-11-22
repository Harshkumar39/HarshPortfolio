import { motion } from 'framer-motion'
import { Award, Code2, Layers3, Trophy } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { achievements } from '../../data/achievements'
import { CountUp } from '../../components/ui/TextEffects'

const icons = [Layers3, Code2, Award, Trophy]

export default function Achievements() {
  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="MILESTONES" title="Progress worth celebrating." description="A snapshot of projects, technologies and certifications listed in my portfolio and resume." />
      <div className="achievement-grid">
        {achievements.map((item, index) => {
          const Icon = icons[index % icons.length] ?? Trophy
          return (
            <motion.article
              className="achievement-card"
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="achievement-icon"><Icon /></span>
              <strong><CountUp value={item.value} suffix={item.suffix} /></strong>
              <span>{item.label}</span>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
