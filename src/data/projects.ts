import type { Project } from '../types'

// TODO: Replace these sample projects, screenshots, and links with Harsh's real work.
export const projects: Project[] = [
  { id: 'portfolio', title: 'Developer Portfolio', description: 'A responsive personal portfolio to share work, skills, and a professional story.', longDescription: 'A frontend portfolio concept built around accessible components, thoughtful motion, and a persistent theme system.', image: '', tech: ['React', 'TypeScript', 'Tailwind CSS'], category: 'Frontend', featured: true },
  { id: 'taskflow', title: 'TaskFlow Dashboard', description: 'A clean dashboard concept for organizing tasks and keeping everyday work in focus.', image: '', tech: ['React', 'TypeScript', 'CSS'], category: 'Frontend', featured: true },
  { id: 'spring-api', title: 'Spring REST API', description: 'A sample REST API structure demonstrating Java backend fundamentals.', image: '', tech: ['Java', 'Spring Boot', 'MySQL'], category: 'Backend', featured: false },
  { id: 'fullstack-store', title: 'Full Stack Storefront', description: 'A storefront UI concept pairing a component-driven frontend with a Java service.', image: '', tech: ['React', 'Java', 'Spring Boot'], category: 'Full Stack', featured: false },
]
