import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  to?: string
  children: ReactNode
  className?: string
}

const variantClass: Record<Variant, string> = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  ghost: 'button-ghost',
}

export function Button({ variant = 'primary', to, children, className = '', ...props }: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim()
  if (to) return <Link to={to} className={classes}>{children}</Link>
  return <button className={classes} {...props}>{children}</button>
}
