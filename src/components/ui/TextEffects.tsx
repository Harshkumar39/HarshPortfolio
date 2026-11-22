import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/&'

export function ScrambleText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [displayText, setDisplayText] = useState(reducedMotion ? text : '')

  useEffect(() => {
    if (!inView || reducedMotion) {
      if (reducedMotion) setDisplayText(text)
      return
    }

    let frame = 0
    const timer = window.setInterval(() => {
      frame += 1
      const resolvedLength = Math.floor((frame / 18) * text.length)
      setDisplayText(
        text
          .split('')
          .map((character, index) => {
            if (character === ' ') return ' '
            if (index < resolvedLength) return character
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(''),
      )

      if (resolvedLength >= text.length) {
        window.clearInterval(timer)
        setDisplayText(text)
      }
    }, 38)

    return () => window.clearInterval(timer)
  }, [inView, reducedMotion, text])

  return (
    <span ref={ref} className={`scramble-text ${className}`} aria-label={text}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  )
}

export function StaggerText({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const text = typeof children === 'string' ? children : ''
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  if (!text) return <>{children}</>

  return (
    <span className={`stagger-text ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={reducedMotion ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.42, delay: reducedMotion ? 0 : index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function CountUp({
  value,
  suffix = '',
  duration = 1.2,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.65 })
  const [displayValue, setDisplayValue] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setDisplayValue(value)
      return
    }

    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(value * eased))
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [duration, inView, reducedMotion, value])

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{displayValue}{suffix}</span>
    </span>
  )
}

export function MarkerText({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.span
      className={`marker-text ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 8, filter: 'blur(3px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

export function TypewriterText({
  words,
  className = '',
}: {
  words: string[]
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(reducedMotion ? words[0] ?? '' : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion || words.length === 0) return
    const current = words[wordIndex] ?? ''
    const doneTyping = !deleting && displayText === current
    const doneDeleting = deleting && displayText.length === 0
    const delay = doneTyping ? 1500 : doneDeleting ? 260 : deleting ? 38 : 68

    const timer = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true)
      } else if (doneDeleting) {
        setDeleting(false)
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length)
      } else {
        setDisplayText((currentText) =>
          deleting
            ? current.slice(0, currentText.length - 1)
            : current.slice(0, currentText.length + 1),
        )
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, displayText, reducedMotion, wordIndex, words])

  return (
    <span className={`typewriter-text ${className}`} aria-label={reducedMotion ? words[wordIndex] : undefined}>
      <span aria-hidden={reducedMotion ? true : undefined}>{displayText}</span>
      {!reducedMotion && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  )
}

export function RotatingSplitText({
  words,
  className = '',
  interval = 2600,
}: {
  words: string[]
  className?: string
  interval?: number
}) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion || words.length < 2) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval,
    )
    return () => window.clearInterval(timer)
  }, [interval, reducedMotion, words.length])

  const word = words[index] ?? ''
  return (
    <span className={`rotating-split-text ${className}`} aria-live="polite">
      <AnimateSplitWord key={word} word={word} reducedMotion={Boolean(reducedMotion)} />
    </span>
  )
}

function AnimateSplitWord({ word, reducedMotion }: { word: string; reducedMotion: boolean }) {
  return (
    <span className="split-word">
      <motion.span
        className="split-half split-upper"
        initial={reducedMotion ? false : { y: 12, opacity: 0, rotateX: -70 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
      <motion.span
        className="split-half split-lower"
        initial={reducedMotion ? false : { y: -12, opacity: 0, rotateX: 70 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.42, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}
