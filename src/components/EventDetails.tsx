import { motion } from 'framer-motion'
import { weddingConfig } from '../config/weddingConfig'

export default function EventDetails() {
  const hasCeremony = weddingConfig.eventDetails.ceremony.venue || weddingConfig.eventDetails.ceremony.time
  const hasReception = weddingConfig.eventDetails.reception.venue || weddingConfig.eventDetails.reception.time

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 
          className="font-serif text-3xl md:text-4xl mb-12 text-charcoal tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          EVENT DETAILS
        </motion.h2>
        
        {(hasCeremony || hasReception) ? (
          <div className="space-y-8">
            {hasCeremony && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="font-serif text-xl md:text-2xl mb-4 text-charcoal tracking-wide">CEREMONY</h3>
                {weddingConfig.eventDetails.ceremony.time && (
                  <p className="text-mocha mb-2">{weddingConfig.eventDetails.ceremony.time}</p>
                )}
                {weddingConfig.eventDetails.ceremony.venue && (
                  <p className="text-mocha leading-relaxed">{weddingConfig.eventDetails.ceremony.venue}</p>
                )}
              </motion.div>
            )}
            
            {hasReception && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-serif text-xl md:text-2xl mb-4 text-charcoal tracking-wide">RECEPTION</h3>
                {weddingConfig.eventDetails.reception.time && (
                  <p className="text-mocha mb-2">{weddingConfig.eventDetails.reception.time}</p>
                )}
                {weddingConfig.eventDetails.reception.venue && (
                  <p className="text-mocha leading-relaxed">{weddingConfig.eventDetails.reception.venue}</p>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <motion.p 
            className="text-mocha font-serif italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Details to follow
          </motion.p>
        )}
      </div>
    </section>
  )
}
