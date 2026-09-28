import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    duration = 0.8,
    delay = 0,
    stagger = 0.15,
    ease = 'power2.out',
    start = 'top 80%',
  } = options;

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const children = ref.current!.querySelectorAll('[data-reveal]');
      const targets = children.length > 0 ? children : ref.current;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [y, duration, delay, stagger, ease, start]);

  return ref;
}
