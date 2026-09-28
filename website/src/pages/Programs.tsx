import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Clock, Users, Calendar, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const disciplines = [
  {
    num: '01',
    title: 'Agent Architecture',
    desc: 'Design the cognitive scaffolding of autonomous agents.',
    topics: ['Cognitive Architecture', 'Perception Systems', 'Action Spaces', 'World Models'],
  },
  {
    num: '02',
    title: 'Multi-Agent Systems',
    desc: 'Orchestrate collectives of collaborating agents.',
    topics: ['Agent Communication', 'Consensus Mechanisms', 'Emergent Behavior', 'Swarm Intelligence'],
  },
  {
    num: '03',
    title: 'Reasoning & Planning',
    desc: 'Build agents that think before they act.',
    topics: ['Chain-of-Thought', 'Tree Search', 'Temporal Planning', 'Causal Reasoning'],
  },
  {
    num: '04',
    title: 'Tool Use & APIs',
    desc: 'Equip agents with external capabilities.',
    topics: ['Function Calling', 'API Integration', 'Browser Automation', 'Code Execution'],
  },
  {
    num: '05',
    title: 'Memory & State',
    desc: 'Give agents persistent knowledge and context.',
    topics: ['Vector Databases', 'Episodic Memory', 'Knowledge Graphs', 'Context Windows'],
  },
  {
    num: '06',
    title: 'Safety & Alignment',
    desc: 'Ensure agents act beneficially and reliably.',
    topics: ['Reward Hacking', 'Constitutional AI', 'Interpretability', 'Red Teaming'],
  },
];

const terms = [
  {
    term: 'Term 1',
    title: 'Foundations',
    courses: ['Cognitive Architectures', 'ML Systems', 'Ethics of AI'],
  },
  {
    term: 'Term 2',
    title: 'Core Systems',
    courses: ['Agent Design Patterns', 'RLHF', 'Multi-Agent Protocols'],
  },
  {
    term: 'Term 3',
    title: 'Specialization',
    courses: ['Choose track: Research, Industry, or Entrepreneurship'],
  },
  {
    term: 'Term 4',
    title: 'Advanced Topics',
    courses: ['Constitutional AI', 'Agent Safety', 'Distributed Systems'],
  },
  {
    term: 'Term 5',
    title: 'Thesis / Project',
    courses: ['Independent research or startup incubation'],
  },
  {
    term: 'Term 6',
    title: 'Capstone',
    courses: ['Real-world deployment with industry partner'],
  },
];

/* ------------------------------------------------------------------ */
/*  PARTICLE CANVAS (CTA Section)                                      */
/* ------------------------------------------------------------------ */

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];

    const count = Math.floor((w * h) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 176, 65, ${p.alpha})`;
        ctx.fill();
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 176, 65, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initCanvas]);

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
        pointerEvents: 'none',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(() => {
    if (!ref.current || hasAnimated.current) return;
    const num = parseInt(value.replace(/\D/g, ''), 10);
    if (isNaN(num)) return;

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      },
    });
  }, []);

  return (
    <span ref={ref} className="text-[#f5b041] font-semibold">
      0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Programs() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ---- Hero entrance ---- */
      const heroEls = heroRef.current?.querySelectorAll('.hero-animate');
      if (heroEls) {
        gsap.from(heroEls, {
          y: 30,
          opacity: 0.3,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      /* ---- Discipline cards stagger ---- */
      const cards = gridRef.current?.querySelectorAll('.discipline-card');
      if (cards) {
        gsap.from(cards, {
          y: 40,
          opacity: 0.3,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        });
      }

      /* ---- Featured section ---- */
      const featuredEls = featuredRef.current?.querySelectorAll('.featured-animate');
      if (featuredEls) {
        gsap.from(featuredEls, {
          y: 40,
          opacity: 0.3,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 70%',
          },
        });
      }

      /* ---- Timeline nodes ---- */
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      if (nodes) {
        gsap.from(nodes, {
          x: -30,
          opacity: 0.3,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
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
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
          },
        });
      }
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className="bg-[#080828]">
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                              */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-12"
      >
        {/* Gradient overlay */}
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

        <div className="relative z-10 text-center max-w-[800px] py-24">
          <p
            className="hero-animate font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-6"
          >
            Academic Programs
          </p>
          <h1
            className="hero-animate font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] text-[#f9f6f0] mb-6"
            style={{ letterSpacing: '-1.68px' }}
          >
            Forge the Future of Intelligence
          </h1>
          <p
            className="hero-animate font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] max-w-[600px] mx-auto"
            style={{ letterSpacing: '0.2px' }}
          >
            Rigorous, multidisciplinary programs designed to transform exceptional
            engineers into architects of autonomous systems.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — DISCIPLINE GRID                                   */}
      {/* ============================================================ */}
      <section className="relative px-4 md:px-8 lg:px-12 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <p className="font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
              The Disciplines
            </p>
            <h2
              className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0]"
              style={{ letterSpacing: '-1.68px' }}
            >
              Six Pillars of Mastery
            </h2>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {disciplines.map((d) => (
              <div
                key={d.num}
                className="discipline-card group relative bg-[#12125a] border border-[rgba(245,176,65,0.08)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,176,65,0.3)] hover:shadow-[0_0_24px_rgba(245,176,65,0.12)]"
              >
                <span className="font-['JetBrains_Mono'] text-[2rem] font-bold text-[#f5b041] opacity-60 block mb-3">
                  {d.num}
                </span>
                <h3
                  className="font-['Cormorant_Garamond'] text-[1.5rem] font-semibold text-[#f9f6f0] mb-3"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  {d.title}
                </h3>
                <p className="font-['Libre_Caslon_Text'] text-[0.875rem] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-4">
                  {d.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.topics.map((t) => (
                    <span
                      key={t}
                      className="font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[#f5b041] bg-[rgba(245,176,65,0.08)] border border-[rgba(245,176,65,0.12)] rounded px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — FEATURED PROGRAM                                  */}
      {/* ============================================================ */}
      <section
        ref={featuredRef}
        className="relative bg-[#12125a] px-4 md:px-8 lg:px-12 py-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="featured-animate mb-12">
            <p className="font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
              Flagship Program
            </p>
            <h2
              className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0]"
              style={{ letterSpacing: '-1.68px' }}
            >
              Master of Agent Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — description */}
            <div className="featured-animate border-l-2 border-[#f5b041] pl-8">
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-[1.7] text-[rgba(249,246,240,0.7)] mb-6">
                The Master of Agent Engineering is our flagship residential program,
                designed for exceptional engineers who aspire to build the next
                generation of autonomous systems. Over 18 intensive months, students
                progress from foundational principles to the frontier of agentic AI
                research — mastering everything from cognitive architectures to
                constitutional safety frameworks.
              </p>
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-[1.7] text-[rgba(249,246,240,0.7)] mb-6">
                Our philosophy combines rigorous theoretical grounding with hands-on
                implementation. Every student designs, builds, and deploys a
                functioning agent system by graduation — whether that means a
                research prototype pushing the boundaries of multi-agent
                coordination, or a production system serving real users through our
                industry partnerships.
              </p>
              <p className="font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-[1.7] text-[rgba(249,246,240,0.7)]">
                Graduates leave prepared to lead agent-engineering teams at the
                world&apos;s most ambitious AI labs, launch agent-native startups, or
                pursue doctoral research at the frontier of autonomous systems.
              </p>
            </div>

            {/* Right — key details */}
            <div className="featured-animate">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Clock,
                    label: 'Duration',
                    value: '18',
                    suffix: ' months',
                  },
                  {
                    icon: Users,
                    label: 'Cohort Size',
                    value: '40',
                    suffix: ' students',
                  },
                  {
                    icon: BookOpen,
                    label: 'Format',
                    value: 'Residential',
                    suffix: '',
                  },
                  {
                    icon: Calendar,
                    label: 'Next Start',
                    value: 'September',
                    suffix: ' 2026',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[rgba(8,8,40,0.5)] border border-[rgba(245,176,65,0.1)] rounded-xl p-6 text-center transition-all duration-300 hover:border-[rgba(245,176,65,0.25)]"
                  >
                    <item.icon className="w-6 h-6 text-[#f5b041] mx-auto mb-3" />
                    <p className="font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-2">
                      {item.label}
                    </p>
                    <p className="font-['JetBrains_Mono'] text-[1.25rem] font-bold text-[#f5b041]">
                      {item.label === 'Next Start' || item.label === 'Format' ? (
                        <span className="text-[#f9f6f0]">
                          {item.value}
                          {item.suffix}
                        </span>
                      ) : (
                        <>
                          <AnimatedCounter value={item.value} />
                          {item.suffix}
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — CURRICULUM TIMELINE                               */}
      {/* ============================================================ */}
      <section ref={timelineRef} className="relative px-4 md:px-8 lg:px-12 py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
              Curriculum
            </p>
            <h2
              className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0]"
              style={{ letterSpacing: '-1.68px' }}
            >
              18-Month Journey
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[1px] bg-[rgba(245,176,65,0.15)]" />

            <div className="space-y-12">
              {terms.map((t, i) => (
                <div key={t.term} className="timeline-node relative flex gap-6 md:gap-8">
                  {/* Glowing node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#080828] border-2 border-[#f5b041] flex items-center justify-center shadow-[0_0_16px_rgba(245,176,65,0.3)] z-10 relative">
                      <span className="font-['JetBrains_Mono'] text-[0.625rem] md:text-[0.75rem] font-bold text-[#f5b041]">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <p className="font-['Space_Grotesk'] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[rgba(249,246,240,0.4)] mb-1">
                      {t.term}
                    </p>
                    <h3
                      className="font-['Cormorant_Garamond'] text-[1.5rem] md:text-[1.75rem] font-semibold text-[#f9f6f0] mb-3"
                      style={{ letterSpacing: '-0.5px' }}
                    >
                      {t.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {t.courses.map((c) => (
                        <span
                          key={c}
                          className="font-['Libre_Caslon_Text'] text-[0.8125rem] text-[rgba(249,246,240,0.5)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — CTA                                               */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-12 py-24"
      >
        <ParticleCanvas />

        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(8,8,40,0.3) 0%, rgba(8,8,40,0.85) 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-[700px]">
          <p className="cta-animate font-['Space_Grotesk'] text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#f5b041] mb-4">
            Your Journey Begins Here
          </p>
          <h2
            className="cta-animate font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-[#f9f6f0] mb-6"
            style={{ letterSpacing: '-1.68px' }}
          >
            Shape the Future of Agentic AI
          </h2>
          <p className="cta-animate font-['Libre_Caslon_Text'] text-[clamp(0.875rem,1.2vw,1.0625rem)] leading-[1.7] text-[rgba(249,246,240,0.5)] mb-10">
            Applications for the September 2026 cohort are now open. Join a
            community of exceptional engineers, researchers, and founders
            committed to building the next generation of autonomous intelligence.
          </p>
          <div className="cta-animate flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              className="group inline-flex items-center gap-2 font-['Space_Grotesk'] text-[0.875rem] font-medium uppercase tracking-[0.1em] text-[#080828] bg-[#f5b041] border-2 border-[#f5b041] px-8 py-4 rounded transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-[0_0_24px_rgba(245,176,65,0.4)]"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              className="group inline-flex items-center gap-2 font-['Space_Grotesk'] text-[0.875rem] font-medium uppercase tracking-[0.1em] text-[#f9f6f0] bg-transparent border-2 border-[rgba(245,176,65,0.3)] px-8 py-4 rounded transition-all duration-200 hover:border-[#f5b041] hover:text-[#f5b041]"
            >
              <Download className="w-4 h-4" />
              Download Syllabus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
