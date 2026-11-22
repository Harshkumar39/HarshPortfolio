import type { Achievement } from '../types'
import { projects } from './projects'
import { skills } from './skills'
import { certifications } from './certifications'

export const achievements: Achievement[] = [
  { label: 'Projects', value: projects.length },
  { label: 'Skills & technologies', value: skills.length },
  { label: 'Certificates & credentials', value: certifications.length },
]
