import { useState } from 'react'
import EnvelopeReveal from './components/EnvelopeReveal'
import InvitationCard from './components/InvitationCard'
import CountdownTimer from './components/CountdownTimer'
import EventDetails from './components/EventDetails'
import DressCode from './components/DressCode'
import RSVPForm from './components/RSVPForm'
import MusicToggle from './components/MusicToggle'
import ClosingSection from './components/ClosingSection'
import { weddingConfig } from './config/weddingConfig'

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  return (
    <div className="min-h-screen bg-milk">
      {!envelopeOpened ? (
        <EnvelopeReveal onOpen={() => setEnvelopeOpened(true)} />
      ) : (
        <main className="relative">
          <MusicToggle />
          <section className="min-h-screen flex items-center justify-center px-4 py-16">
            <InvitationCard />
          </section>
          
          <section className="py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-8 text-charcoal tracking-wide">
                COUNTDOWN
              </h2>
              <CountdownTimer targetDate={weddingConfig.date} timezone={weddingConfig.timezone} />
            </div>
          </section>

          <section className="py-16 px-4 bg-oat/30">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-charcoal tracking-wide">
                OUR CELEBRATION
              </h2>
              <p className="text-mocha leading-relaxed text-lg">
                With hearts full of joy, we invite you to witness and celebrate the beginning of our new chapter together.
                Your presence on our special day would mean the world to us.
              </p>
            </div>
          </section>

          <EventDetails />
          <DressCode />
          <RSVPForm />
          <ClosingSection />
        </main>
      )}
    </div>
  )
}

export default App
