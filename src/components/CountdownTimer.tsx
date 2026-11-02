import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  timezone: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function DigitRoller({ value, pad, reduceMotion }: { value: number; pad: number; reduceMotion: boolean }) {
  const digits = String(value).padStart(pad, '0').split('');

  return (
    <div className="flex justify-center tabular-nums">
      {digits.map((digit, index) => (
        <span
          key={index}
          className="relative inline-flex h-[1.06em] w-[0.62em] items-center justify-center overflow-hidden"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={digit}
              className="absolute inset-0 flex items-center justify-center"
              initial={reduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: '-105%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </div>
  );
}

export default function CountdownTimer({ targetDate, timezone }: CountdownTimerProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(`${targetDate}T00:00:00+08:00`);
      const difference = weddingDate.getTime() - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = window.setInterval(calculateTimeLeft, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <motion.div
        className="mx-auto max-w-3xl border border-taupe/25 px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="font-script text-5xl text-milk">The celebration has begun</p>
        <p className="mt-4 font-body text-xl italic text-oat/65">Thank you for being part of our story.</p>
      </motion.div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days, pad: 3 },
    { label: 'Hours', value: timeLeft.hours, pad: 2 },
    { label: 'Minutes', value: timeLeft.minutes, pad: 2 },
    { label: 'Seconds', value: timeLeft.seconds, pad: 2 },
  ];

  return (
    <div
      className="mx-auto max-w-5xl"
      aria-label={`Countdown to the wedding date in ${timezone}`}
      aria-live="off"
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-taupe/25 bg-taupe/25 sm:grid-cols-4">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="relative bg-charcoal px-4 py-8 text-center sm:px-6 sm:py-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.7 }}
          >
            <div className="font-display text-[clamp(2.9rem,7.5vw,5.6rem)] leading-none text-milk">
              <DigitRoller value={unit.value} pad={unit.pad} reduceMotion={reduceMotion} />
            </div>
            <p className="mt-4 font-sans text-[0.58rem] uppercase tracking-[0.3em] text-oat/45">
              {unit.label}
            </p>
            {unit.label === 'Seconds' && (
              <motion.span
                className="absolute right-4 top-4 h-1 w-1 rounded-full bg-taupe"
                animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-center font-sans text-[0.56rem] uppercase tracking-[0.25em] text-oat/35">
        {timezone.split('/').pop()?.replace(/_/g, ' ') ?? timezone} time
      </p>
    </div>
  );
}
