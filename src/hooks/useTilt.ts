import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent } from 'react'
import { useReducedMotion } from 'framer-motion'

const tiltSpring = { stiffness: 180, damping: 22, mass: 0.4 }

export function useTilt(maxTilt = 10) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [maxTilt, -maxTilt]), tiltSpring)
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-maxTilt, maxTilt]), tiltSpring)

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1)
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  }

  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return { style: { rotateX, rotateY, transformPerspective: 1000 }, onPointerMove, onPointerLeave }
}
