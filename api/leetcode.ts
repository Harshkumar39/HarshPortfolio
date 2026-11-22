interface ApiRequest {
  method?: string
}

interface ApiResponse {
  setHeader(name: string, value: string): void
  status(code: number): ApiResponse
  json(body: unknown): void
}

interface SubmissionStat {
  difficulty: string
  count: number
  submissions: number
}

interface LeetCodeStats {
  username: string
  ranking: number
  solved: {
    all: number
    easy: number
    medium: number
    hard: number
  }
}

const query = `
  query publicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStats { acSubmissionNum { difficulty count submissions } }
    }
  }
`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseStats(payload: unknown): LeetCodeStats | null {
  if (!isRecord(payload) || !isRecord(payload.data) || !isRecord(payload.data.matchedUser)) return null
  const user = payload.data.matchedUser
  if (typeof user.username !== 'string' || !isRecord(user.profile) || !isRecord(user.submitStats)) return null

  const ranking = user.profile.ranking
  const accepted = user.submitStats.acSubmissionNum
  if (typeof ranking !== 'number' || !Array.isArray(accepted)) return null
  const stats = accepted.filter((item): item is SubmissionStat =>
    isRecord(item)
    && typeof item.difficulty === 'string'
    && typeof item.count === 'number'
    && typeof item.submissions === 'number',
  )
  const count = (difficulty: string) => stats.find((item) => item.difficulty === difficulty)?.count ?? 0

  return {
    username: user.username,
    ranking,
    solved: {
      all: count('All'),
      easy: count('Easy'),
      medium: count('Medium'),
      hard: count('Hard'),
    },
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username: 'fTe8o0ndM3' } }),
      signal: controller.signal,
    })
    if (!response.ok) {
      return res.status(502).json({ error: 'LeetCode statistics are temporarily unavailable.' })
    }

    const stats = parseStats(await response.json())
    if (!stats) {
      return res.status(502).json({ error: 'LeetCode returned an unexpected public profile response.' })
    }
    return res.status(200).json({ ...stats, fetchedAt: new Date().toISOString() })
  } catch {
    return res.status(502).json({ error: 'Unable to retrieve public LeetCode statistics right now.' })
  } finally {
    clearTimeout(timeout)
  }
}
