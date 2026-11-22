import { useEffect, useState } from 'react'
import { ArrowUpRight, Code2, ExternalLink, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { CountUp } from '../../components/ui/TextEffects'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { socialLinks } from '../../data/social'

interface LeetCodeStats {
  username: string
  ranking: number
  solved: { all: number; easy: number; medium: number; hard: number }
  fetchedAt: string
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [error, setError] = useState('')
  const profile = socialLinks.find((link) => link.name === 'LeetCode')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/leetcode', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const body: unknown = await response.json().catch(() => null)
          const message = typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string'
            ? body.error
            : 'Live statistics are temporarily unavailable.'
          throw new Error(message)
        }
        return response.json() as Promise<LeetCodeStats>
      })
      .then(setStats)
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Live statistics are temporarily unavailable.')
        }
      })
    return () => controller.abort()
  }, [])

  return (
    <section className="section container page-section leetcode-page">
      <SectionHeading
        eyebrow="CODING PROFILE"
        title="Problem solving, one submission at a time."
        description="Live accepted-problem totals from the public LeetCode profile."
      />

      <div className="leetcode-profile-row">
        <div>
          <span className="eyebrow">PROFILE</span>
          <h2>{stats?.username ?? 'fTe8o0ndM3'}</h2>
        </div>
        {profile && <a className="button-primary" href={profile.url} target="_blank" rel="noreferrer">Open LeetCode <ExternalLink size={16} /></a>}
      </div>

      {stats ? (
        <>
          <div className="leetcode-stats-grid">
            {[
              { label: 'Problems solved', value: stats.solved.all, icon: Code2 },
              { label: 'Easy', value: stats.solved.easy, icon: Code2 },
              { label: 'Medium', value: stats.solved.medium, icon: Code2 },
              { label: 'Hard', value: stats.solved.hard, icon: Trophy },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card className="leetcode-stat-card" key={item.label}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                  <strong><CountUp value={item.value} /></strong>
                </Card>
              )
            })}
          </div>
          <p className="leetcode-rank">Global rank <strong>#{stats.ranking.toLocaleString()}</strong></p>
          <p className="leetcode-updated">Fetched {new Date(stats.fetchedAt).toLocaleString()}</p>
          <p className="leetcode-attribution">Statistics are fetched from LeetCode’s public profile endpoint and cached for up to one hour. Counts may be unavailable if their service changes.</p>
        </>
      ) : (
        <Card className="leetcode-empty-state" role="status">
          <span className="empty-icon"><Code2 /></span>
          <h3>{error ? 'Live stats could not be loaded' : 'Loading public statistics…'}</h3>
          <p>{error || 'Fetching the latest accepted-problem counts.'}</p>
          {profile && <a className="text-link" href={profile.url} target="_blank" rel="noreferrer">View the profile directly <ArrowUpRight size={16} /></a>}
        </Card>
      )}
      <div className="leetcode-back-link"><Link className="text-link" to="/projects">Explore my projects <ArrowUpRight size={16} /></Link></div>
    </section>
  )
}
