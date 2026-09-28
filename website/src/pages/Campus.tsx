import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCountUp } from '../hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const facilities = [
  {
    name: 'The Foundry',
    description:
      'Our robotics and embodied AI laboratory. Home to 20+ robotic platforms and simulation clusters.',
    image: '/lab-robotics.jpg',
  },
  {
    name: 'The Observatory',
    description:
      'Computer vision and perception research center. GPU clusters for training large vision models.',
    image: '/lab-computer-vision.jpg',
  },
  {
    name: 'The Library',
    description:
      '24-hour research library with holographic collaboration spaces and compute workstations.',
    image: '/lab-nlp.jpg',
  },
  {
    name: 'The Atrium',
    description:
      'Central gathering space for seminars, hackathons, and the annual Agentic AI Symposium.',
    image: '/hero-fallback.jpg',
  },
];

const events = [
  { name: 'Agentic AI Symposium', date: 'March 2026' },
  { name: 'Summer Hackathon', date: 'June 2026' },
  { name: 'Industry Demo Day', date: 'November 2026' },
  { name: 'Winter Research Retreat', date: 'January 2027' },
];

/* ------------------------------------------------------------------ */
/*  Stat Item Component                                                */
/* ------------------------------------------------------------------ */

function StatItem({
  value,
  suffix,
  prefix,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, inView, 1500);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-['Cormorant_Garamond'] font-bold text-[clamp(2.5rem,5vw,3.5rem)] text-[#f5b041] mb-1"
        style={{ textShadow: '0 0 20px rgba(245, 176, 65, 0.3)' }}
      >
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="font-['Space_Grotesk'] text-[10px] font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)]">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Campus() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* Header text stagger */
      gsap.from('.campus-header-h6', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.campus-header-h1', {
        y: 30,
        opacity: 0.3,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      });
      gsap.from('.campus-header-body', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.out',
      });

      /* Stats section */
      gsap.from('.stats-section', {
        y: 30,
        opacity: 0.3,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
      });

      /* Facility cards */
      gsap.from('.facility-card', {
        y: 40,
        opacity: 0.3,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.facilities-section',
          start: 'top 75%',
        },
      });

      /* Student life */
      gsap.from('.student-life-content', {
        y: 30,
        opacity: 0.3,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.student-life-section',
          start: 'top 75%',
        },
      });

      gsap.from('.event-item', {
        y: 20,
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.student-life-section',
          start: 'top 70%',
        },
      });

      /* Visit CTA */
      gsap.from('.visit-cta-content', {
        y: 30,
        opacity: 0.3,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.visit-section',
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-[#080828]">
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header Hero                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Background image with slow zoom */}
        <div className="absolute inset-0">
          <img
            src="/campus-aerial.jpg"
            alt="Campus aerial view"
            className="h-full w-full object-cover"
            style={{
              animation: 'campusZoom 20s linear infinite',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(8,8,40,0.8) 0%, rgba(8,8,40,0.3) 50%, rgba(8,8,40,0.5) 100%)',
            }}
          />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20"
          style={{ minHeight: '60vh', maxWidth: '700px' }}
        >
          <span className="campus-header-h6 font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            OUR CAMPUS
          </span>
          <h1
            className="campus-header-h1 font-['Cormorant_Garamond'] font-semibold text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-5"
            style={{ textShadow: '0 2px 24px rgba(8, 8, 40, 0.8)' }}
          >
            Where Innovation Resides
          </h1>
          <p className="campus-header-body font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] tracking-[0.2px] text-[rgba(249,246,240,0.5)] max-w-[550px]">
            A purpose-built campus designed for the unique demands of agentic
            research — from silent contemplation to high-intensity collaboration.
          </p>
        </div>

        {/* Zoom animation keyframes */}
        <style>{`
          @keyframes campusZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Campus Overview Stats                            */}
      {/* ============================================================ */}
      <section className="stats-section px-6 md:px-12 lg:px-20 py-16 bg-[#080828]">
        <div
          className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          style={{ maxWidth: '1200px' }}
        >
          <StatItem value={12} label="Research Labs" />
          <StatItem value={200} label="Graduate Students" />
          <StatItem value={40000} suffix=" sq ft" label="Research Space" />
          <StatItem value={24} suffix="/7" label="Lab Access" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Facilities Grid                                  */}
      {/* ============================================================ */}
      <section className="facilities-section px-6 md:px-12 lg:px-20 py-24 bg-[#12125a]">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            FACILITIES
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-12">
            World-Class Infrastructure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility.name}
                className="facility-card group relative overflow-hidden rounded-2xl border border-[rgba(249,246,240,0.06)] bg-[rgba(18,18,90,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,176,65,0.2)] hover:shadow-[0_0_30px_rgba(245,176,65,0.1)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12125a] via-transparent to-transparent opacity-60" />
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] font-semibold text-[22px] text-[#f9f6f0] mb-2">
                    {facility.name}
                  </h3>
                  <p className="font-['Libre_Caslon_Text'] text-sm leading-[1.7] text-[rgba(249,246,240,0.5)]">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Student Life                                     */}
      {/* ============================================================ */}
      <section className="student-life-section px-6 md:px-12 lg:px-20 py-24 bg-[#080828]">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            COMMUNITY
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-12">
            Life at the University
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Description */}
            <div className="student-life-content">
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-6">
                The University is more than a research institution — it is a vibrant
                community of scholars, builders, and visionaries. Students form
                lifelong connections through collaborative research, community
                events, and shared intellectual pursuits.
              </p>
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-6">
                Weekly symposia, mentorship programs, and interdisciplinary
                hackathons create an environment where ideas flourish. Student
                organizations span from robotics clubs to AI ethics discussion
                groups, ensuring every interest finds its community.
              </p>
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)]">
                Our mentorship program pairs each student with both a faculty
                advisor and an industry mentor, providing guidance that bridges
                academic research and real-world application.
              </p>
            </div>

            {/* Right — Events */}
            <div>
              <h3 className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-6">
                Upcoming Events
              </h3>
              <div className="flex flex-col gap-4">
                {events.map((event) => (
                  <div
                    key={event.name}
                    className="event-item flex items-center gap-4 p-4 rounded-xl border border-[rgba(249,246,240,0.06)] bg-[rgba(18,18,90,0.2)] transition-all duration-300 hover:border-[rgba(245,176,65,0.2)] hover:bg-[rgba(18,18,90,0.4)]"
                  >
                    <span className="inline-block font-['JetBrains_Mono'] text-xs text-[#f5b041] bg-[rgba(245,176,65,0.1)] rounded px-3 py-1.5 whitespace-nowrap">
                      {event.date}
                    </span>
                    <span className="font-['Cormorant_Garamond'] font-semibold text-lg text-[#f9f6f0]">
                      {event.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Visit CTA                                        */}
      {/* ============================================================ */}
      <section className="visit-section px-6 md:px-12 lg:px-20 py-24 bg-[#12125a]">
        <div className="mx-auto text-center" style={{ maxWidth: '800px' }}>
          <div className="visit-cta-content">
            <span className="block font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
              VISIT US
            </span>
            <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-1.68px] text-[#f9f6f0] mb-4">
              Experience It Yourself
            </h2>
            <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] max-w-[600px] mx-auto mb-8">
              We welcome prospective students, research collaborators, and
              industry partners to visit our campus. Schedule a guided tour or
              attend one of our upcoming open days.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 font-['Space_Grotesk'] text-sm font-medium uppercase tracking-[0.1em] text-[#080828] bg-[#f5b041] border-2 border-[#f5b041] px-8 py-4 rounded transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-[0_0_24px_rgba(245,176,65,0.4)]"
            >
              Schedule a Visit
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
