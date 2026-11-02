import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { formatWeddingDate } from '../lib/date';
import Ornament from './Ornament';
import Reveal from './Reveal';
import ShipAnimation from './ShipAnimation';

export default function ClosingSection() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden py-24 text-milk">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal via-charcoal/75 to-transparent" />
        <div className="absolute left-1/2 top-[62%] h-56 w-56 -translate-x-1/2 rounded-full bg-oat/[0.06] blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-milk/15 to-transparent" />
        <ShipAnimation count={3} className="text-milk/25" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <Ornament className="mx-auto h-14 w-14 text-taupe" />
          <p className="eyebrow mt-7 text-taupe">Until we meet again</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-[2.8rem] leading-[0.98] tracking-[-0.03em] text-milk sm:text-6xl lg:text-7xl">
            We cannot wait to celebrate with you.
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-taupe/50" />
          <p className="mt-6 font-script text-5xl leading-none text-oat sm:text-7xl">
            Judy &amp; Renan
          </p>
          <p className="mt-6 font-sans text-[0.62rem] uppercase tracking-[0.32em] text-oat/45">
            {formatWeddingDate(weddingConfig.date)}
          </p>
          <p className="mt-2 font-body text-lg italic text-oat/45">{weddingConfig.hashtag}</p>

          <motion.a
            href="#invitation"
            className="mt-10 inline-flex items-center gap-3 font-sans text-[0.58rem] uppercase tracking-[0.22em] text-milk/45 transition-colors hover:text-milk"
            whileHover={{ y: -3 }}
          >
            Return to the beginning
            <ArrowUp size={14} strokeWidth={1.4} />
          </motion.a>
        </Reveal>

        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-milk/10 pt-6 font-sans text-[0.52rem] uppercase tracking-[0.18em] text-milk/25 sm:flex-row">
          <p>Judy &amp; Renan · A moonlit passage</p>
          <p>Made with love</p>
        </div>
      </div>
    </section>
  );
}
