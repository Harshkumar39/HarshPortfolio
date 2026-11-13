import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
    >
      {children}
    </motion.div>
  )
}
