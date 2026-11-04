import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import ChapterNav, { type Chapter } from './components/ChapterNav';
import ClosingSection from './components/ClosingSection';
import CountdownTimer from './components/CountdownTimer';
import DressCode from './components/DressCode';
import EnvelopeReveal from './components/EnvelopeReveal';
import EventDetails from './components/EventDetails';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';
import Guestbook from './components/Guestbook';
import InvitationCard from './components/InvitationCard';
import MusicToggle from './components/MusicToggle';
import Ornament from './components/Ornament';
import Reveal from './components/Reveal';
import RSVPForm from './components/RSVPForm';
import SectionHeading from './components/SectionHeading';
import StoryTimeline from './components/StoryTimeline';
import ThemeOverview from './components/ThemeOverview';
import TravelNotes from './components/TravelNotes';
import WeddingParty from './components/WeddingParty';
import { weddingConfig } from './config/weddingConfig';

const CHAPTERS: Chapter[] = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'story', label: 'Our Story' },
  { id: 'countdown', label: 'Until the Day' },
  { id: 'celebration', label: 'Celebration' },
  { id: 'day', label: 'The Day' },
  { id: 'party', label: 'By Our Side' },
  { id: 'theme', label: 'The Theme' },
  { id: 'dress', label: 'Dress Code' },
  { id: 'travel', label: 'Travel' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'gallery', label: 'Postcards' },
  { id: 'rsvp', label: 'Reply' },
  { id: 'wishes', label: 'Wishes' },
  { id: 'questions', label: 'Questions' },
];

const SESSION_KEY = 'judy-renan-invitation-opened';

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleOpen = () => {
    setEnvelopeOpened(true);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-charcoal">
        <a
          href="#invitation"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:border focus:border-taupe focus:bg-charcoal focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-milk"
        >
          Skip to invitation
        </a>

        <AmbientBackground />

        <AnimatePresence mode="wait">
          {!envelopeOpened ? (
            <EnvelopeReveal key="prologue" onOpen={handleOpen} />
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <MusicToggle />
              <ChapterNav sections={CHAPTERS} />

              <main id="main">
                <InvitationCard />
                <StoryTimeline />

                <section
                  id="countdown"
                  className="relative overflow-hidden bg-charcoal py-24 text-milk sm:py-32"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-taupe/35 to-transparent" />
                  <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    <SectionHeading
                      eyebrow="Chapter II"
                      title="Until the Day"
                      intro="Every second brings us closer to the beginning."
                      align="center"
                      dark
                    />
                    <div className="mt-14">
                      <CountdownTimer
                        targetDate={weddingConfig.date}
                        timezone={weddingConfig.timezone}
                      />
                    </div>
                  </div>
                </section>

                <section id="celebration" className="relative overflow-hidden bg-oat py-24 text-charcoal sm:py-32">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-milk/30 blur-3xl" />
                    <Ornament className="absolute -right-16 top-10 h-72 w-72 text-mocha/[0.08]" />
                  </div>
                  <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
                    <Reveal>
                      <Ornament className="mx-auto h-12 w-12 text-taupe" />
                      <p className="eyebrow mt-6 text-mocha/60">With hearts full of joy</p>
                      <p className="mx-auto mt-6 max-w-3xl text-balance font-body text-2xl italic leading-relaxed text-mocha sm:text-3xl">
                        We invite you to witness the beginning of our new chapter together. Your presence
                        on our special day would mean the world to us.
                      </p>
                      <div className="mx-auto mt-8 h-px w-20 bg-taupe/50" />
                      <p className="mt-6 font-script text-5xl leading-none text-charcoal sm:text-6xl">
                        Judy &amp; Renan
                      </p>
                    </Reveal>
                  </div>
                </section>

                <EventDetails />
                <WeddingParty />
                <ThemeOverview />
                <DressCode />
                <TravelNotes />
                <Gifts />
                <Gallery />
                <RSVPForm />
                <Guestbook />
                <FAQ />
                <ClosingSection />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
