import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const labs = [
  {
    name: 'The Perception Lab',
    director: 'Dr. Elena Vasquez',
    description:
      'Investigating how agents perceive, interpret, and build world models from multimodal inputs. Current focus: visual reasoning and spatial understanding.',
    image: '/lab-computer-vision.jpg',
  },
  {
    name: 'The Orchestration Lab',
    director: 'Prof. James Chen',
    description:
      'Designing protocols and algorithms for multi-agent collaboration, consensus, and emergent collective intelligence.',
    image: '/lab-robotics.jpg',
  },
  {
    name: 'The Language Lab',
    director: 'Dr. Aisha Patel',
    description:
      'Advancing natural language understanding, generation, and tool use in agent systems. Leaders in retrieval-augmented generation.',
    image: '/lab-nlp.jpg',
  },
];

const researchAreas = [
  {
    title: 'Foundation Models for Agents',
    description:
      'Extending LLMs and VLMs with tool use, planning, and persistent memory capabilities.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Agent Safety & Alignment',
    description:
      'Developing theoretical frameworks and practical techniques for ensuring beneficial agent behavior.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Multi-Agent Orchestration',
    description:
      'Communication protocols, consensus algorithms, and emergent behavior in agent collectives.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98" />
        <path d="M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
  },
  {
    title: 'Embodied Agents',
    description:
      'Agents that perceive and act in simulated and physical environments through robotic interfaces.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3" />
        <path d="M15 1v3" />
        <path d="M9 20v3" />
        <path d="M15 20v3" />
        <path d="M20 9h3" />
        <path d="M20 14h3" />
        <path d="M1 9h3" />
        <path d="M1 14h3" />
      </svg>
    ),
  },
  {
    title: 'Neuro-Symbolic Integration',
    description:
      'Bridging neural network pattern recognition with symbolic reasoning for robust inference.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: 'Evaluating Agent Capabilities',
    description:
      'Benchmarks, red-teaming methodologies, and capability assessment frameworks.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5b041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const publications = [
  {
    title: 'Constitutional Agent Design: A Framework for Self-Correcting Autonomous Systems',
    authors: 'Vasquez et al.',
    venue: 'NeurIPS',
    year: '2025',
  },
  {
    title: 'Emergent Consensus in Large Multi-Agent Networks',
    authors: 'Chen et al.',
    venue: 'ICML',
    year: '2025',
  },
  {
    title: 'ToolFormer-2: Adaptive Tool Selection with Episodic Memory',
    authors: 'Patel et al.',
    venue: 'ACL',
    year: '2025',
  },
  {
    title: 'Safety Bounds for Recursive Self-Improvement in AI Agents',
    authors: 'Johnson et al.',
    venue: 'ICLR',
    year: '2026',
  },
  {
    title: 'Vector Memory Architectures for Long-Horizon Agent Tasks',
    authors: 'Kim et al.',
    venue: 'NeurIPS',
    year: '2025',
  },
  {
    title: 'The OpenAgent Protocol: Standardized Inter-Agent Communication',
    authors: 'Chen & Okafor',
    venue: 'arXiv',
    year: '2026',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Research() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', '2025', '2026'];

  const filteredPubs =
    activeFilter === 'All'
      ? publications
      : publications.filter((p) => p.year === activeFilter);

  useGSAP(
    () => {
      /* Header text stagger */
      gsap.from('.research-header-h6', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.research-header-h1', {
        y: 30,
        opacity: 0.3,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      });
      gsap.from('.research-header-body', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.out',
      });

      /* Lab cards */
      gsap.from('.lab-card', {
        y: 40,
        opacity: 0.3,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.labs-section',
          start: 'top 75%',
        },
      });

      /* Research areas */
      gsap.from('.area-card', {
        y: 30,
        opacity: 0.3,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.areas-section',
          start: 'top 75%',
        },
      });

      /* Publications */
      gsap.from('.pub-item', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pubs-section',
          start: 'top 70%',
        },
      });

      /* Open source */
      gsap.from('.opensource-stat', {
        y: 30,
        opacity: 0.3,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.opensource-section',
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-[#080828]">
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#080828]" style={{ minHeight: '50vh' }}>
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="#f5b041" opacity="0.5" />
                <line x1="30" y1="30" x2="90" y2="30" stroke="#f5b041" strokeWidth="0.5" opacity="0.15" />
                <line x1="30" y1="30" x2="30" y2="90" stroke="#f5b041" strokeWidth="0.5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20" style={{ minHeight: '50vh', maxWidth: '800px' }}>
          <span
            className="research-header-h6 font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4"
          >
            RESEARCH EXCELLENCE
          </span>
          <h1
            className="research-header-h1 font-['Cormorant_Garamond'] font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-5"
            style={{ textShadow: '0 2px 24px rgba(8, 8, 40, 0.8)' }}
          >
            Pushing the Boundaries of Agentic AI
          </h1>
          <p
            className="research-header-body font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] tracking-[0.2px] text-[rgba(249,246,240,0.5)] max-w-[600px]"
          >
            Our research labs produce breakthrough advances in autonomous systems, published at NeurIPS, ICML, ICLR, and ACL.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Research Lab Showcase                            */}
      {/* ============================================================ */}
      <section className="labs-section px-6 md:px-12 lg:px-20 py-24 bg-[#080828]">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            LABORATORIES
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-12">
            Where Discovery Happens
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <div
                key={lab.name}
                className="lab-card group relative overflow-hidden rounded-2xl border border-[rgba(249,246,240,0.06)] bg-[rgba(18,18,90,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,176,65,0.2)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080828] to-transparent opacity-40" />
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] font-semibold text-[22px] text-[#f9f6f0] mb-1">
                    {lab.name}
                  </h3>
                  <span className="block font-['Space_Grotesk'] text-xs text-[#f5b041] mb-3">
                    Directed by {lab.director}
                  </span>
                  <p className="font-['Libre_Caslon_Text'] text-sm leading-[1.7] text-[rgba(249,246,240,0.5)] mb-4 line-clamp-3">
                    {lab.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.7)] transition-all duration-300 hover:text-[#f5b041]"
                  >
                    Explore Lab
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Key Research Areas                               */}
      {/* ============================================================ */}
      <section className="areas-section px-6 md:px-12 lg:px-20 py-24 bg-[#12125a]">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            RESEARCH AREAS
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-12">
            Core Research Domains
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="area-card group rounded-2xl border border-[rgba(249,246,240,0.06)] bg-[rgba(18,18,90,0.3)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,176,65,0.2)]"
              >
                <div className="mb-5">{area.icon}</div>
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-xl text-[#f9f6f0] mb-3">
                  {area.title}
                </h3>
                <p className="font-['Libre_Caslon_Text'] text-sm leading-[1.7] text-[rgba(249,246,240,0.5)]">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Publication Highlights                           */}
      {/* ============================================================ */}
      <section className="pubs-section px-6 md:px-12 lg:px-20 py-24 bg-[#080828]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            PUBLICATIONS
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-8">
            Recent Publications
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-6 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.1em] pb-1 border-b-2 transition-all duration-200 ${
                  activeFilter === f
                    ? 'text-[#f9f6f0] border-[#f5b041]'
                    : 'text-[rgba(249,246,240,0.5)] border-transparent hover:text-[#f9f6f0]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Publication list */}
          <div className="flex flex-col">
            {filteredPubs.map((pub) => (
              <div
                key={pub.title}
                className="pub-item group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 py-6 border-b border-[rgba(249,246,240,0.06)] transition-all duration-200 hover:pl-3"
                style={{ borderLeft: '2px solid transparent' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = '#f5b041';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                }}
              >
                <span className="inline-block font-['JetBrains_Mono'] text-[11px] text-[#f5b041] bg-[rgba(245,176,65,0.08)] rounded px-2 py-0.5 self-start">
                  {pub.year}
                </span>
                <div className="flex-1">
                  <h4 className="font-['Cormorant_Garamond'] font-semibold text-lg text-[#f9f6f0] transition-colors duration-200 group-hover:text-[#f5b041] mb-1">
                    <em className="font-['Libre_Caslon_Text'] italic">{pub.title}</em>
                  </h4>
                  <span className="font-['Libre_Caslon_Text'] italic text-[13px] text-[rgba(249,246,240,0.5)]">
                    {pub.authors}
                  </span>
                </div>
                <span className="inline-block font-['JetBrains_Mono'] text-[11px] text-[#f5b041] border border-[rgba(245,176,65,0.3)] rounded px-3 py-1 self-start whitespace-nowrap">
                  {pub.venue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Open Source CTA                                  */}
      {/* ============================================================ */}
      <section className="opensource-section px-6 md:px-12 lg:px-20 py-24 bg-[#12125a]">
        <div className="mx-auto text-center" style={{ maxWidth: '1000px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            OPEN SOURCE
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-4">
            Open Source Contributions
          </h2>
          <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] max-w-[700px] mx-auto mb-12">
            We believe the best agentic infrastructure should be open, auditable, and freely available. Our commitment to open research ensures that breakthroughs benefit the entire community.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: '15+', label: 'Open Source Projects' },
              { value: '50k+', label: 'GitHub Stars' },
              { value: 'Apache 2.0', label: 'License' },
            ].map((stat) => (
              <div key={stat.label} className="opensource-stat text-center">
                <div className="font-['Cormorant_Garamond'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#f5b041] mb-1" style={{ textShadow: '0 0 20px rgba(245, 176, 65, 0.3)' }}>
                  {stat.value}
                </div>
                <div className="font-['Space_Grotesk'] text-[10px] font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-['Space_Grotesk'] text-sm font-medium uppercase tracking-[0.1em] text-[#080828] bg-[#f5b041] border-2 border-[#f5b041] px-8 py-4 rounded transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-[0_0_24px_rgba(245,176,65,0.4)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-['Space_Grotesk'] text-sm font-medium uppercase tracking-[0.1em] text-[rgba(249,246,240,0.7)] border-2 border-[rgba(249,246,240,0.2)] px-8 py-4 rounded transition-all duration-200 hover:text-[#f9f6f0] hover:border-[rgba(249,246,240,0.4)]"
            >
              Read Papers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
