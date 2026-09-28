import { interestUrl } from '../interest'

export default function Apply() {
  return <section className="min-h-[65vh] bg-[#080828] px-6 py-36 text-[#f9f6f0]"><div className="mx-auto max-w-3xl">
    <p className="text-xs uppercase tracking-[.18em] text-[#f5b041]">Planned Spring 2027 cohort</p>
    <h1 className="mt-4 text-5xl md:text-7xl">Share your interest</h1>
    <p className="mt-7 leading-8 text-white/70">We have a dedicated interest form for the planned first cohort. We will contact registrants as the schedule, learning tracks, and admissions process are confirmed. Sharing your interest is not an application or admission.</p>
    <a href={interestUrl} className="mt-10 inline-block rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Open registration of interest ↗</a>
  </div></section>
}
