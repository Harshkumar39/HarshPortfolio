import emailjs from '@emailjs/browser'
import { useState, type FormEvent } from 'react'
import { BriefcaseBusiness, Code2, Mail, MapPin, Send } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { socialLinks } from '../../data/social'
import { validateContact, type ContactValues } from '../../utils/validation'

const initialValues: ContactValues = { name: '', email: '', subject: '', message: '' }
const socialIcons = { GitHub: Code2, LinkedIn: BriefcaseBusiness, Email: Mail, LeetCode: Code2, GeeksforGeeks: Code2 }

export default function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({})
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    if (website) return
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      toast.error('Please check the highlighted fields.')
      return
    }

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env
    if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
      toast.error('Contact form is not configured yet. Please use the email link instead.')
      return
    }

    setSubmitting(true)
    try {
      await emailjs.send(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, {
        from_name: values.name.trim(),
        from_email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      }, { publicKey: VITE_EMAILJS_PUBLIC_KEY })
      toast.success('Message sent! Thanks for reaching out.')
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      console.error('EmailJS contact submission failed.', error)
      toast.error('Unable to send your message. Please try again or email directly.')
    } finally {
      setSubmitting(false)
    }
  }

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  return (
    <section className="section container page-section">
      <SectionHeading eyebrow="GET IN TOUCH" title="Have a good one in mind?" description="I'm always happy to connect, exchange ideas, and hear about interesting opportunities." />
      <div className="contact-layout">
        <div className="contact-aside"><span className="eyebrow">LET'S TALK</span><h3>Let's make something meaningful.</h3><p>Send a note and I'll get back to you as soon as I can.</p><div className="contact-detail"><Mail size={18} /><a href={socialLinks.find((link) => link.name === 'Email')?.url}>Email me</a></div><div className="contact-detail"><MapPin size={18} /><span>India</span></div><div className="contact-socials">{socialLinks.map((item) => { const Icon = socialIcons[item.name]; return <a key={item.name} href={item.url} aria-label={item.name} target={item.name === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={18} /></a> })}</div></div>
        <Card className="contact-form-card"><form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>Name<input value={values.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your name" />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</label>
            <label>Email<input type="email" value={values.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</label>
            <label className="form-full">Subject<input value={values.subject} onChange={(event) => update('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} placeholder="What would you like to discuss?" />{errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}</label>
            <label className="form-full">Message<textarea rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell me a little about it..." />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</label>
            <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
          </div>
          <Button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'} <Send size={16} /></Button>
        </form></Card>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </section>
  )
}
