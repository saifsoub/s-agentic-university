import { interestUrl } from '../interest'

const topics = [
  ['AI agent engineering', 'Building and evaluating agents, tools, and workflows.'],
  ['Agent leadership', 'The human skills needed to direct work with AI agents.'],
  ['Governance and capability', 'Permissions, boundaries, measurement, and responsible operation.'],
]

export default function Programs() {
  return <section className="min-h-[75vh] bg-[#080828] px-6 py-36 text-[#f9f6f0]"><div className="mx-auto max-w-6xl">
    <p className="text-xs uppercase tracking-[.18em] text-[#f5b041]">Learning areas · Under development</p>
    <h1 className="mt-4 text-5xl md:text-7xl">What we hope to teach</h1>
    <p className="mt-8 max-w-3xl leading-8 text-white/70">These are proposed areas for a future cohort, not published degree programs. Curriculum, formats, instructors, fees, and dates have not yet been confirmed.</p>
    <div className="mt-12 grid gap-5 md:grid-cols-3">{topics.map(([title, description]) => <article key={title} className="rounded-xl border border-white/15 bg-[#12125a] p-8"><h2 className="text-3xl">{title}</h2><p className="mt-5 leading-7 text-white/65">{description}</p></article>)}</div>
    <a href={interestUrl} className="mt-10 inline-block rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Register interest ↗</a>
  </div></section>
}
