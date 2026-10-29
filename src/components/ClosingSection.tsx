import { motion } from 'framer-motion'
import ShipAnimation from './ShipAnimation'

export default function ClosingSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <ShipAnimation count={3} />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6 text-charcoal tracking-wide leading-relaxed">
            We can't wait to celebrate with you
          </h2>
          <div className="w-16 h-px bg-taupe mx-auto mb-6"></div>
          <p className="font-script text-3xl md:text-4xl text-mocha">
            Judy & Renan
          </p>
        </motion.div>
      </div>
    </section>
  )
}
