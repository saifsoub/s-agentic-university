import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Check, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const timelineSteps = [
  { title: 'Applications Open', description: 'The application portal opens for the Class of 2028. Begin your journey.', date: 'Sep 1, 2026' },
  { title: 'Early Decision Deadline', description: 'Submit by this date for priority consideration and earlier notification.', date: 'Nov 15, 2026' },
  { title: 'Regular Decision Deadline', description: 'Final deadline for all regular decision applications.', date: 'Jan 15, 2027' },
  { title: 'Decision Notifications', description: 'All applicants receive their admissions decision via email.', date: 'Mar 31, 2027' },
  { title: 'Enrollment Deadline', description: 'Confirm your place in the cohort with your enrollment deposit.', date: 'May 1, 2027' },
  { title: 'Program Begins', description: 'Move in, meet your cohort, and begin the intensive master\'s program.', date: 'Sep 7, 2027' },
]

const requiredItems = [
  "Bachelor's degree in CS, Engineering, Mathematics, or related field",
  "Strong programming background (Python, C++, or Java)",
  "Linear algebra, probability, and statistics",
  "Two letters of recommendation",
  "Statement of purpose (500-1000 words)",
  "Coding sample or research paper",
]

const preferredItems = [
  "Industry experience in ML/AI (1+ years)",
  "Publications in ML/AI venues",
  "Open source contributions",
  "Graduate-level coursework in ML",
]

const faqData = [
  {
    q: "What makes S/Agentic University different from a traditional CS master's program?",
    a: "Our curriculum is exclusively focused on autonomous agent systems. Every course, lab, and project builds expertise in designing, deploying, and governing intelligent agents. You'll graduate with both deep theoretical knowledge and hands-on experience building production agent systems.",
  },
  {
    q: "Is the program in-person or remote?",
    a: "The Master of Agent Engineering is a full-time, residential program. The collaborative nature of agent research and the hands-on lab work require physical presence. However, select seminars and guest lectures are accessible to remote auditors.",
  },
  {
    q: "What career outcomes can I expect?",
    a: "Our graduates join top AI research labs (OpenAI, DeepMind, Anthropic), founding agent startups (raised $500M+ collectively), and Fortune 500 AI divisions. 98% of graduates secure their top-choice role within 3 months.",
  },
  {
    q: "Do I need prior research experience?",
    a: "Research experience is preferred but not required. We value diverse backgrounds — industry engineers, self-taught builders, and researchers from adjacent fields have all thrived in our program.",
  },
  {
    q: "What is the cohort size?",
    a: "We intentionally keep cohorts small (40 students) to ensure personalized mentorship and deep collaboration. Each student receives individual attention from faculty and industry advisors.",
  },
  {
    q: "Can I visit campus before applying?",
    a: "Absolutely. We offer monthly campus tours and virtual information sessions. Schedule a visit through our Campus page or attend one of our quarterly open house events.",
  },
]

const aidTypes = [
  { title: "Merit Scholarships", desc: "Up to full tuition coverage based on exceptional qualifications" },
  { title: "Research Assistantships", desc: "Stipend + tuition remission for qualifying students" },
  { title: "Industry Fellowships", desc: "Partner-sponsored full scholarships with summer internships" },
  { title: "Federal Aid", desc: "Eligible for federal student loans and work-study" },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Admissions() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [faqValue, setFaqValue] = useState<string>("")

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      /* Header entrance */
      gsap.from('.adm-header-h6', {
        opacity: 0.3, y: 15, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.adm-header-h1', {
        opacity: 0.3, y: 30, duration: 0.8, delay: 0.2, ease: 'power2.out',
      })
      gsap.from('.adm-header-body', {
        opacity: 0.3, y: 20, duration: 0.6, delay: 0.5, ease: 'power2.out',
      })
      gsap.from('.adm-header-cta', {
        opacity: 0.3, y: 20, duration: 0.6, delay: 0.8, ease: 'power2.out',
      })

      /* Timeline section */
      gsap.from('.adm-timeline-h6', {
        scrollTrigger: { trigger: '.adm-timeline-section', start: 'top 75%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.adm-timeline-h2', {
        scrollTrigger: { trigger: '.adm-timeline-section', start: 'top 75%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })

      /* Timeline nodes stagger */
      gsap.from('.adm-timeline-node', {
        scrollTrigger: { trigger: '.adm-timeline-nodes', start: 'top 80%' },
        opacity: 0.3, scale: 0.5, y: 30,
        duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)',
      })

      /* Timeline connectors animate width */
      gsap.from('.adm-timeline-connector', {
        scrollTrigger: { trigger: '.adm-timeline-nodes', start: 'top 80%' },
        scaleX: 0, transformOrigin: 'left center',
        duration: 0.4, stagger: 0.15, delay: 0.3, ease: 'power2.out',
      })

      /* Timeline cards */
      gsap.from('.adm-timeline-card', {
        scrollTrigger: { trigger: '.adm-timeline-nodes', start: 'top 75%' },
        opacity: 0.3, y: 40,
        duration: 0.6, stagger: 0.15, delay: 0.2, ease: 'power2.out',
      })

      /* Requirements columns */
      gsap.from('.adm-req-left', {
        scrollTrigger: { trigger: '.adm-req-section', start: 'top 75%' },
        opacity: 0.3, x: -40, duration: 0.8, ease: 'power2.out',
      })
      gsap.from('.adm-req-right', {
        scrollTrigger: { trigger: '.adm-req-section', start: 'top 75%' },
        opacity: 0.3, x: 40, duration: 0.8, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.adm-req-item', {
        scrollTrigger: { trigger: '.adm-req-section', start: 'top 70%' },
        opacity: 0.3, y: 15,
        duration: 0.4, stagger: 0.06, delay: 0.3, ease: 'power2.out',
      })

      /* Tuition card */
      gsap.from('.adm-tuition-card', {
        scrollTrigger: { trigger: '.adm-tuition-section', start: 'top 75%' },
        opacity: 0.3, scale: 0.95, y: 30,
        duration: 0.8, ease: 'power2.out',
      })
      gsap.from('.adm-aid-item', {
        scrollTrigger: { trigger: '.adm-aid-grid', start: 'top 85%' },
        opacity: 0.3, y: 20,
        duration: 0.5, stagger: 0.08, ease: 'power2.out',
      })

      /* FAQ */
      gsap.from('.adm-faq-h6', {
        scrollTrigger: { trigger: '.adm-faq-section', start: 'top 75%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.adm-faq-h2', {
        scrollTrigger: { trigger: '.adm-faq-section', start: 'top 75%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.adm-faq-item', {
        scrollTrigger: { trigger: '.adm-faq-accordion', start: 'top 80%' },
        opacity: 0.3, y: 20,
        duration: 0.5, stagger: 0.06, ease: 'power2.out',
      })

      /* Final CTA */
      gsap.from('.adm-cta-el', {
        scrollTrigger: { trigger: '.adm-cta-section', start: 'top 75%' },
        opacity: 0.3, y: 30,
        duration: 0.7, stagger: 0.1, ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  /* Animated gradient background for header */
  useEffect(() => {
    const grad = document.querySelector('.adm-header-bg') as HTMLElement
    if (!grad) return
    let pos = 0
    const interval = setInterval(() => {
      pos = (pos + 0.02) % 100
      grad.style.backgroundPosition = `${pos}% 50%`
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      {/* ============================================================= */}
      {/* 1. PAGE HEADER                                                 */}
      {/* ============================================================= */}
      <section
        className="adm-header-bg relative w-full flex items-center"
        style={{
          minHeight: '40vh',
          background: 'linear-gradient(135deg, #080828 0%, #12125a 50%, #1a1a6e 100%)',
          backgroundSize: '200% 200%',
          padding: 'clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        }}
      >
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <p
            className="adm-header-h6 text-xs tracking-[0.14em] uppercase mb-6"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Admissions
          </p>
          <h1
            className="adm-header-h1 max-w-[700px] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.05,
              color: '#f9f6f0',
            }}
          >
            Join the Next Generation of Agent Architects
          </h1>
          <p
            className="adm-header-body max-w-[540px] mb-8"
            style={{
              fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              lineHeight: 1.7,
              color: 'rgba(249, 246, 240, 0.5)',
            }}
          >
            We seek exceptional engineers, researchers, and visionaries ready to shape the future of autonomous AI.
          </p>
          <div className="adm-header-cta flex flex-wrap items-center gap-4">
            <a
              href="#/apply"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                backgroundColor: '#f5b041',
                color: '#080828',
                border: '2px solid #f5b041',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9c34d'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 176, 65, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5b041'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Application
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 2. APPLICATION TIMELINE                                        */}
      {/* ============================================================= */}
      <section
        className="adm-timeline-section w-full py-24"
        style={{ backgroundColor: '#080828' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <p
            className="adm-timeline-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            The Process
          </p>
          <h2
            className="adm-timeline-h2 text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Your Path to Admission
          </h2>

          {/* Desktop: horizontal timeline */}
          <div className="adm-timeline-nodes hidden md:block">
            {/* Timeline line */}
            <div className="relative">
              <div
                className="absolute top-3 left-0 right-0 h-0.5"
                style={{ backgroundColor: 'rgba(245, 176, 65, 0.15)' }}
              />
              <div className="relative grid grid-cols-6 gap-4">
                {timelineSteps.map((step, i) => (
                  <div key={i} className="adm-timeline-node flex flex-col items-center text-center">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mb-4"
                      style={{
                        border: '2px solid #f5b041',
                        backgroundColor: i < 2 ? '#f5b041' : '#080828',
                      }}
                    >
                      <span
                        className="text-[10px] font-bold"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: i < 2 ? '#080828' : '#f5b041',
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div
                      className="adm-timeline-card p-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(18, 18, 90, 0.3)',
                        border: '1px solid rgba(249, 246, 240, 0.06)',
                      }}
                    >
                      <p
                        className="text-[10px] font-medium uppercase tracking-[0.1em] mb-2 px-2 py-1 inline-block rounded"
                        style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          backgroundColor: 'rgba(245, 176, 65, 0.08)',
                          color: '#f5b041',
                        }}
                      >
                        {step.date}
                      </p>
                      <h4
                        className="text-sm font-semibold mb-2"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: '#f9f6f0',
                        }}
                      >
                        {step.title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{
                          fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                          color: 'rgba(249, 246, 240, 0.5)',
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="adm-timeline-nodes md:hidden relative pl-8">
            <div
              className="absolute left-3 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: 'rgba(245, 176, 65, 0.15)' }}
            />
            <div className="flex flex-col gap-8">
              {timelineSteps.map((step, i) => (
                <div key={i} className="adm-timeline-node relative">
                  <div
                    className="absolute -left-5 top-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      border: '2px solid #f5b041',
                      backgroundColor: i < 2 ? '#f5b041' : '#080828',
                    }}
                  >
                    <span
                      className="text-[10px] font-bold"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: i < 2 ? '#080828' : '#f5b041',
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div
                    className="adm-timeline-card p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(18, 18, 90, 0.3)',
                      border: '1px solid rgba(249, 246, 240, 0.06)',
                    }}
                  >
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.1em] mb-2 px-2 py-1 inline-block rounded"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        backgroundColor: 'rgba(245, 176, 65, 0.08)',
                        color: '#f5b041',
                      }}
                    >
                      {step.date}
                    </p>
                    <h4
                      className="text-base font-semibold mb-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: '#f9f6f0',
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                        color: 'rgba(249, 246, 240, 0.5)',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. REQUIREMENTS & PREREQUISITES                               */}
      {/* ============================================================= */}
      <section
        className="adm-req-section w-full py-24"
        style={{ backgroundColor: '#12125a' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <p
            className="adm-req-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Requirements
          </p>
          <h2
            className="adm-req-h2 text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            What We Look For
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Required */}
            <div className="adm-req-left">
              <h3
                className="text-xl font-semibold mb-6 pb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: '#f9f6f0',
                  borderBottom: '1px solid rgba(245, 176, 65, 0.15)',
                }}
              >
                Required
              </h3>
              <ul className="flex flex-col">
                {requiredItems.map((item, i) => (
                  <li
                    key={i}
                    className="adm-req-item flex items-start gap-3 py-3"
                    style={{ borderBottom: '1px solid rgba(249, 246, 240, 0.04)' }}
                  >
                    <Check size={18} className="mt-0.5 shrink-0" style={{ color: '#f5b041' }} />
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                        color: '#f9f6f0',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred */}
            <div className="adm-req-right">
              <h3
                className="text-xl font-semibold mb-6 pb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: '#f9f6f0',
                  borderBottom: '1px solid rgba(245, 176, 65, 0.15)',
                }}
              >
                Preferred
              </h3>
              <ul className="flex flex-col">
                {preferredItems.map((item, i) => (
                  <li
                    key={i}
                    className="adm-req-item flex items-start gap-3 py-3"
                    style={{ borderBottom: '1px solid rgba(249, 246, 240, 0.04)' }}
                  >
                    <Check size={18} className="mt-0.5 shrink-0" style={{ color: '#f5b041' }} />
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                        color: '#f9f6f0',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 4. TUITION & FINANCIAL AID                                    */}
      {/* ============================================================= */}
      <section
        className="adm-tuition-section w-full py-24"
        style={{ backgroundColor: '#080828' }}
      >
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <p
            className="text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Investment
          </p>
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Investment in Your Future
          </h2>

          {/* Tuition Card */}
          <div
            className="adm-tuition-card rounded-2xl p-8 md:p-12 mb-12 text-center"
            style={{
              backgroundColor: 'rgba(18, 18, 90, 0.4)',
              border: '1px solid rgba(245, 176, 65, 0.15)',
              borderLeft: '4px solid #f5b041',
            }}
          >
            <p
              className="mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#f5b041',
              }}
            >
              $125,000
            </p>
            <p
              className="text-xs uppercase tracking-[0.1em] mb-8"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                color: 'rgba(249, 246, 240, 0.5)',
              }}
            >
              Total Program Cost
            </p>
            <div
              className="w-full h-px mb-8"
              style={{ backgroundColor: 'rgba(245, 176, 65, 0.1)' }}
            />
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                'Full tuition for all four programs',
                'Unlimited compute cluster access',
                'Research materials and conference travel',
                'Mentorship from industry leaders',
              ].map((inc, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={16} style={{ color: '#f5b041' }} />
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                      color: 'rgba(249, 246, 240, 0.5)',
                    }}
                  >
                    {inc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Aid */}
          <div className="adm-aid-grid grid sm:grid-cols-2 gap-4">
            {aidTypes.map((aid, i) => (
              <div
                key={i}
                className="adm-aid-item p-5 rounded-xl transition-all duration-300 hover:border-[rgba(245,176,65,0.3)]"
                style={{
                  backgroundColor: 'rgba(18, 18, 90, 0.3)',
                  border: '1px solid rgba(249, 246, 240, 0.06)',
                }}
              >
                <h4
                  className="text-sm font-medium mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    color: '#f5b041',
                  }}
                >
                  {aid.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                    color: 'rgba(249, 246, 240, 0.5)',
                  }}
                >
                  {aid.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 5. FAQ ACCORDION                                               */}
      {/* ============================================================= */}
      <section
        className="adm-faq-section w-full py-24"
        style={{ backgroundColor: '#12125a' }}
      >
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <p
            className="adm-faq-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            FAQ
          </p>
          <h2
            className="adm-faq-h2 text-center mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Frequently Asked Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            value={faqValue}
            onValueChange={setFaqValue}
            className="adm-faq-accordion"
          >
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="adm-faq-item"
                style={{ borderBottom: '1px solid rgba(249, 246, 240, 0.06)' }}
              >
                <AccordionTrigger
                  className="py-5 text-left hover:no-underline"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#f9f6f0',
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="pb-5"
                  style={{
                    fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'rgba(249, 246, 240, 0.5)',
                  }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 6. FINAL CTA                                                   */}
      {/* ============================================================= */}
      <section
        className="adm-cta-section w-full py-32 text-center"
        style={{
          background: 'radial-gradient(ellipse at center, #12125a 0%, #080828 70%)',
        }}
      >
        <div className="max-w-[700px] mx-auto px-6 md:px-8">
          <p
            className="adm-cta-el text-xs tracking-[0.14em] uppercase mb-4"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Ready?
          </p>
          <h2
            className="adm-cta-el mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Ready to Apply?
          </h2>
          <p
            className="adm-cta-el mb-10"
            style={{
              fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              lineHeight: 1.7,
              color: 'rgba(249, 246, 240, 0.5)',
            }}
          >
            Applications for the Class of 2028 open September 1, 2026.
          </p>
          <div className="adm-cta-el flex flex-wrap items-center justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                backgroundColor: '#f5b041',
                color: '#080828',
                border: '2px solid #f5b041',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9c34d'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 176, 65, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5b041'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Request Info
              <ChevronRight size={16} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                backgroundColor: 'transparent',
                color: '#f5b041',
                border: '2px solid #f5b041',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(245, 176, 65, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Apply Now
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
