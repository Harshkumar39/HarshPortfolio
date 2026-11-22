import { Link } from 'react-router-dom'
import { SocialIcon } from '../ui/SocialIcon'
import { socialLinks } from '../../data/social'
import { navigation } from '../../utils/constants'

const analyticsConfigured = Boolean(import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim())

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link to="/" className="brand">HARSH<span>.</span></Link>
          <p>Building thoughtful digital experiences, one idea at a time.</p>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          {navigation.slice(1, 6).map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          <Link to="/leetcode">LeetCode stats</Link>
          <Link to="/resume">Printable resume</Link>
        </div>
        <div className="footer-links">
          <h3>Connect</h3>
          {socialLinks.map((item) => {
            return <a key={item.name} href={item.url} target={item.name === 'Email' ? undefined : '_blank'} rel="noreferrer"><SocialIcon name={item.name} size={16} />{item.name}</a>
          })}
          {analyticsConfigured && <button className="privacy-settings-link" type="button" onClick={() => window.dispatchEvent(new Event('open-analytics-preferences'))}>Privacy settings</button>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Harsh Kumar. All rights reserved.</span>
        <span>Designed with intention <span className="accent">✳</span></span>
      </div>
    </footer>
  )
}
