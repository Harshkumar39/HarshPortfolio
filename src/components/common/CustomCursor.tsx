import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    if (!finePointer) return
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [finePointer])

  if (!finePointer) return null
  return <span className="custom-cursor" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} aria-hidden="true" />
}
