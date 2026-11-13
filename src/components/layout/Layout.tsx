import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { BackToTop } from '../ui/BackToTop'
import { PageTransition } from '../common/PageTransition'

export function Layout() {
  const location = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [location.pathname])
  return (
    <>
      <Navbar />
      <main id="main-content"><PageTransition key={location.pathname}><Outlet /></PageTransition></main>
      <BackToTop />
      <Footer />
    </>
  )
}
