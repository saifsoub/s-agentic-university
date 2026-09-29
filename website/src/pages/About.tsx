import { interestUrl } from '../interest'

export default function About() {
  return <section className="min-h-[75vh] bg-[#080828] px-6 py-36 text-[#f9f6f0]"><div className="mx-auto max-w-4xl">
    <p className="text-xs uppercase tracking-[.18em] text-[#f5b041]">Our direction</p>
    <h1 className="mt-4 text-5xl md:text-7xl">A learning initiative for agentic systems</h1>
    <p className="mt-8 leading-8 text-white/70">S/Agentic University is being developed around a practical question: how can people build useful AI agents while keeping people in control of their work, authority, and outcomes?</p>
    <p className="mt-6 leading-8 text-white/70">Our proposed learning areas include agent engineering, leadership, and governance. The teaching team, research partnerships, campus model, formal credentials, and cohort details will be published when verified.</p>
    <a href={interestUrl} className="mt-10 inline-block rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Follow the first cohort ↗</a>
  </div></section>
}
