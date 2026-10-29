import { useState } from 'react'
import { motion } from 'framer-motion'
import ShipAnimation from './ShipAnimation'

interface EnvelopeRevealProps {
  onOpen: () => void
}

export default function EnvelopeReveal({ onOpen }: EnvelopeRevealProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 2500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-milk flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.8, delay: isOpening ? 1.8 : 0 }}
    >
      <ShipAnimation count={4} />
      
      <div className="text-center mb-8 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.p 
          className="text-mocha font-serif text-lg md:text-xl mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A special invitation awaits you.
        </motion.p>
        <motion.button
          className="px-8 py-3 border border-taupe text-charcoal font-sans tracking-widest text-sm hover:bg-oat transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-taupe"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Open your invitation"
        >
          OPEN YOUR INVITATION
        </motion.button>
      </div>

      <motion.div 
        className="relative perspective-1000 cursor-pointer"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Open wedding invitation envelope"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="w-80 h-52 md:w-96 md:h-64 relative transform-style-3d"
          animate={isOpening ? { rotateY: -10 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Envelope back */}
          <div className="absolute inset-0 bg-oat shadow-2xl" 
               style={{
                 boxShadow: '0 20px 60px rgba(104, 93, 84, 0.3)',
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
               }}>
          </div>
          
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 origin-top"
            style={{
              background: 'linear-gradient(to bottom, #E5DED2 0%, #DDD0C1 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              boxShadow: 'inset 0 2px 4px rgba(163, 147, 130, 0.2)',
            }}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          
          {/* Wax seal */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full z-10"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #B8A089 0%, #A39382 50%, #8B7B6B 100%)',
              boxShadow: '0 4px 8px rgba(104, 93, 84, 0.4), inset 0 2px 4px rgba(251, 247, 244, 0.3)',
            }}
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <svg viewBox="0 0 40 40" className="w-full h-full p-2">
              <path d="M20 10 L25 18 L15 18 Z" fill="none" stroke="#685D54" strokeWidth="1"/>
              <circle cx="20" cy="22" r="3" fill="none" stroke="#685D54" strokeWidth="1"/>
              <line x1="20" y1="10" x2="20" y2="18" stroke="#685D54" strokeWidth="0.5"/>
            </svg>
          </motion.div>
          
          {/* Invitation card sliding out */}
          <motion.div
            className="absolute inset-x-4 bottom-4 h-44 md:h-56 bg-milk border border-taupe/30 flex items-center justify-center"
            style={{
              boxShadow: '0 4px 12px rgba(104, 93, 84, 0.2)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
            }}
            initial={{ y: 0 }}
            animate={isOpening ? { y: -80 } : { y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="text-center p-4">
              <p className="font-serif text-xs tracking-widest text-mocha mb-1">JUDY & RENAN</p>
              <p className="font-serif text-xs text-mocha">DECEMBER 28, 2026</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
