import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingConfig';
import { formatWeddingDate } from '../lib/date';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function StoryTimeline() {
  const chapters = weddingConfig.story;

  return (
    <section id="story" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -right-20 top-10 text-taupe/[0.08]">
        <Ornament className="h-72 w-72 sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter I"
          title="Our Story"
          intro="Before the vows, there is the voyage that brought us here."
        />

        {chapters.length > 0 ? (
          <div className="relative mt-16 max-w-4xl">
            <motion.div
              className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-taupe/40 md:left-[calc(9rem+7px)]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="space-y-12 md:space-y-16">
              {chapters.map((chapter, index) => (
                <Reveal key={`${chapter.year}-${chapter.title}`} delay={index * 0.08}>
                  <div className="grid gap-4 md:grid-cols-[9rem_1fr] md:gap-10">
                    <div className="pl-9 md:pl-0 md:text-right">
                      <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-mocha/55">
                        {chapter.year}
                      </p>
                    </div>
                    <div className="relative pl-9">
                      <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border border-taupe bg-milk shadow-[0_0_0_5px_rgba(251,247,244,0.9)]" />
                      <h3 className="text-3xl leading-tight text-charcoal sm:text-4xl">
                        {chapter.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-mocha">
                        {chapter.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <Reveal className="relative mt-16" delay={0.1}>
            <div className="paper relative mx-auto max-w-4xl border border-taupe/30 px-7 py-14 text-center shadow-paper sm:px-14 sm:py-20">
              <div className="absolute inset-4 border border-mocha/10" />
              <div className="relative">
                <p className="font-display text-7xl leading-none text-taupe/35">&ldquo;</p>
                <p className="mx-auto -mt-6 max-w-2xl text-balance font-body text-2xl italic leading-relaxed text-mocha sm:text-3xl">
                  Every love story is a voyage. Theirs is still being written, one chapter at a time.
                </p>
                <div className="mx-auto my-8 h-px w-20 bg-taupe/50" />
                <p className="eyebrow text-mocha/60">The next chapter begins</p>
                <p className="mt-3 font-display text-2xl tracking-tight text-charcoal sm:text-3xl">
                  {formatWeddingDate(weddingConfig.date)}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
