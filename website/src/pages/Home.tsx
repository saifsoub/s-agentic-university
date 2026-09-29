import { Link } from 'react-router-dom'
import { interestUrl } from '../interest'

const areas = [
  { title: 'AI agent engineering', text: 'Learn to design and assess useful agents and their workflows.' },
  { title: 'Agent leadership', text: 'Explore how people lead teams working with AI agents.' },
  { title: 'Responsible operation', text: 'Study permissions, measurement, and oversight in agent systems.' },
]

export default function Home() {
  return <>
    <section className="relative min-h-[80vh] overflow-hidden bg-[#080828] px-6 pb-20 pt-40 text-[#f9f6f0]">
      <div className="pointer-events-none absolute -right-24 top-12 h-[420px] w-[420px] rounded-full border border-[#f5b041]/20 bg-[radial-gradient(circle,rgba(245,176,65,.13),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#f5b041]">S/Agentic University · In development</p>
        <h1 className="max-w-4xl text-6xl leading-tight md:text-8xl">Learn to build agents with purpose.</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">S/Agentic University is a developing learning initiative for people who build, lead, and govern AI agents. We are gathering interest for a proposed Spring 2027 cohort.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={interestUrl} className="rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Register your interest ↗</a>
          <Link to="/programs" className="rounded border border-white/30 px-6 py-3 font-semibold text-white">Explore learning areas</Link>
        </div>
        <p className="mt-5 text-sm text-white/50">A registration of interest is not an application or admission. The timetable and learning tracks are subject to confirmation.</p>
      </div>
    </section>
    <section className="bg-[#12125a] px-6 py-24 text-[#f9f6f0]"><div className="mx-auto max-w-6xl">
      <p className="text-xs uppercase tracking-[.18em] text-[#f5b041]">What we are exploring</p>
      <h2 className="mb-10 mt-3 text-4xl md:text-5xl">From capability to accountable practice</h2>
      <div className="grid gap-5 md:grid-cols-3">{areas.map((area, index) => <article key={area.title} className="rounded-xl border border-white/10 bg-[#080828]/50 p-7"><p className="text-sm text-[#f5b041]">0{index + 1}</p><h3 className="mt-7 text-2xl">{area.title}</h3><p className="mt-4 leading-7 text-white/65">{area.text}</p></article>)}</div>
    </div></section>
    <section className="bg-[#080828] px-6 py-24 text-[#f9f6f0]"><div className="mx-auto max-w-6xl"><h2 className="max-w-3xl text-4xl">Help shape the first cohort</h2><p className="my-6 max-w-2xl text-white/70">Share your interest now. We will announce the details of participation, including any S/Passport prerequisite, before enrollment opens.</p><a href={interestUrl} className="inline-block rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Join the interest list ↗</a></div></section>
  </>
}
