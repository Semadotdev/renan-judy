import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { formatWeddingDate, getFirstName } from '../lib/date';
import { weddingConfig } from '../config/weddingConfig';

interface EnvelopeRevealProps {
  onOpen: () => void;
}

const MOTES = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37 + 9) % 100}%`,
  top: `${(index * 53 + 12) % 100}%`,
  delay: (index % 6) * 0.7,
  duration: 5 + (index % 5),
}));

export default function EnvelopeReveal({ onOpen }: EnvelopeRevealProps) {
  const [isOpening, setIsOpening] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const couple = weddingConfig.couple;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;

    if (reduceMotion) {
      onOpen();
      return;
    }

    setIsOpening(true);
    timeoutRef.current = window.setTimeout(onOpen, 3400);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-charcoal"
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.9, delay: isOpening ? 2.5 : 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, rgba(229, 222, 210, 0.18), transparent 22%), radial-gradient(circle at 74% 16%, rgba(163, 147, 130, 0.12), transparent 28%), linear-gradient(145deg, #232323 0%, #171615 62%, #232323 100%)',
        }}
      />

      <div className="absolute inset-0" aria-hidden="true">
        {MOTES.map((mote, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-milk/35"
            style={{ left: mote.left, top: mote.top }}
            animate={{ y: [0, -22, 0], opacity: [0.1, 0.55, 0.1] }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 z-20 bg-black"
        animate={{ height: isOpening ? '0svh' : '8svh' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 bg-black"
        animate={{ height: isOpening ? '0svh' : '8svh' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <button
        type="button"
        onClick={onOpen}
        className="absolute right-5 top-6 z-30 font-sans text-[0.58rem] uppercase tracking-[0.24em] text-milk/45 transition-colors hover:text-milk sm:right-8 sm:top-8"
      >
        Skip intro
      </button>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 pb-14 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="eyebrow text-taupe">The wedding of</p>
          <p className="mt-4 font-script text-4xl text-milk sm:text-5xl">
            Judy &amp; Renan
          </p>
          <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-oat/55">
            {formatWeddingDate(weddingConfig.date)}
          </p>
        </motion.div>

        <motion.div
          className="perspective-1000 relative mt-10 w-[min(84vw,29rem)] cursor-pointer sm:mt-12"
          initial={{ opacity: 0, y: 34, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Open the wedding invitation envelope"
        >
          <motion.div
            className="relative aspect-[1.56] w-full transform-style-3d"
            animate={
              isOpening
                ? { rotateX: -7, rotateZ: -1.2, y: -8, scale: 1.02 }
                : { rotateX: 0, rotateZ: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="absolute inset-0 bg-oat shadow-cinematic">
              <div className="absolute inset-0 bg-gradient-to-br from-milk/20 via-transparent to-mocha/20" />
              <div className="absolute inset-4 border border-mocha/15" />
            </div>

            <motion.div
              className="paper absolute inset-x-[5%] bottom-[11%] top-[12%] z-10 flex items-center justify-center border border-taupe/30 shadow-paper"
              animate={isOpening ? { y: -150, scale: 1.015 } : { y: 0, scale: 1 }}
              transition={{ duration: 1.25, delay: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="px-7 text-center">
                <p className="font-sans text-[0.52rem] uppercase tracking-[0.34em] text-mocha/65">
                  Together with their families
                </p>
                <p className="mt-4 font-script text-4xl leading-none text-charcoal sm:text-5xl">
                  {getFirstName(couple.person1)}
                  <span className="mx-2 font-display text-2xl text-mocha/60">&amp;</span>
                  {getFirstName(couple.person2)}
                </p>
                <div className="mx-auto mt-4 h-px w-16 bg-taupe/50" />
                <p className="mt-3 font-sans text-[0.54rem] uppercase tracking-[0.3em] text-mocha/70">
                  Save the date
                </p>
              </div>
            </motion.div>

            <div
              className="absolute inset-0 z-20 bg-oat"
              style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
            >
              <div className="absolute inset-y-0 left-0 w-[54%] bg-gradient-to-r from-mocha/10 to-transparent" />
            </div>
            <div
              className="absolute inset-0 z-20 bg-oat"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            >
              <div className="absolute inset-y-0 right-0 w-[54%] bg-gradient-to-l from-mocha/10 to-transparent" />
            </div>
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-[42%] bg-oat"
              style={{ clipPath: 'polygon(0 100%, 50% 24%, 100% 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-mocha/15 to-transparent" />
            </div>

            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-1/2 origin-top"
              style={{
                background: 'linear-gradient(to bottom, #E5DED2 0%, #D9CEBF 100%)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                boxShadow: 'inset 0 2px 0 rgba(251, 247, 244, 0.3)',
              }}
              animate={isOpening ? { rotateX: -178 } : { rotateX: 0 }}
              transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            />

            <motion.div
              className="absolute left-1/2 top-[49%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-20 sm:w-20"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, #C0AB94 0%, #A39382 46%, #776858 100%)',
                boxShadow:
                  '0 10px 28px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(251, 247, 244, 0.35), inset 0 -3px 8px rgba(35, 35, 35, 0.28)',
              }}
              animate={
                isOpening
                  ? { scale: 0, opacity: 0, rotate: 18 }
                  : { scale: 1, opacity: 1, rotate: 0 }
              }
              transition={{ duration: 0.45, ease: 'easeIn' }}
            >
              <svg viewBox="0 0 64 64" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true">
                <circle cx="32" cy="32" r="19" fill="none" stroke="#3D352E" strokeWidth="0.8" opacity="0.65" />
                <path d="M22 38 H42 L38 33 H26 L22 38 Z" fill="none" stroke="#3D352E" strokeWidth="1" />
                <path d="M30 33 L33 25 L36 33 Z" fill="#3D352E" opacity="0.75" />
                <line x1="33" y1="25" x2="33" y2="33" stroke="#3D352E" strokeWidth="0.7" />
                <path d="M23 42 Q27.5 39 32 42 T41 42" fill="none" stroke="#3D352E" strokeWidth="0.7" opacity="0.8" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          <button
            type="button"
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            className="cinematic-link border-taupe/60 text-milk hover:bg-milk/5"
          >
            Open the invitation
          </button>
          <p className="mt-4 font-body text-sm italic text-oat/45">
            A moonlit passage into forever
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 grain opacity-[0.18] mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
    </motion.div>
  );
}
