import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, CalendarDays, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  formatWeddingDate,
  formatWeddingDay,
  getFirstName,
  getWeddingDateParts,
} from '../lib/date';
import ShipAnimation from './ShipAnimation';

const ease = [0.22, 1, 0.36, 1] as const;

export default function InvitationCard() {
  const reduceMotion = useReducedMotion();
  const { couple, date, eventDetails } = weddingConfig;
  const dateParts = getWeddingDateParts(date);
  const ceremony = eventDetails.ceremony;
  const venueLabel = ceremony.venue ?? 'Venue to be announced';
  const venueNote = ceremony.address ?? 'Location details to follow';
  const timeLabel = ceremony.time ?? 'Time to be announced';

  return (
    <section
      id="invitation"
      className="relative min-h-[100svh] overflow-hidden bg-transparent text-milk"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-oat/[0.07] blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute right-[8%] top-[14%] hidden h-36 w-36 rounded-full border border-milk/10 bg-[radial-gradient(circle_at_35%_30%,#FBF7F4_0%,#E5DED2_28%,#A39382_68%,#685D54_100%)] opacity-40 shadow-glow sm:block lg:h-48 lg:w-48" />
        <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-milk/15 to-transparent" />
        <div className="absolute inset-x-0 top-[62%] h-36 bg-gradient-to-b from-milk/[0.04] to-transparent blur-sm" />
        <ShipAnimation count={2} className="text-milk/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-24 sm:px-8 lg:px-12 lg:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.78fr] lg:gap-16">
          <div>
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <span className="h-px w-10 bg-taupe" />
              <p className="eyebrow text-taupe">
                {formatWeddingDate(date)} · {formatWeddingDay(date)}
              </p>
            </motion.div>

            <motion.div
              className="mt-7"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.35, ease }}
            >
              <h1 className="font-script text-[clamp(4.6rem,14vw,9.5rem)] leading-[1.15] tracking-[-0.02em] text-milk">
                {getFirstName(couple.person1)}
              </h1>
              <div className="my-1 flex items-center gap-4 pl-2 sm:pl-5">
                <span className="h-px w-16 bg-taupe/50 sm:w-24" />
                <span className="font-display text-3xl text-taupe">&amp;</span>
                <span className="h-px w-16 bg-taupe/50 sm:w-24" />
              </div>
              <h1 className="font-script text-[clamp(4.6rem,14vw,9.5rem)] leading-[1.15] tracking-[-0.02em] text-milk sm:pl-16">
                {getFirstName(couple.person2)}
              </h1>
            </motion.div>

            <motion.p
              className="mt-8 max-w-md font-body text-xl leading-relaxed text-oat/75 sm:text-2xl"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease }}
            >
              A warm, modern celebration of the next chapter we get to write together. Join us as we
              begin our forever.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease }}
            >
              <a href="#story" className="cinematic-link border-taupe/60 text-milk hover:bg-milk/5">
                Enter the story
                <ArrowDown size={14} strokeWidth={1.5} />
              </a>
              <a
                href="#rsvp"
                className="font-sans text-[0.64rem] uppercase tracking-[0.22em] text-oat/60 underline decoration-taupe/50 underline-offset-8 transition-colors hover:text-milk"
              >
                Reply to the invitation
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.3, delay: 0.75, ease }}
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="paper relative border border-taupe/40 px-7 py-9 shadow-paper sm:px-9 sm:py-10 lg:rotate-[1.4deg]"
            >
              <div className="absolute inset-4 border border-mocha/10" />
              <div className="relative text-center">
                <p className="eyebrow text-mocha/60">Together with their families</p>
                <h2 className="mt-5 font-script text-4xl leading-tight text-charcoal sm:text-5xl">
                  {couple.person1}
                  <span className="mx-2 font-display text-2xl text-mocha/60">&amp;</span>
                  {couple.person2}
                </h2>
                <div className="mx-auto mt-6 h-px w-20 bg-taupe/50" />

                <div className="mt-7 flex items-center justify-center gap-4">
                  <div className="text-right">
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.28em] text-mocha/60">
                      {formatWeddingDay(date)}
                    </p>
                    <p className="mt-2 font-body text-lg italic text-mocha">Save the date</p>
                  </div>
                  <div className="h-16 w-px bg-taupe/40" />
                  <div className="text-left">
                    <p className="font-display text-6xl leading-none text-charcoal">
                      {dateParts.day}
                    </p>
                    <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-[0.28em] text-mocha/60">
                      December 20{dateParts.year}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3 border-t border-taupe/30 pt-6 text-left">
                  <div className="flex items-start gap-3 text-mocha">
                    <MapPin size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-taupe" />
                    <p className="font-body text-base leading-snug">
                      {venueLabel}
                      <span className="block font-sans text-[0.58rem] uppercase tracking-[0.18em] text-mocha/50">
                        {venueNote}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-mocha">
                    <CalendarDays size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-taupe" />
                    <p className="font-body text-base leading-snug">
                      {formatWeddingDate(date)}
                      <span className="block font-sans text-[0.58rem] uppercase tracking-[0.18em] text-mocha/50">
                        {timeLabel}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mx-auto mt-7 flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#C0AB94_0%,#A39382_46%,#776858_100%)] shadow-md">
                  <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                    <path d="M9 19 H23 L20 15 H12 L9 19 Z" stroke="#3D352E" strokeWidth="0.9" fill="none" />
                    <path d="M14 15 L16 9 L18 15 Z" fill="#3D352E" opacity="0.7" />
                    <line x1="16" y1="9" x2="16" y2="15" stroke="#3D352E" strokeWidth="0.6" />
                  </svg>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-taupe/20" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#story"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-milk/45 transition-colors hover:text-milk sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Scroll to our story"
      >
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.3} />
        </motion.span>
      </motion.a>
    </section>
  );
}
