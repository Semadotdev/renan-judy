import { Gift } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';

export default function Gifts() {
  const { gifts } = weddingConfig;

  return (
    <section id="gifts" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -right-20 top-10 text-taupe/[0.07]">
        <Ornament className="h-72 w-72 sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="paper relative border border-taupe/30 px-7 py-14 text-center shadow-paper sm:px-14 sm:py-16">
            <div className="absolute inset-4 border border-mocha/10" />
            <div className="relative">
              <Gift className="mx-auto h-10 w-10 text-taupe" strokeWidth={1.2} />
              <p className="eyebrow mt-6 text-mocha/55">Chapter VIII</p>
              <h2 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl">
                Celebratory Gifts
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-pretty font-body text-xl leading-relaxed text-mocha">
                {gifts.intro}
              </p>

              <div className="mx-auto my-8 h-px w-20 bg-taupe/50" />

              <p className="mx-auto max-w-xl text-pretty font-body text-lg leading-relaxed text-mocha/85">
                {gifts.body}
              </p>

              <p className="mt-8 font-script text-4xl leading-none text-charcoal sm:text-5xl">
                {gifts.thanks}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
