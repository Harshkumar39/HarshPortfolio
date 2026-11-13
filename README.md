# Harsh Kumar — Developer Portfolio

A responsive React and TypeScript portfolio SPA for presenting Harsh Kumar's skills, projects, education, and professional journey. The application is frontend-only and deployable to Vercel.

> Personal profile details, social URLs, project examples, proficiency percentages, resume, and photography are placeholders where marked in the source. Replace them with verified information before publishing.

## Features

- Nine portfolio routes and a custom 404 page, with lazy-loaded page bundles.
- Responsive layout, mobile navigation, dark/light themes, and saved theme preference.
- Motion-enhanced home, skills, projects, and achievement sections.
- Filterable sample projects and a touch-enabled certification carousel.
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
```

Configure the EmailJS template to accept `from_name`, `from_email`, `subject`, and `message`. The contact form shows a setup notice until all three values are present. Never put private credentials in client-side environment variables.

## Production build

```sh
npm run build
npm run preview
```

The production output is written to `dist/`. The build command runs TypeScript validation before Vite creates the production assets.

## Deployment to Vercel

Import the repository into Vercel and use the Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

Add the three EmailJS variables in the Vercel Project Settings for Production and Preview environments. `vercel.json` rewrites SPA paths to `index.html`, so direct navigation to application routes works.

## Screenshots

Add current screenshots here after the real profile assets and content have been supplied.

## Project structure

```text
src/
  components/  Shared layout, common, theme, and UI components
  context/     Theme context
  data/        Typed portfolio content
  hooks/       Theme, media-query, and scroll hooks
  pages/       Home, About, Skills, Experience, Projects,
               Education, Certifications, Achievements, Contact, NotFound
  styles/      Global theme tokens and responsive styles
  types/       Shared TypeScript interfaces
  utils/       Navigation constants and contact validation
public/        Static assets (add supplied images and resume here)
```

## Content and assets to replace

- Replace sample entries and TODOs in `src/data/` with verified portfolio information.
- Add the supplied profile image at `public/images/profile.jpg`.
- Add the supplied resume at `public/resume.pdf`.
- Replace placeholder GitHub, LinkedIn, and email links in `src/data/social.ts`.
- Replace sample project links and data in `src/data/projects.ts`.
