import { readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve('dist')
const projectSource = await readFile(resolve('src/data/projects.ts'), 'utf8')
const configuredUrl = process.env.VITE_SITE_URL
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const siteUrl = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : '')
const robotsPath = resolve(dist, 'robots.txt')
const sitemapPath = resolve(dist, 'sitemap.xml')

if (!siteUrl) {
  await writeFile(robotsPath, 'User-agent: *\nAllow: /\nDisallow: /api/\n', 'utf8')
  await rm(sitemapPath, { force: true })
  console.warn('VITE_SITE_URL is unset; sitemap.xml was not generated. Set the production site URL to generate it.')
  process.exit(0)
}

let base
try {
  base = new URL(siteUrl)
  if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Unsupported protocol')
} catch {
  console.error('VITE_SITE_URL must be an absolute http(s) URL.')
  process.exit(1)
}

const routes = [
  '/',
  '/about',
  '/skills',
  '/experience',
  '/projects',
  '/education',
  '/certifications',
  '/achievements',
  '/contact',
  '/leetcode',
  '/resume',
]
const projectIds = [...projectSource.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((match) => match[1])
routes.push(...projectIds.map((id) => `/projects/${id}`))
const locations = routes
  .map((route) => `  <url><loc>${new URL(route, base).toString()}</loc></url>`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations}\n</urlset>\n`
const robots = `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', base).toString()}\n`

await Promise.all([
  writeFile(sitemapPath, sitemap, 'utf8'),
  writeFile(robotsPath, robots, 'utf8'),
])
