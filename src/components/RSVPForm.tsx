import { useState } from 'react'
import { motion } from 'framer-motion'

interface RSVPData {
  name: string
  attending: 'yes' | 'no' | ''
  guests: number
  message: string
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    attending: '',
    guests: 1,
    message: ''
  })
  const [errors, setErrors] = useState<Partial<RSVPData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<RSVPData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.attending) {
      newErrors.attending = 'Please confirm your attendance' as any
    }
    if (formData.attending === 'yes' && formData.guests < 1) {
      newErrors.guests = 1 as any
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }
    
    // Store in localStorage as requested
    const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]')
    existingRSVPs.push({
      ...formData,
      submittedAt: new Date().toISOString()
    })
    localStorage.setItem('wedding_rsvps', JSON.stringify(existingRSVPs))
    
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="border border-taupe/40 p-8 bg-milk"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
            }}
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-charcoal tracking-wide">
              THANK YOU
            </h2>
            <p className="text-mocha leading-relaxed">
              Your RSVP has been received. We look forward to celebrating with you!
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-oat/30">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-charcoal tracking-wide text-center">
            RSVP
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 border border-taupe/40 p-6 md:p-8 bg-milk" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
                }}>
            <div>
              <label htmlFor="name" className="block text-sm tracking-wide text-mocha mb-2 font-sans">
                FULL NAME *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-taupe/40 bg-transparent text-charcoal focus:outline-none focus:border-taupe"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-xs text-mocha mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm tracking-wide text-mocha mb-2 font-sans">
                WILL YOU BE ATTENDING? *
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value as 'yes' })}
                    className="text-taupe focus:ring-taupe"
                  />
                  <span className="text-charcoal">Yes, joyfully accepting</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value as 'no' })}
                    className="text-taupe focus:ring-taupe"
                  />
                  <span className="text-charcoal">Regretfully declining</span>
                </label>
              </div>
              {errors.attending && <p className="text-xs text-mocha mt-1">{errors.attending}</p>}
            </div>

            {formData.attending === 'yes' && (
              <div>
                <label htmlFor="guests" className="block text-sm tracking-wide text-mocha mb-2 font-sans">
                  NUMBER OF GUESTS
                </label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-taupe/40 bg-transparent text-charcoal focus:outline-none focus:border-taupe"
                />
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm tracking-wide text-mocha mb-2 font-sans">
                MESSAGE (OPTIONAL)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-taupe/40 bg-transparent text-charcoal focus:outline-none focus:border-taupe resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 border border-taupe text-charcoal font-sans tracking-widest text-sm hover:bg-oat transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-taupe"
            >
              SEND RSVP
            </button>
          </form>
          
          <p className="text-xs text-mocha mt-4 text-center italic">
            RSVP data is stored locally. For production use with Supabase, configure environment variables.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
