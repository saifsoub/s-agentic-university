import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-6"
      style={{ backgroundColor: '#080828' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-[600px]"
      >
        {/* 404 */}
        <h1
          className="font-display leading-none mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(6rem, 15vw, 12rem)',
            fontWeight: 600,
            color: '#f9f6f0',
            letterSpacing: '-0.02em',
          }}
        >
          4<span style={{ color: '#f5b041' }}>0</span>4
        </h1>

        {/* Page Not Found */}
        <h2
          className="mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: '#f9f6f0',
            letterSpacing: '-0.5px',
          }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="mb-10"
          style={{
            fontFamily: "'Libre Caslon Text', 'Times New Roman', serif",
            fontSize: '1rem',
            color: 'rgba(249, 246, 240, 0.5)',
            lineHeight: 1.7,
          }}
        >
          The page you're looking for doesn't exist.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-block font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] px-8 py-4 border-2 transition-all duration-200 hover:shadow-gold-glow"
            style={{
              backgroundColor: '#f5b041',
              color: '#080828',
              borderColor: '#f5b041',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9c34d'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5b041'
            }}
          >
            Return to home
          </Link>

          <Link
            to="/programs"
            className="group inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-100"
            style={{
              color: '#f9f6f0',
              opacity: 0.7,
            }}
          >
            <span className="relative">
              Explore Programs
              <span className="absolute left-0 bottom-[-2px] h-[1px] w-full bg-[#f9f6f0]" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
