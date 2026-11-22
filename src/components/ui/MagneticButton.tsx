import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
}

const springConfig = { stiffness: 180, damping: 16, mass: 0.18 }

export function MagneticButton({ children }: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, springConfig)
  const y = useSpring(pointerY, springConfig)

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * 0.16)
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * 0.16)
  }

  const reset = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <span className="magnetic-button" onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <span className="magnetic-button-glow" aria-hidden="true" />
      <motion.span className="magnetic-button-content" style={{ x, y }}>
        {children}
      </motion.span>
    </span>
  )
}
