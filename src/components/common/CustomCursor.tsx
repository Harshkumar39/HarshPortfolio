import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const [isInteractive, setIsInteractive] = useState(false)
  const wasInteractive = useRef(false)
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 500, damping: 35, mass: 0.3 })
  const y = useSpring(pointerY, { stiffness: 500, damping: 35, mass: 0.3 })

  useEffect(() => {
    if (!finePointer) return
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      const target = event.target
      const interactive = target instanceof Element
        && Boolean(target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]'))
      if (interactive !== wasInteractive.current) {
        wasInteractive.current = interactive
        setIsInteractive(interactive)
      }
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [finePointer])

  if (!finePointer) return null
  return (
    <motion.span
      className={`custom-cursor${isInteractive ? ' is-interactive' : ''}`}
      animate={{ width: isInteractive ? 40 : 8, height: isInteractive ? 40 : 8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ x, y }}
      aria-hidden="true"
    />
  )
}
