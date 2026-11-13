import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="not-found container"><motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow">ERROR 404</span><h1>Lost in<br /><span className="gradient-text">the bits.</span></h1><p>The page you're looking for doesn't exist or may have moved.</p><Link className="button-primary" to="/"><ArrowLeft size={17} /> Back to home</Link></motion.div><span className="not-found-mark">404</span></section>
}
