import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const facultyMembers = [
  {
    name: 'Dr. Elena Vasquez',
    title: 'Director of Agent Architecture',
    bio: 'Former DeepMind Senior Researcher. Pioneer in cognitive architectures for large language models. 200+ publications.',
    image: '/faculty-portrait-1.jpg',
    publications: 200,
  },
  {
    name: 'Prof. James Chen',
    title: 'Chair of Multi-Agent Systems',
    bio: 'MIT Media Lab alum. Led the development of the OpenAgent protocol. NSF CAREER awardee.',
    image: '/faculty-portrait-2.jpg',
    publications: 145,
  },
  {
    name: 'Dr. Aisha Patel',
    title: 'Head of Reasoning Research',
    bio: 'Stanford PhD. Expert in chain-of-thought reasoning and temporal planning systems.',
    image: '/faculty-portrait-3.jpg',
    publications: 98,
  },
  {
    name: 'Prof. Marcus Johnson',
    title: 'Director of AI Safety',
    bio: 'Former Anthropic safety lead. Developed constitutional AI frameworks now industry standard.',
    image: '/faculty-portrait-4.jpg',
    publications: 172,
  },
  {
    name: 'Dr. Sarah Kim',
    title: 'Chair of Memory Systems',
    bio: 'Berkeley AI Research. Pioneer in vector database architectures and episodic memory for agents.',
    image: '/faculty-portrait-5.jpg',
    publications: 134,
  },
  {
    name: 'Prof. David Okafor',
    title: 'Head of Industry Partnerships',
    bio: 'Former OpenAI engineering lead. Built production agent systems serving 100M+ users.',
    image: '/faculty-portrait-6.jpg',
    publications: 87,
  },
];

const fellows = [
  {
    initials: 'YT',
    name: 'Dr. Yuki Tanaka',
    institution: 'RIKEN, Tokyo',
    focus: 'Neuro-symbolic AI',
  },
  {
    initials: 'LA',
    name: 'Dr. Lars Andersen',
    institution: 'MPI, Tübingen',
    focus: 'Embodied Agents',
  },
  {
    initials: 'PS',
    name: 'Dr. Priya Sharma',
    institution: 'IIT Delhi',
    focus: 'Multimodal Agents',
  },
  {
    initials: 'HM',
    name: 'Dr. Hans Mueller',
    institution: 'ETH Zürich',
    focus: 'Agent Verification',
  },
];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Faculty() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fellowsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ---- Hero entrance ---- */
      const heroEls = heroRef.current?.querySelectorAll('.hero-animate');
      if (heroEls) {
        gsap.from(heroEls, {
          y: 25,
          opacity: 0.3,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      /* ---- Faculty cards stagger ---- */
      const cards = gridRef.current?.querySelectorAll('.faculty-card');
      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0.3,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        });
      }

      /* ---- Fellow cards ---- */
      const fellowCards = fellowsRef.current?.querySelectorAll('.fellow-card');
      if (fellowCards) {
        gsap.from(fellowCards, {
          y: 30,
          opacity: 0.3,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: fellowsRef.current,
            start: 'top 80%',
          },
        });
      }

      /* ---- CTA ---- */
      const ctaEls = ctaRef.current?.querySelectorAll('.cta-animate');
      if (ctaEls) {
        gsap.from(ctaEls, {
          y: 30,
          opacity: 0.3,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
        });
      }
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className="bg-[#080828]">
      {/* ============================================================ */}
      {/* SECTION 1 — PAGE HEADER                                       */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] flex items-center overflow-hidden px-4 md:px-8 lg:px-12 lg:px-20"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #080828 0%, #12125a 100%)',
          }}
        />
        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full py-24 lg:py-32">
          <p className="hero-animate font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-6">
            World-Class Educators
          </p>
          <h1
            className="hero-animate font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] text-[#f9f6f0] mb-6"
            style={{ letterSpacing: '-1.68px' }}
          >
            Minds Shaping the Agentic Revolution
          </h1>
          <p
            className="hero-animate font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] max-w-[600px]"
            style={{ letterSpacing: '0.2px' }}
          >
            World-renowned researchers and practitioners who have shaped the field
            of autonomous agents and continue to push its boundaries.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — FACULTY GRID                                      */}
      {/* ============================================================ */}
      <section className="relative px-4 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto" ref={gridRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((f) => (
              <div
                key={f.name}
                className="faculty-card group border border-[rgba(249,246,240,0.08)] rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-[rgba(245,176,65,0.25)] hover:shadow-[0_12px_40px_rgba(8,8,40,0.4)]"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#12125a]">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-['Cormorant_Garamond'] text-[1.375rem] font-semibold text-[#f9f6f0] mb-2"
                    style={{ letterSpacing: '-0.5px' }}
                  >
                    {f.name}
                  </h3>
                  <p className="font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[#f5b041] mb-3">
                    {f.title}
                  </p>
                  <p className="font-['Libre_Caslon_Text'] text-[0.8125rem] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-4">
                    {f.bio}
                  </p>

                  {/* Separator */}
                  <div className="w-full h-[1px] bg-[rgba(245,176,65,0.15)] mb-4" />

                  {/* Publications */}
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[rgba(249,246,240,0.4)]" />
                    <span className="font-['JetBrains_Mono'] text-[0.75rem] text-[rgba(249,246,240,0.5)]">
                      {f.publications}+ publications
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — RESEARCH FELLOWS                                  */}
      {/* ============================================================ */}
      <section ref={fellowsRef} className="relative bg-[#12125a] px-4 md:px-8 lg:px-12 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <p className="font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
              Visiting Scholars
            </p>
            <h2
              className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0]"
              style={{ letterSpacing: '-1.68px' }}
            >
              Visiting Research Fellows
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {fellows.map((f) => (
              <div
                key={f.name}
                className="fellow-card flex-shrink-0 w-[260px] snap-start bg-[rgba(8,8,40,0.5)] border border-[rgba(245,176,65,0.1)] rounded-xl p-6 transition-all duration-300 hover:border-[rgba(245,176,65,0.3)] hover:-translate-y-1"
              >
                {/* Initials badge */}
                <div className="w-12 h-12 rounded-full bg-[rgba(245,176,65,0.12)] border border-[rgba(245,176,65,0.2)] flex items-center justify-center mb-4">
                  <span className="font-['JetBrains_Mono'] text-[0.875rem] font-bold text-[#f5b041]">
                    {f.initials}
                  </span>
                </div>

                <h4
                  className="font-['Cormorant_Garamond'] text-[1.125rem] font-semibold text-[#f9f6f0] mb-1"
                  style={{ letterSpacing: '-0.3px' }}
                >
                  {f.name}
                </h4>
                <p className="font-['Space_Grotesk'] text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[rgba(249,246,240,0.4)] mb-3">
                  {f.institution}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.08em] text-[#f5b041] bg-[rgba(245,176,65,0.08)] border border-[rgba(245,176,65,0.12)] rounded px-2 py-0.5">
                    {f.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — JOIN THE FACULTY CTA                              */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        className="relative px-4 md:px-8 lg:px-12 py-24"
      >
        <div className="max-w-[700px] mx-auto text-center">
          <p className="cta-animate font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            Careers
          </p>
          <h2
            className="cta-animate font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0] mb-6"
            style={{ letterSpacing: '-1.68px' }}
          >
            Join Our Ranks
          </h2>
          <p className="cta-animate font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-10">
            We are always seeking exceptional researchers and practitioners who
            share our vision for the future of autonomous intelligence. If you
            are passionate about shaping the next generation of agent engineers,
            we would love to hear from you.
          </p>
          <div className="cta-animate">
            <button
              type="button"
              className="group inline-flex items-center gap-2 font-['Space_Grotesk'] text-[0.875rem] font-medium uppercase tracking-[0.1em] text-[#080828] bg-[#f5b041] border-2 border-[#f5b041] px-8 py-4 rounded transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-[0_0_24px_rgba(245,176,65,0.4)]"
            >
              View Open Positions
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
