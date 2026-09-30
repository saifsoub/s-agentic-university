import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  VISUAL SEPARATORS                                                  */
/* ------------------------------------------------------------------ */

function GoldDivider() {
  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-[60px] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #f5b041, transparent)' }} />
    </div>
  )
}

function GradientSeparator() {
  return (
    <div className="w-full py-12">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,176,65,0.3), transparent)' }} />
    </div>
  )
}

function QuoteSeparator() {
  return (
    <div className="w-full py-16 md:py-24" style={{ backgroundColor: 'rgba(18, 18, 90, 0.3)' }}>
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <span className="block text-6xl leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#f5b041' }}>&ldquo;</span>
        <p
          className="italic text-lg md:text-xl leading-relaxed"
          style={{ fontFamily: "'Libre Caslon Text', 'Times New Roman', serif", color: 'rgba(249, 246, 240, 0.7)' }}
        >
          We do not merely study the future of intelligence. We architect it, one agent at a time.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const milestones = [
  {
    year: '2022',
    title: 'The Seed',
    description: 'Founders recognize the paradigm shift in autonomous agents. Initial research group forms at the intersection of deep learning and systems engineering.',
  },
  {
    year: '2023',
    title: 'The Fellowship',
    description: 'First cohort of 12 research fellows admitted. Open-source releases gain 10,000+ GitHub stars in the first month.',
  },
  {
    year: '2024',
    title: 'The Institute',
    description: 'Agentic University formally established as an independent graduate institution. Accreditation secured.',
  },
  {
    year: '2025',
    title: 'The Breakthrough',
    description: 'Research on constitutional agent design published at NeurIPS, adopted by major AI labs worldwide. Faculty grows to 20.',
  },
  {
    year: '2026',
    title: 'The Present',
    description: "First full master's cohort (40 students). 12 research labs operational. Ranked #1 in agentic AI research output.",
  },
]

const values = [
  {
    num: '01',
    title: 'Rigorous Inquiry',
    description: 'We pursue truth through systematic, evidence-based investigation. No hype, only hard-won understanding.',
  },
  {
    num: '02',
    title: 'Radical Openness',
    description: 'Research, code, and findings are shared openly. Progress accelerates when knowledge flows freely.',
  },
  {
    num: '03',
    title: 'Safety First',
    description: 'Every advance in capability is matched by advances in safety and alignment. We do not ship recklessly.',
  },
  {
    num: '04',
    title: 'Human Augmentation',
    description: 'Agents exist to amplify human potential, not replace it. Technology serves humanity.',
  },
]

const leaders = [
  {
    name: 'Seif Alsoub',
    role: 'Founder & Chancellor',
    bio: 'Visionary founder of Agentic University. A pioneer in autonomous agent systems and AI education, the founder established the institution to create a new generation of agent architects.',
    image: '/faculty-portrait-1.jpg',
  },
  {
    name: 'Dr. Elena Vasquez',
    role: 'Co-Founder & CEO',
    bio: 'Visionary leader in cognitive architectures. Former DeepMind principal scientist. Drove the university\'s founding mission to create a dedicated institution for agentic AI.',
    image: '/faculty-portrait-2.jpg',
  },
  {
    name: 'Prof. James Chen',
    role: 'Co-Founder & Dean of Research',
    bio: 'Architect of the OpenAgent protocol. Leading the university\'s research strategy and industry partnerships.',
    image: '/faculty-portrait-3.jpg',
  },
]

const partners = [
  { name: 'OpenAI', type: 'tech' as const },
  { name: 'Google DeepMind', type: 'tech' as const },
  { name: 'Anthropic', type: 'tech' as const },
  { name: 'Meta AI', type: 'tech' as const },
  { name: 'Microsoft Research', type: 'tech' as const },
  { name: 'Stanford HAI', type: 'academic' as const },
  { name: 'MIT CSAIL', type: 'academic' as const },
  { name: 'Berkeley AI Research', type: 'academic' as const },
  { name: 'Kimi (Moonshot AI)', type: 'tech' as const },
]

/* ------------------------------------------------------------------ */
/*  AMBIENT PARTICLE CANVAS (for hero bg)                             */
/* ------------------------------------------------------------------ */

function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w: number
    let h: number

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    const PARTICLE_COUNT = 60

    function resize() {
      w = canvas!.width = canvas!.offsetWidth
      h = canvas!.height = canvas!.offsetHeight
    }

    function init() {
      resize()
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        })
      }
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      // Draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 176, 65, ${p.alpha})`
        ctx.fill()
      }

      // Draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(245, 176, 65, ${0.04 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      /* Header entrance */
      gsap.from('.abt-header-h6', {
        opacity: 0.3, y: 15, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.abt-header-h1', {
        opacity: 0.3, y: 30, duration: 0.8, delay: 0.2, ease: 'power2.out',
      })
      gsap.from('.abt-header-body', {
        opacity: 0.3, y: 20, duration: 0.6, delay: 0.5, ease: 'power2.out',
      })

      /* Mission & Vision */
      gsap.from('.abt-mission-left', {
        scrollTrigger: { trigger: '.abt-mission-section', start: 'top 70%' },
        opacity: 0.3, y: 40, duration: 0.8, ease: 'power2.out',
      })
      gsap.from('.abt-mission-right', {
        scrollTrigger: { trigger: '.abt-mission-section', start: 'top 70%' },
        opacity: 0.3, y: 40, duration: 0.8, delay: 0.2, ease: 'power2.out',
      })

      /* History timeline */
      gsap.from('.abt-hist-h6', {
        scrollTrigger: { trigger: '.abt-hist-section', start: 'top 75%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.abt-hist-h2', {
        scrollTrigger: { trigger: '.abt-hist-section', start: 'top 75%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.abt-hist-item', {
        scrollTrigger: { trigger: '.abt-hist-timeline', start: 'top 80%' },
        opacity: 0.3, y: 50,
        duration: 0.7, stagger: 0.15, ease: 'power2.out',
      })
      gsap.from('.abt-hist-dot', {
        scrollTrigger: { trigger: '.abt-hist-timeline', start: 'top 80%' },
        scale: 0, opacity: 0.3,
        duration: 0.4, stagger: 0.15, delay: 0.1, ease: 'back.out(2)',
      })

      /* Core values */
      gsap.from('.abt-values-h6', {
        scrollTrigger: { trigger: '.abt-values-section', start: 'top 75%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.abt-values-h2', {
        scrollTrigger: { trigger: '.abt-values-section', start: 'top 75%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.abt-value-card', {
        scrollTrigger: { trigger: '.abt-values-grid', start: 'top 80%' },
        opacity: 0.3, y: 40,
        duration: 0.7, stagger: 0.1, ease: 'power2.out',
      })

      /* Leadership */
      gsap.from('.abt-lead-h6', {
        scrollTrigger: { trigger: '.abt-lead-section', start: 'top 75%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.abt-lead-h2', {
        scrollTrigger: { trigger: '.abt-lead-section', start: 'top 75%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.abt-leader-card', {
        scrollTrigger: { trigger: '.abt-leaders-grid', start: 'top 80%' },
        opacity: 0.3, y: 40,
        duration: 0.7, stagger: 0.12, ease: 'power2.out',
      })

      /* Partners */
      gsap.from('.abt-partners-h6', {
        scrollTrigger: { trigger: '.abt-partners-section', start: 'top 80%' },
        opacity: 0.3, y: 20, duration: 0.5, ease: 'power2.out',
      })
      gsap.from('.abt-partners-h2', {
        scrollTrigger: { trigger: '.abt-partners-section', start: 'top 80%' },
        opacity: 0.3, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
      })
      gsap.from('.abt-partner-badge', {
        scrollTrigger: { trigger: '.abt-partners-row', start: 'top 85%' },
        opacity: 0.3, scale: 0.9,
        duration: 0.4, stagger: 0.05, ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full">
      {/* ============================================================= */}
      {/* 1. PAGE HEADER HERO                                            */}
      {/* ============================================================= */}
      <section
        className="relative w-full flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: '50vh',
          backgroundColor: '#080828',
          padding: 'clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        }}
      >
        <AmbientParticles />
        <div className="relative z-10 max-w-[700px]">
          <p
            className="abt-header-h6 text-xs tracking-[0.14em] uppercase mb-6"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Our Story
          </p>
          <h1
            className="abt-header-h1 mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.05,
              color: '#f9f6f0',
            }}
          >
            Born from a Vision of Autonomous Intelligence
          </h1>
          <p
            className="abt-header-body"
            style={{
              fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              lineHeight: 1.7,
              color: 'rgba(249, 246, 240, 0.5)',
            }}
          >
            The world's first institution dedicated exclusively to the science and engineering of autonomous AI agents.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ============================================================= */}
      {/* 2. MISSION & VISION                                            */}
      {/* ============================================================= */}
      <section
        className="abt-mission-section w-full py-24 md:py-32"
        style={{ backgroundColor: '#080828' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Mission */}
            <div
              className="abt-mission-left p-8 rounded-xl"
              style={{
                borderTop: '3px solid #f5b041',
                backgroundColor: 'rgba(18, 18, 90, 0.2)',
              }}
            >
              <p
                className="text-xs tracking-[0.14em] uppercase mb-4"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
              >
                Mission
              </p>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  color: '#f9f6f0',
                }}
              >
                To Cultivate the Architects of Autonomy
              </h2>
              <p
                style={{
                  fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  lineHeight: 1.7,
                  color: 'rgba(249, 246, 240, 0.5)',
                }}
              >
                To advance the frontier of agentic AI through rigorous education, groundbreaking research, and ethical innovation. We cultivate engineers who build agents that augment human capability and serve the greater good.
              </p>
            </div>

            {/* Vision */}
            <div
              className="abt-mission-right p-8 rounded-xl"
              style={{
                borderTop: '3px solid #f5b041',
                backgroundColor: 'rgba(18, 18, 90, 0.2)',
              }}
            >
              <p
                className="text-xs tracking-[0.14em] uppercase mb-4"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
              >
                Vision
              </p>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  color: '#f9f6f0',
                }}
              >
                A World Where Agents Amplify Human Potential
              </h2>
              <p
                style={{
                  fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  lineHeight: 1.7,
                  color: 'rgba(249, 246, 240, 0.5)',
                }}
              >
                A world where autonomous agents operate with transparency, safety, and alignment with human values — transforming industries, accelerating scientific discovery, and expanding the boundaries of what's possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuoteSeparator />

      {/* ============================================================= */}
      {/* 3. HISTORY TIMELINE                                            */}
      {/* ============================================================= */}
      <section
        className="abt-hist-section w-full py-24 md:py-32"
        style={{ backgroundColor: '#12125a' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <p
            className="abt-hist-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Our Journey
          </p>
          <h2
            className="abt-hist-h2 text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Our History
          </h2>

          <div className="abt-hist-timeline relative">
            {/* Vertical center line - desktop */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: 'rgba(245, 176, 65, 0.15)' }}
            />
            {/* Vertical left line - mobile */}
            <div
              className="md:hidden absolute left-3 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'rgba(245, 176, 65, 0.15)' }}
            />

            <div className="flex flex-col gap-12 md:gap-8">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={m.year}
                    className={`abt-hist-item relative flex items-start ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content card */}
                    <div className="pl-10 md:pl-0 md:w-[45%]">
                      <div
                        className="p-6 rounded-xl transition-all duration-300 hover:border-[rgba(245,176,65,0.25)]"
                        style={{
                          backgroundColor: 'rgba(8, 8, 40, 0.5)',
                          border: '1px solid rgba(249, 246, 240, 0.06)',
                        }}
                      >
                        <p
                          className="text-2xl font-bold mb-1"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: '#f5b041',
                          }}
                        >
                          {m.year}
                        </p>
                        <h4
                          className="text-lg font-semibold mb-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: '#f9f6f0',
                          }}
                        >
                          {m.title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                            color: 'rgba(249, 246, 240, 0.5)',
                          }}
                        >
                          {m.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex md:w-[10%] justify-center items-start pt-6">
                      <div
                        className="abt-hist-dot w-4 h-4 rounded-full shrink-0"
                        style={{
                          backgroundColor: '#f5b041',
                          boxShadow: '0 0 12px rgba(245, 176, 65, 0.4)',
                        }}
                      />
                    </div>

                    {/* Mobile dot */}
                    <div
                      className="abt-hist-dot md:hidden absolute left-1 top-6 w-4 h-4 rounded-full shrink-0 -translate-x-1/2"
                      style={{
                        backgroundColor: '#f5b041',
                        boxShadow: '0 0 12px rgba(245, 176, 65, 0.4)',
                      }}
                    />

                    {/* Empty spacer for alternating layout on desktop */}
                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <GradientSeparator />

      {/* ============================================================= */}
      {/* 4. CORE VALUES                                                 */}
      {/* ============================================================= */}
      <section
        className="abt-values-section w-full py-24 md:py-32"
        style={{ backgroundColor: '#080828' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <p
            className="abt-values-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Principles
          </p>
          <h2
            className="abt-values-h2 text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Our Principles
          </h2>

          <div className="abt-values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.num}
                className="abt-value-card relative p-6 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(18, 18, 90, 0.4)',
                  border: '1px solid rgba(249, 246, 240, 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 176, 65, 0.25)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 176, 65, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 246, 240, 0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Decorative number */}
                <span
                  className="absolute top-3 right-4 text-5xl font-bold select-none pointer-events-none transition-opacity duration-300"
                  style={{
                    fontFamily: "'JetBrains Mono', Menlo, monospace",
                    color: 'rgba(245, 176, 65, 0.1)',
                  }}
                >
                  {v.num}
                </span>
                <div className="relative z-10">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: '#f9f6f0',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                      color: 'rgba(249, 246, 240, 0.5)',
                    }}
                  >
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ============================================================= */}
      {/* 5. LEADERSHIP                                                  */}
      {/* ============================================================= */}
      <section
        className="abt-lead-section w-full py-24 md:py-32"
        style={{ backgroundColor: '#12125a' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <p
            className="abt-lead-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Leadership
          </p>
          <h2
            className="abt-lead-h2 text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Founding Leadership
          </h2>

          <div className="abt-leaders-grid grid md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="abt-leader-card group rounded-xl p-6 text-center transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(8, 8, 40, 0.4)',
                  border: '1px solid rgba(249, 246, 240, 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 176, 65, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 246, 240, 0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Portrait placeholder */}
                <div
                  className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(245, 176, 65, 0.3)',
                    backgroundColor: 'rgba(18, 18, 90, 0.6)',
                  }}
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#f5b041;font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;">${leader.name.charAt(0)}</div>`
                      }
                    }}
                  />
                </div>
                <h3
                  className="text-base font-medium mb-1"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    color: '#f9f6f0',
                  }}
                >
                  {leader.name}
                </h3>
                <p
                  className="text-xs uppercase tracking-[0.1em] mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    color: '#f5b041',
                  }}
                >
                  {leader.role}
                </p>
                <div
                  className="w-12 h-px mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(245, 176, 65, 0.15)' }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
                    color: 'rgba(249, 246, 240, 0.5)',
                  }}
                >
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GradientSeparator />

      {/* ============================================================= */}
      {/* 6. PARTNERS & COLLABORATORS                                    */}
      {/* ============================================================= */}
      <section
        className="abt-partners-section w-full py-24 md:py-32"
        style={{ backgroundColor: '#080828' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8">
          <p
            className="abt-partners-h6 text-xs tracking-[0.14em] uppercase mb-4 text-center"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Collaboration
          </p>
          <h2
            className="abt-partners-h2 text-center mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Industry Partners
          </h2>

          <div className="abt-partners-row flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <div
                key={p.name}
                className="abt-partner-badge inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: 'rgba(18, 18, 90, 0.3)',
                  border: '1px solid rgba(249, 246, 240, 0.08)',
                  fontFamily: p.type === 'tech' ? "'JetBrains Mono', monospace" : "'Cormorant Garamond', serif",
                  fontSize: p.type === 'tech' ? '0.75rem' : '0.8rem',
                  color: 'rgba(249, 246, 240, 0.6)',
                  letterSpacing: p.type === 'tech' ? '0.02em' : '0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 176, 65, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(245, 176, 65, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 246, 240, 0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f5b041' }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 7. FINAL CTA                                                   */}
      {/* ============================================================= */}
      <section
        className="w-full py-32 text-center"
        style={{
          background: 'radial-gradient(ellipse at center, #12125a 0%, #080828 70%)',
        }}
      >
        <div className="max-w-[700px] mx-auto px-6 md:px-8">
          <p
            className="text-xs tracking-[0.14em] uppercase mb-4"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#f5b041' }}
          >
            Join Us
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-1.68px',
              lineHeight: 1.1,
              color: '#f9f6f0',
            }}
          >
            Be Part of the Institution That Builds the Future
          </h2>
          <p
            className="mb-10"
            style={{
              fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              lineHeight: 1.7,
              color: 'rgba(249, 246, 240, 0.5)',
            }}
          >
            Whether you are a prospective student, a research collaborator, or an industry partner — there is a place for you in our mission.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#/admissions"
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
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
