import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { BackToTop } from '../ui/BackToTop'
import { PageTransition } from '../common/PageTransition'
import { AnalyticsConsent } from '../common/AnalyticsConsent'

export function Layout() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Harsh Kumar | Java Full Stack Developer',
      '/about': 'About | Harsh Kumar',
      '/skills': 'Skills | Harsh Kumar',
      '/experience': 'Experience | Harsh Kumar',
      '/projects': 'Projects | Harsh Kumar',
      '/education': 'Education | Harsh Kumar',
      '/certifications': 'Certifications | Harsh Kumar',
      '/achievements': 'Achievements | Harsh Kumar',
      '/contact': 'Contact | Harsh Kumar',
      '/leetcode': 'LeetCode Profile | Harsh Kumar',
      '/resume': 'Resume | Harsh Kumar',
    }
    const projectTitle = location.pathname.startsWith('/projects/')
      ? `${location.pathname.split('/').pop()?.replace(/-/g, ' ')} | Harsh Kumar`
      : undefined
    document.title = titles[location.pathname] ?? projectTitle ?? 'Page Not Found | Harsh Kumar'
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    const base = import.meta.env.VITE_SITE_URL || window.location.origin
    canonical.href = new URL(location.pathname, base).toString()
  }, [location.pathname])
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content"><PageTransition key={location.pathname}><Outlet /></PageTransition></main>
      <BackToTop />
      <Footer />
      <AnalyticsConsent />
    </>
  )
}
