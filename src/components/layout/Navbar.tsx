import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../utils/constants'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { ThemeToggle } from '../theme/ThemeToggle'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollDirection()

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-wrap container" aria-label="Main navigation">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)} aria-label="Harsh Kumar home">
          HARSH<span>.</span>
        </NavLink>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <NavLink to="/contact" className="nav-cta">Let's talk <span aria-hidden="true">↗</span></NavLink>
          <button className="mobile-menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
