import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Admissions from './pages/Admissions'
import About from './pages/About'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/admissions" element={<Admissions />} />
    <Route path="/about" element={<About />} />
    <Route path="/apply" element={<Apply />} />
    <Route path="/faculty" element={<Navigate to="/about" replace />} />
    <Route path="/research" element={<Navigate to="/programs" replace />} />
    <Route path="/campus" element={<Navigate to="/about" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout>
}
