import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Faculty from './pages/Faculty'
import Research from './pages/Research'
import Campus from './pages/Campus'
import Admissions from './pages/Admissions'
import About from './pages/About'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const pageTransition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><PageWrapper><Home /></PageWrapper></Layout>} />
        <Route path="/programs" element={<Layout><PageWrapper><Programs /></PageWrapper></Layout>} />
        <Route path="/faculty" element={<Layout><PageWrapper><Faculty /></PageWrapper></Layout>} />
        <Route path="/research" element={<Layout><PageWrapper><Research /></PageWrapper></Layout>} />
        <Route path="/campus" element={<Layout><PageWrapper><Campus /></PageWrapper></Layout>} />
        <Route path="/admissions" element={<Layout><PageWrapper><Admissions /></PageWrapper></Layout>} />
        <Route path="/about" element={<Layout><PageWrapper><About /></PageWrapper></Layout>} />
        <Route path="/apply" element={<Layout><PageWrapper><Apply /></PageWrapper></Layout>} />
        <Route path="*" element={<Layout><PageWrapper><NotFound /></PageWrapper></Layout>} />
      </Routes>
    </AnimatePresence>
  )
}
