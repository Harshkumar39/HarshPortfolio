import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { socialLinks } from '../../data/social'
import { navigation } from '../../utils/constants'

const icons = { GitHub: Code2, LinkedIn: BriefcaseBusiness, Email: Mail, LeetCode: ArrowUpRight, GeeksforGeeks: ArrowUpRight }

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
        </div>
        <div className="footer-links">
          <h3>Connect</h3>
          {socialLinks.map((item) => {
            const Icon = icons[item.name]
            return <a key={item.name} href={item.url} target={item.name === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={16} />{item.name}</a>
          })}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Harsh Kumar. All rights reserved.</span>
        <span>Designed with intention <span className="accent">✳</span></span>
      </div>
    </footer>
  )
}
