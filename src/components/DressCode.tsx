import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const COLOR_NAMES = ['Oat', 'Taupe', 'Mocha', 'Milk', 'Charcoal'];

export default function DressCode() {
  const { dressCode } = weddingConfig;

  return (
    <section id="dress" className="night-panel relative overflow-hidden py-24 text-milk sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-taupe/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow="Chapter VI"
            title="Dress Code"
            intro={dressCode.title}
            dark
          />

          <Reveal delay={0.1}>
            <div className="border-t border-taupe/25 pt-7">
              <p className="eyebrow text-taupe">Comfortable elegance</p>
              <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-oat/65">
                {dressCode.instructions}
              </p>
              <p className="mt-4 max-w-xl font-body text-base italic leading-relaxed text-oat/50">
                {dressCode.note}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {dressCode.colors.map((color, index) => (
            <Reveal key={color} delay={index * 0.07}>
              <motion.div
                className="group relative overflow-hidden border border-milk/15"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/65 to-transparent p-4">
                  <p className="font-sans text-[0.56rem] uppercase tracking-[0.24em] text-milk/80">
                    {COLOR_NAMES[index] ?? `Tone ${index + 1}`}
                  </p>
                  <p className="mt-1 font-sans text-[0.56rem] uppercase tracking-[0.16em] text-milk/45">
                    {color}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full border border-milk/15 p-6">
              <p className="eyebrow text-taupe">Ninongs &amp; Ninangs</p>
              <p className="mt-3 font-body text-base leading-relaxed text-oat/70">
                {dressCode.formal}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full border border-milk/15 p-6">
              <p className="eyebrow text-taupe">Dear guests</p>
              <p className="mt-3 font-body text-base leading-relaxed text-oat/70">
                {dressCode.guests}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-4 border-t border-taupe/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-taupe">
              {dressCode.palette}
            </p>
            <p className="max-w-2xl font-body text-lg italic leading-relaxed text-oat/55">
              {dressCode.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
