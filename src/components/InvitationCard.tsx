import { motion } from 'framer-motion'
import ShipAnimation from './ShipAnimation'

export default function InvitationCard() {
  return (
    <motion.div 
      className="relative max-w-lg w-full mx-auto bg-milk border border-taupe/40 p-8 md:p-12 shadow-lg"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
        boxShadow: '0 10px 40px rgba(104, 93, 84, 0.15)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <ShipAnimation count={2} className="opacity-40" />
      
      <div className="text-center space-y-6 relative z-10">
        <motion.p 
          className="text-xs tracking-[0.3em] text-mocha font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>
        
        <motion.h1 
          className="font-script text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Judy Castillo
        </motion.h1>
        
        <motion.p 
          className="font-serif text-3xl text-mocha"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          &
        </motion.p>
        
        <motion.h1 
          className="font-script text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Renan Tipactipac
        </motion.h1>
        
        <motion.p 
          className="text-xs tracking-[0.2em] text-mocha font-sans leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          JOYFULLY INVITE YOU TO CELEBRATE THEIR WEDDING
        </motion.p>
        
        <motion.div 
          className="py-4 border-t border-b border-taupe/30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <p className="font-serif text-2xl md:text-3xl tracking-wider text-charcoal">
            DECEMBER 28, 2026
          </p>
        </motion.div>
        
        <motion.p 
          className="font-serif text-lg text-mocha italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Save the date. A beautiful beginning awaits.
        </motion.p>
      </div>
    </motion.div>
  )
}
