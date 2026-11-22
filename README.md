# Harsh Kumar — Developer Portfolio

A React and TypeScript portfolio SPA for presenting Harsh Kumar's skills, projects, education, and professional journey. Project detail pages and a print-friendly resume are included, along with a Vercel function that displays public LeetCode profile statistics.

## Features

- Portfolio routes and a custom 404 page, with lazy-loaded page bundles.
- Responsive layout, mobile navigation, dark/light themes, and saved theme preference.
- Motion-enhanced home, skills, projects, and achievement sections.
- Filterable portfolio projects, data-driven project detail routes, GitHub links, a project screenshot, and a touch-enabled certification carousel.
- Printable resume page and downloadable source resume PDF.
- Live LeetCode public-profile statistics through a cached Vercel serverless function.
- Optional Plausible analytics gated behind visitor consent and Do Not Track.
- JSON-LD Person profile data, dynamic canonical URLs, and generated sitemap/robots metadata.
- Supplied resume, profile photograph, and certificate PDF documents.
- Contact form with client-side validation, a honeypot field, EmailJS, and notifications.
- Semantic controls, visible keyboard focus, reduced-motion support, and SEO metadata.

## Technology

- React 19, TypeScript, and Vite
- Tailwind CSS 3
- React Router DOM 6
- Framer Motion, Lucide React, and React Toastify
- EmailJS Browser SDK

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```sh
npm install
npm run dev
```

Vite serves the development app at `http://localhost:3000`.

## EmailJS configuration

Copy `.env.example` to `.env.local` and supply the public EmailJS service, template, and public key values:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_SITE_URL=https://your-production-domain.example
VITE_PLAUSIBLE_DOMAIN=your-production-domain.example
```

Configure the EmailJS template to accept `from_name`, `from_email`, `subject`, and `message`. If EmailJS is not configured, submitting the contact form opens a prefilled Gmail compose draft; the visitor must press Send in Gmail. Never put private credentials in client-side environment variables.

The EmailJS public key is intended for browser use. Restrict its allowed origins in the EmailJS dashboard and configure provider-side rate limits/templates; the contact form also uses client-side validation and a honeypot, which are not substitutes for server-side abuse controls.

## Production build

```sh
npm run build
npm run preview
```

The production output is written to `dist/`. The build checks app and API TypeScript, creates Vite assets, and generates `sitemap.xml` from `VITE_SITE_URL` (or Vercel's project production URL). If no canonical deployment URL is configured, the build warns and omits the sitemap.

## Live LeetCode data

`/leetcode` requests `/api/leetcode`, a Vercel serverless function that queries the public profile for `fTe8o0ndM3`. Responses are cached for one hour and show their retrieval time. The page links directly to the profile when LeetCode is unavailable. The upstream public endpoint is not a guaranteed API contract.

## Privacy-first analytics

Plausible is not loaded until a visitor opts in. To enable the consent prompt, set `VITE_PLAUSIBLE_DOMAIN` to the exact domain registered with Plausible; leave it unset to disable analytics. A saved opt-in is still ignored when the browser sends Do Not Track.

## Deployment to Vercel

Import the repository into Vercel and use the Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

Add the EmailJS variables and `VITE_SITE_URL` in the Vercel Project Settings. Add `VITE_PLAUSIBLE_DOMAIN` only when analytics is enabled. Configure the site's production domain as the canonical URL; use the actual project domain rather than a guessed value. `vercel.json` rewrites SPA paths to `index.html`, while Vercel serves `/api/leetcode` as a function.

## Quality checks

```sh
npm test             # Playwright desktop + mobile route checks
npm run test:a11y     # Axe WCAG 2 A/AA scan of the Home page
npm run audit:lighthouse  # Lighthouse CI against the production preview
```

The first Playwright run requires its Chromium browser (`npx playwright install chromium`). Lighthouse CI checks performance as a warning and accessibility, SEO, and best practices as required minimum scores. Review the report after changes; local and deployed scores may differ.

## Integrations not configured

- GeeksforGeeks is not linked because a verified profile URL has not been supplied.
- No live project deployment URLs were provided, so project cards only link to source repositories where available.

## Screenshots

Add current screenshots here after the real profile assets and content have been supplied.

## Project structure

```text
src/
  components/  Shared layout, common, theme, and UI components
  context/     Theme context
  data/        Typed portfolio content
  hooks/       Theme, media-query, and scroll hooks
  pages/       Home, About, Skills, Experience, Projects and case studies,
               Education, Certifications, Achievements, Contact, LeetCode,
               Resume, NotFound
  styles/      Global theme tokens and responsive styles
  types/       Shared TypeScript interfaces
  utils/       Navigation constants and contact validation
api/           Vercel LeetCode statistics function
scripts/       Sitemap generation
tests/         Playwright route and accessibility checks
public/        Static assets, certificates, resume, robots.txt
```

## Content and assets to replace

- Update verified portfolio information in `src/data/` as it changes.
- Add future project screenshots under `public/images/projects/` and reference them in `src/data/projects.ts`.
- Certificate PDFs are served from `public/certificates/`.
- The direct contact email and profile links are maintained in `src/data/social.ts`.
