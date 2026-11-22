import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { GlobalLoader } from './components/common/GlobalLoader'
import { CustomCursor } from './components/common/CustomCursor'
import { Layout } from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home/Home'))
const About = lazy(() => import('./pages/About/About'))
const Skills = lazy(() => import('./pages/Skills/Skills'))
const Experience = lazy(() => import('./pages/Experience/Experience'))
const Projects = lazy(() => import('./pages/Projects/Projects'))
const ProjectDetail = lazy(() => import('./pages/Projects/ProjectDetail'))
const Education = lazy(() => import('./pages/Education/Education'))
const Certifications = lazy(() => import('./pages/Certifications/Certifications'))
const Achievements = lazy(() => import('./pages/Achievements/Achievements'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const LeetCode = lazy(() => import('./pages/LeetCode/LeetCode'))
const Resume = lazy(() => import('./pages/Resume/Resume'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function App() {
  return (
    <>
      <Suspense fallback={<GlobalLoader />}>        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetail />} />
            <Route path="education" element={<Education />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="contact" element={<Contact />} />
            <Route path="leetcode" element={<LeetCode />} />
            <Route path="resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <CustomCursor />
    </>
  )
}

export default App