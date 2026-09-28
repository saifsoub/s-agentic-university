import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountUp } from '../hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   HERO — Canvas 2D Particle / Neural Network Background
   ============================================================ */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const isPageVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    );
    observer.observe(canvas);
    const handleVis = () => { isPageVisibleRef.current = !document.hidden }
    document.addEventListener('visibilitychange', handleVis);

    let w = 0;
    let h = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((w * h) / 12000), 120);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const draw = () => {
      if (!isVisibleRef.current || !isPageVisibleRef.current) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Deep indigo base
      ctx.fillStyle = '#080828';
      ctx.fillRect(0, 0, w, h);

      // Draw connections
      const mouseX = mouseRef.current.x * w;
      const mouseY = mouseRef.current.y * h;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 176, 65, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse connections
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200) {
          const alpha = (1 - mDist / 200) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(245, 176, 65, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw and update particles
      for (const p of particles) {
        // Pulse
        p.pulse += p.pulseSpeed;
        const pulseFactor = 1 + Math.sin(p.pulse) * 0.2;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseFactor * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * pulseFactor * 2
        );
        gradient.addColorStop(0, `rgba(245, 176, 65, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(245, 176, 65, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 176, 65, ${p.alpha})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVis);
    };
  }, []);

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
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('[data-hero="h5"]', { y: 20, opacity: 0.3, duration: 0.6, ease: 'power2.out' })
        .from('[data-hero="h1"]', { y: 30, opacity: 0.3, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .from('[data-hero="body"]', { y: 20, opacity: 0.3, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('[data-hero="btn"]', { y: 20, opacity: 0.3, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from('[data-hero="link"]', { y: 15, opacity: 0.3, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    }, textRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowIndicator(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
    >
      <HeroCanvas />

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-20 pt-32 max-w-[600px]"
      >
        <h5
          data-hero="h5"
          className="font-sans font-medium text-[0.625rem] uppercase tracking-[0.14em] text-[#f5b041] mb-4"
        >
          AGENTIC UNIVERSITY &middot; EST. 2024
        </h5>
        <h1
          data-hero="h1"
          className="font-display text-[clamp(3rem,6vw,5rem)] text-[#f9f6f0] mb-6 text-shadow-readability leading-[1.0]"
        >
          Engineering the Autonomous Mind
        </h1>
        <p
          data-hero="body"
          className="font-serif text-base text-[rgba(249,246,240,0.5)] leading-[1.7] mb-8 max-w-[480px]"
        >
          Where centuries of academic rigor meet the frontier of autonomous intelligence.
          Join the architects of tomorrow's agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            data-hero="btn"
            to="/apply"
            className="inline-block bg-[#f5b041] text-[#080828] font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] px-8 py-4 border-2 border-[#f5b041] transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-gold-glow"
          >
            Begin Enrollment &rarr;
          </Link>
          <Link
            data-hero="link"
            to="/programs"
            className="group inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] text-[#f9f6f0] opacity-70 transition-all duration-300 hover:opacity-100"
          >
            <span className="relative">
              Explore Programs
              <span className="absolute left-0 bottom-[-2px] h-[1px] w-full bg-[#f9f6f0] origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700"
        style={{ opacity: showIndicator ? 1 : 0, pointerEvents: showIndicator ? 'auto' : 'none' }}
      >
        <span className="text-xs tracking-[0.14em] uppercase" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: 'rgba(249, 246, 240, 0.3)' }}>
          Scroll
        </span>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="rgba(249,246,240,0.3)" strokeWidth="1.5" style={{ animation: 'bounce-gentle 2s infinite ease-in-out' }}>
          <rect x="1" y="1" width="18" height="28" rx="9" />
          <circle cx="10" cy="10" r="2" fill="rgba(249,246,240,0.3)" style={{ animation: 'scroll-dot 2s infinite' }} />
        </svg>
        <span className="text-[10px] italic" style={{ fontFamily: "'Libre Caslon Text', serif", color: 'rgba(249, 246, 240, 0.2)' }}>
          Explore the Campus
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   PILLARS OF LEARNING SECTION
   ============================================================ */
const pillars = [
  {
    num: '01',
    title: 'Foundation',
    description:
      'Master the theoretical bedrock of autonomous systems. From first principles of reasoning to the mathematics of decision-making under uncertainty, our foundational curriculum ensures every graduate possesses rigorous analytical frameworks.',
  },
  {
    num: '02',
    title: 'Synthesis',
    description:
      'Bridge disparate disciplines into unified agent architectures. Learn to compose perception, reasoning, and action into coherent systems that exhibit emergent intelligence greater than the sum of their parts.',
  },
  {
    num: '03',
    title: 'Deployment',
    description:
      'Take agents from laboratory to production. Navigate the full lifecycle of real-world deployment: safety validation, continuous monitoring, human-agent collaboration, and responsible governance at scale.',
  },
];

function PillarsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-pillar]',
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-12 md:py-16"
      style={{ backgroundColor: 'var(--deep-indigo)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h6 className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-4">
          PILLARS OF LEARNING
        </h6>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f9f6f0] mb-16 max-w-[600px]">
          Three Pillars of Agentic Mastery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              data-pillar
              className="group relative p-8 border border-[rgba(245,176,65,0.1)] rounded-lg transition-all duration-300 hover:border-[rgba(245,176,65,0.3)] hover:bg-[rgba(18,18,90,0.3)]"
            >
              <span className="font-mono text-[4rem] font-bold text-[rgba(245,176,65,0.08)] leading-none absolute top-4 right-4">
                {pillar.num}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-[#f9f6f0] mb-4 relative z-10">
                {pillar.title}
              </h3>
              <p className="font-serif text-[0.9375rem] text-[rgba(249,246,240,0.5)] leading-[1.7] relative z-10">
                {pillar.description}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f5b041] transition-all duration-500 group-hover:w-full rounded-b-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROGRAMS PREVIEW SECTION
   ============================================================ */
const programs = [
  {
    title: 'Agent Architecture',
    description:
      'Design and implement autonomous agent frameworks from first principles. Explore cognitive architectures, perception-action loops, and meta-cognitive control structures.',
  },
  {
    title: 'Multi-Agent Systems',
    description:
      'Orchestrate fleets of collaborating agents. Study consensus mechanisms, emergent behavior, distributed decision-making, and swarm intelligence paradigms.',
  },
  {
    title: 'Reasoning & Planning',
    description:
      'From classical search to modern large-model reasoning. Master symbolic planning, heuristic search, temporal reasoning, and neuro-symbolic integration.',
  },
  {
    title: 'Tool Use & APIs',
    description:
      'Equip agents with the ability to sense and act upon external systems. Design robust tool interfaces, API orchestration, and feedback-driven adaptation loops.',
  },
  {
    title: 'Memory & State',
    description:
      'Build agents that learn from experience. Implement episodic and semantic memory, long-term state management, and knowledge consolidation mechanisms.',
  },
  {
    title: 'Safety & Alignment',
    description:
      'Ensure agents behave reliably and ethically. Study value alignment, interpretability, red-teaming, constitutional AI, and governance frameworks.',
  },
];

function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-program-card]',
        { y: 40, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-12 md:py-16"
      style={{ backgroundColor: '#0a0a1a' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h6 className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-4">
          CHAPTER 01 &mdash; CURRICULUM
        </h6>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f9f6f0] mb-6 max-w-[600px]">
          Where Disciplines Converge
        </h2>
        <p className="font-serif text-base text-[rgba(249,246,240,0.5)] leading-[1.7] mb-16 max-w-[560px]">
          Six specialized disciplines form the curriculum. Each program builds upon the others,
          creating a comprehensive foundation for autonomous systems engineering.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Link
              key={program.title}
              to="/programs"
              data-program-card
              className="group block p-6 md:p-8 bg-[rgba(18,18,90,0.4)] border border-[rgba(245,176,65,0.08)] rounded-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-glow hover:border-[rgba(245,176,65,0.25)]"
            >
              <h4 className="font-serif text-[1.25rem] text-[#f9f6f0] mb-3 group-hover:text-[#f5b041] transition-colors duration-300">
                {program.title}
              </h4>
              <p className="font-serif text-[0.875rem] text-[rgba(249,246,240,0.5)] leading-[1.7] mb-6">
                {program.description}
              </p>
              <span className="inline-flex items-center gap-2 font-sans font-medium text-[0.625rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.7)] transition-all duration-300 group-hover:text-[#f5b041]">
                Explore
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ECOSYSTEM SECTION — Stats with Animated Counters
   ============================================================ */
const stats = [
  { value: 500, suffix: '+', label: 'Research Papers Published' },
  { value: 50, suffix: '+', label: 'Distinguished Faculty Members' },
  { value: 12, suffix: '', label: 'Specialized Research Labs' },
  { value: 98, suffix: '%', label: 'Graduate Placement Rate' },
];

function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
    }> = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      const count = Math.min(Math.floor((w * h) / 8000), 200);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, w, h);

      const time = Date.now() * 0.001;

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.x) * 0.3 + 0.7;
        const alpha = star.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        // Gold-tinted stars
        const isGold = star.x % 1 > 0.85;
        if (isGold) {
          ctx.fillStyle = `rgba(245, 176, 65, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(249, 246, 240, ${alpha})`;
        }
        ctx.fill();
      }

      // Subtle nebula glows
      const gradient1 = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.3);
      gradient1.addColorStop(0, 'rgba(245, 176, 65, 0.03)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      const gradient2 = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.25);
      gradient2.addColorStop(0, 'rgba(230, 126, 34, 0.02)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

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
  );
}

function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-eco-text]',
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setInView(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const count1 = useCountUp(500, inView);
  const count2 = useCountUp(50, inView);
  const count3 = useCountUp(12, inView);
  const count4 = useCountUp(98, inView);
  const counts = [count1, count2, count3, count4];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 md:px-8 lg:px-12 py-12 md:py-16"
    >
      <EcosystemCanvas />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <h6
          data-eco-text
          className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-4"
        >
          CHAPTER 02 &mdash; ECOSYSTEM
        </h6>
        <h2
          data-eco-text
          className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f9f6f0] mb-6 max-w-[600px] text-shadow-readability"
        >
          A Living Network of Discovery
        </h2>
        <p
          data-eco-text
          className="font-serif text-base text-[rgba(249,246,240,0.5)] leading-[1.7] mb-16 max-w-[520px]"
        >
          Every graduate, every researcher, every breakthrough becomes a luminous node
          in our ever-expanding cosmos of agentic innovation.
        </p>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#f5b041] text-shadow-glow leading-none mb-2">
                {counts[i]}{stat.suffix}
              </div>
              <div className="font-sans text-[0.75rem] uppercase tracking-[0.1em] text-[rgba(249,246,240,0.5)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div data-eco-text className="mt-16">
          <Link
            to="/research"
            className="group inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] text-[#f9f6f0] opacity-70 transition-all duration-300 hover:opacity-100"
          >
            <span className="relative">
              View Research
              <span className="absolute left-0 bottom-[-2px] h-[1px] w-full bg-[#f9f6f0]" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS SECTION
   ============================================================ */
const testimonials = [
  {
    quote:
      'The University didn\'t just teach me to build agents. It taught me to think in systems, to reason about autonomy at a fundamental level.',
    name: 'Dr. Elena Vasquez',
    role: 'Lead Agent Architect, Meridian AI',
  },
  {
    quote:
      'I came from a traditional CS background. The curriculum here bridges the gap between theory and the bleeding edge of deployment.',
    name: 'James Okafor',
    role: 'Founder, SwarmLogic',
  },
  {
    quote:
      'The research environment is unlike anywhere else. You\'re surrounded by people who are genuinely pushing the boundary of what agents can do.',
    name: 'Dr. Yuki Tanaka',
    role: 'Principal Researcher, Agentic Lab',
  },
];

function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-testimonial]',
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-12 md:py-16"
      style={{ backgroundColor: 'var(--deep-indigo)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h6 className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-4">
          VOICES
        </h6>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f9f6f0] mb-16">
          From Those Who Shape the Future
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-testimonial
              className="relative p-8 bg-[rgba(18,18,90,0.4)] border border-[rgba(245,176,65,0.1)] rounded-lg backdrop-blur-sm"
            >
              {/* Large quote mark */}
              <span
                className="absolute top-4 left-4 font-display text-[4.5rem] leading-none text-[rgba(245,176,65,0.15)] select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="font-serif text-[1.0625rem] italic text-[#f9f6f0] leading-[1.7] mb-8 relative z-10">
                {t.quote}
              </p>

              <div className="relative z-10">
                <div className="font-sans font-medium text-sm text-[#f5b041]">
                  {t.name}
                </div>
                <div className="font-sans text-xs text-[rgba(249,246,240,0.5)]">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA SECTION
   ============================================================ */
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-cta]',
        { y: 20, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-16 md:py-24 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #12125a 0%, #080828 70%)',
      }}
    >
      {/* Subtle pulsing glow */}
      <div
        className="absolute inset-0 animate-gradient-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 176, 65, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[700px] mx-auto text-center">
        <h6
          data-cta
          className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[rgba(249,246,240,0.5)] mb-4"
        >
          APPLICATIONS OPEN
        </h6>
        <h2
          data-cta
          className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f9f6f0] mb-6 text-shadow-readability"
        >
          Join the Architects of Autonomy
        </h2>
        <p
          data-cta
          className="font-serif text-base text-[rgba(249,246,240,0.5)] leading-[1.7] mb-10"
        >
          The next cohort begins September 2025. Spaces are limited.
          The future is agentic &mdash; will you build it?
        </p>
        <div data-cta className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/apply"
            className="inline-block bg-[#f5b041] text-[#080828] font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] px-8 py-4 border-2 border-[#f5b041] transition-all duration-200 hover:bg-[#f9c34d] hover:shadow-gold-glow"
          >
            Apply Now &rarr;
          </Link>
          <Link
            to="/campus"
            className="group inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] text-[#f9f6f0] opacity-70 transition-all duration-300 hover:opacity-100"
          >
            <span className="relative">
              Schedule a Campus Tour
              <span className="absolute left-0 bottom-[-2px] h-[1px] w-full bg-[#f9f6f0]" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <ProgramsSection />
      <EcosystemSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
