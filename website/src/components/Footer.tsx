import { Link } from 'react-router-dom'
import { interestUrl } from '../interest'

export default function Footer() {
  return <footer className="bg-[#12125a] px-6 py-12 text-[#f9f6f0]"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
    <div><p className="font-sans font-semibold tracking-widest">S/AGENTIC UNIVERSITY</p><p className="mt-3 max-w-md text-sm leading-6 text-white/60">An emerging learning initiative. Spring 2027 is a proposed cohort, subject to confirmation.</p></div>
    <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3 text-sm"><Link to="/programs">Learning areas</Link><Link to="/admissions">Interest and enrollment</Link><Link to="/about">About</Link><a href={interestUrl} className="text-[#f5b041]">Register interest ↗</a></nav>
  </div><p className="mx-auto mt-12 max-w-6xl border-t border-white/15 pt-6 text-xs text-white/50">Owned and maintained by S/Agency by Seif Alsoub.</p></footer>
}
