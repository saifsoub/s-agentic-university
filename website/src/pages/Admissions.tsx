import { interestUrl } from '../interest'

export default function Admissions() {
  return <section className="min-h-[75vh] bg-[#080828] px-6 py-36 text-[#f9f6f0]"><div className="mx-auto max-w-4xl">
    <p className="text-xs uppercase tracking-[.18em] text-[#f5b041]">Planned Spring 2027 cohort</p>
    <h1 className="mt-4 text-5xl md:text-7xl">Register interest</h1>
    <p className="mt-8 leading-8 text-white/70">We are gathering interest as S/Agentic University takes shape. A registration of interest allows us to contact you with confirmed information about learning tracks, schedule, eligibility, and the admissions process. It is not an application, an enrollment, or a seat reservation.</p>
    <div className="mt-10 rounded-xl border border-[#f5b041]/30 bg-[#12125a] p-7"><h2 className="text-3xl">Before enrollment</h2><p className="mt-4 leading-7 text-white/70">The S/Passport is planned as a prerequisite for university enrollment. We will announce how applicants obtain one, along with any fees or assessment requirements, when enrollment details are final.</p></div>
    <a href={interestUrl} className="mt-10 inline-block rounded bg-[#f5b041] px-6 py-3 font-semibold text-[#080828]">Open the interest form ↗</a>
    <p className="mt-5 text-sm text-white/50">Spring 2027 is a target, subject to confirmation. No tuition, scholarships, deadline, or degree accreditation is announced.</p>
  </div></section>
}
