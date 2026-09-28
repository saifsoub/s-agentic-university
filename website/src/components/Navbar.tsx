import { useState } from 'react'
import { Link } from 'react-router-dom'
import { interestUrl } from '../interest'

const links = [ ['Learning areas', '/programs'], ['About', '/about'], ['Interest and enrollment', '/admissions'] ]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-[#080828]/95 text-[#f9f6f0]">
    <nav aria-label="Main navigation" className="mx-auto flex min-h-20 max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
      <Link to="/" className="font-sans text-base font-bold tracking-wider" onClick={() => setOpen(false)}>S/AGENTIC <span className="block text-[10px] tracking-[.2em] text-white/65">UNIVERSITY</span></Link>
      <button type="button" className="rounded border border-white/30 px-4 py-2 text-sm md:hidden" aria-expanded={open} aria-controls="main-nav-links" onClick={() => setOpen(!open)}>{open ? 'Close menu' : 'Menu'}</button>
      <div id="main-nav-links" className={(open ? 'flex' : 'hidden') + ' w-full flex-col gap-5 md:flex md:w-auto md:flex-row md:items-center'}>
        {links.map(([label, url]) => <Link key={url} to={url} onClick={() => setOpen(false)} className="text-sm text-white/75 hover:text-[#f5b041]">{label}</Link>)}
        <a href={interestUrl} className="rounded bg-[#f5b041] px-4 py-2 text-sm font-semibold text-[#080828]">Register interest ↗</a>
      </div>
    </nav>
  </header>
}
