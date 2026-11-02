import { Plus } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FAQ() {
  return (
    <section id="questions" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -right-16 top-16 text-taupe/[0.07]">
        <Ornament className="h-72 w-72" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter IX"
          title="Before You Sail"
          intro="A few practical notes for the journey."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {weddingConfig.faq.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.05}>
                <details className="faq-item group border-b border-taupe/30 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-display text-xl leading-snug text-charcoal sm:text-2xl">
                      {item.question}
                    </span>
                    <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-taupe/40 text-mocha transition-transform duration-300">
                      <Plus size={15} strokeWidth={1.4} />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-mocha">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="paper relative border border-taupe/30 p-7 shadow-paper sm:p-8">
              <div className="absolute inset-4 border border-mocha/10" />
              <div className="relative">
                <p className="eyebrow text-mocha/55">Travel notes</p>
                <h3 className="mt-4 text-3xl leading-tight text-charcoal">Getting there</h3>
                <p className="mt-4 font-body text-lg leading-relaxed text-mocha">
                  Travel, parking, and accommodation notes will be added here once the venue is confirmed.
                </p>
                <div className="mt-7 border-t border-taupe/30 pt-5">
                  <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-mocha/45">
                    A note on the evening
                  </p>
                  <p className="mt-2 font-body text-base italic leading-relaxed text-mocha/75">
                    December evenings can turn cool once the sun sets. A light layer is always a good idea.
                  </p>
                </div>
                <div className="mt-7 flex items-center gap-3">
                  <Ornament className="h-9 w-9 text-taupe" />
                  <p className="font-body text-base italic text-mocha/70">
                    We will share more details as the day draws near.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
