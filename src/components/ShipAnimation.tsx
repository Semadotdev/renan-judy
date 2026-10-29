import { motion } from 'framer-motion'

interface ShipAnimationProps {
  count?: number
  className?: string
}

const ShipSVG = () => (
  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <path d="M5 15 L35 15 L30 10 L10 10 Z" fill="none" stroke="#685D54" strokeWidth="1"/>
    <path d="M10 10 L12 5 L15 10 Z" fill="#A39382" opacity="0.7"/>
    <line x1="13" y1="5" x2="13" y2="10" stroke="#685D54" strokeWidth="0.5"/>
    <ellipse cx="20" cy="16" rx="12" ry="2" fill="none" stroke="#685D54" strokeWidth="0.5" opacity="0.5"/>
  </svg>
)

export default function ShipAnimation({ count = 3, className = "" }: ShipAnimationProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: -100, 
            y: 20 + (i * 40),
            opacity: 0 
          }}
          animate={{ 
            x: '110vw',
            y: [20 + (i * 40), 15 + (i * 40), 25 + (i * 40), 20 + (i * 40)],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{ 
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 8,
            ease: "linear",
          }}
        >
          <ShipSVG />
        </motion.div>
      ))}
    </div>
  )
}
