import { motion } from 'framer-motion'
import { weddingConfig } from '../config/weddingConfig'

export default function DressCode() {
  return (
    <section className="py-16 px-4 bg-oat/30">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 
          className="font-serif text-3xl md:text-4xl mb-8 text-charcoal tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          DRESS CODE
        </motion.h2>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {weddingConfig.dressCode.colors.map((color, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 border border-taupe/60 shadow-md"
              style={{ backgroundColor: color }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              title={`Color ${index + 1}`}
            />
          ))}
        </motion.div>
        
        {weddingConfig.dressCode.instructions ? (
          <motion.p 
            className="text-mocha leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {weddingConfig.dressCode.instructions}
          </motion.p>
        ) : (
          <motion.p 
            className="text-mocha font-serif italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Dress code details to be announced
          </motion.p>
        )}
      </div>
    </section>
  )
}
