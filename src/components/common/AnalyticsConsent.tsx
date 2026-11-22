import { useEffect, useState } from 'react'

const consentKey = 'portfolio-analytics-consent'

type Consent = 'accepted' | 'rejected' | null

function readConsent(): Consent {
  const saved = localStorage.getItem(consentKey)
  return saved === 'accepted' || saved === 'rejected' ? saved : null
}

export function AnalyticsConsent() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim()
  const [consent, setConsent] = useState<Consent>(() => readConsent())

  useEffect(() => {
    const openPreferences = () => {
      document.getElementById('plausible-script')?.remove()
      setConsent(null)
    }
    window.addEventListener('open-analytics-preferences', openPreferences)
    return () => window.removeEventListener('open-analytics-preferences', openPreferences)
  }, [])

  useEffect(() => {
    if (!domain || consent !== 'accepted' || ['1', 'yes'].includes(navigator.doNotTrack ?? '')) return
    if (document.getElementById('plausible-script')) return

    const script = document.createElement('script')
    script.id = 'plausible-script'
    script.defer = true
    script.dataset.domain = domain
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
    return () => script.remove()
  }, [consent, domain])

  function choose(choice: Exclude<Consent, null>) {
    localStorage.setItem(consentKey, choice)
    setConsent(choice)
  }

  if (!domain || consent !== null) return null

  return (
    <aside className="analytics-consent" aria-label="Privacy preferences">
      <div>
        <strong>Privacy-first analytics</strong>
        <p>Allow anonymous Plausible page-view analytics? No tracking runs unless you opt in.</p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="button-ghost" onClick={() => choose('rejected')}>Decline</button>
        <button type="button" className="button-primary" onClick={() => choose('accepted')}>Allow analytics</button>
      </div>
    </aside>
  )
}
