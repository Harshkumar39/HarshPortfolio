import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { useState } from 'react'
import { useTilt } from '../../hooks/useTilt'

interface SpotlightCardProps extends Omit<HTMLMotionProps<'article'>, 'children' | 'onPointerMove' | 'onPointerLeave' | 'onPointerEnter' | 'style' | 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  children: ReactNode
  index: number
}

export function SpotlightCard({ children, className = '', index, ...props }: SpotlightCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const { style: tiltStyle, onPointerMove: handleTilt, onPointerLeave: resetTilt } = useTilt(10)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${pointerX}px ${pointerY}px, rgba(245, 158, 11, 0.14), transparent 78%)`

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    handleTilt(event)
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(event.clientX - bounds.left)
    pointerY.set(event.clientY - bounds.top)
  }

  const handlePointerLeave = () => {
    resetTilt()
    setIsHovered(false)
  }

  return (
    <motion.article
      {...props}
      className={`spotlight-card ${className}`.trim()}
      style={reducedMotion ? undefined : tiltStyle}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="spotlight-layer"
        aria-hidden="true"
        style={{ backgroundImage: spotlight }}
        animate={{ opacity: isHovered && !reducedMotion ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </motion.article>
  )
}
