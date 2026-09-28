import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Programs', path: '/programs' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Research', path: '/research' },
  { label: 'Campus', path: '/campus' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(8, 8, 40, 0.9)' : 'rgba(8, 8, 40, 0.6)',
          backdropFilter: 'blur(12px)',
          height: scrolled ? '72px' : '56px',
        }}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span
              className="font-sans font-bold text-[#f9f6f0] tracking-[0.1em] text-sm md:text-base"
            >
              S/AGENTIC
            </span>
            <span
              className="font-sans font-medium text-[rgba(249,246,240,0.5)] tracking-[0.14em] text-[0.6rem]"
            >
              UNIVERSITY
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] text-[#f9f6f0] transition-colors duration-300 hover:text-[#f5b041]"
              >
                {link.label}
                <span className="absolute left-0 bottom-[-4px] h-[1px] w-0 bg-[#f5b041] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[2px] bg-[#f9f6f0] transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[2px] bg-[#f9f6f0] transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[2px] bg-[#f9f6f0] transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500"
        style={{
          backgroundColor: 'rgba(8, 8, 40, 0.98)',
          backdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-display text-3xl text-[#f9f6f0] transition-colors duration-300 hover:text-[#f5b041]"
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s ease ${0.08 * i}s`,
            }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
