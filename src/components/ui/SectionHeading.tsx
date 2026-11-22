import { motion } from 'framer-motion'
import { ScrambleText, StaggerText } from './TextEffects'

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
    >
      <span className="eyebrow"><ScrambleText text={eyebrow} /></span>
      <h2><StaggerText>{title}</StaggerText></h2>
      {description && <p><StaggerText>{description}</StaggerText></p>}
    </motion.div>
  )
}
