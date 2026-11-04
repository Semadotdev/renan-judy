import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const SWATCHES: Record<string, string> = {
  Oat: '#E5DED2',
  Taupe: '#A39382',
  Mocha: '#685D54',
  Milk: '#FBF7F4',
  Charcoal: '#232323',
  'Warm Ivory': '#F6F0E7',
  'Almond Beige': '#D9C9B6',
};

interface PaletteRowProps {
  label: string;
  colors: string[];
}

function PaletteRow({ label, colors }: PaletteRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-mocha/10 py-4 last:border-0">
      <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-mocha/50">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <span
            key={color}
            className="inline-flex items-center gap-2 border border-mocha/10 bg-milk/70 py-1 pl-1.5 pr-3"
          >
            <span
              className="h-4 w-4 border border-mocha/15"
              style={{ backgroundColor: SWATCHES[color] ?? '#E5DED2' }}
            />
            <span className="font-body text-sm text-mocha">{color}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ThemeOverview() {
  const { theme } = weddingConfig;

  return (
    <section id="theme" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -right-20 top-12 text-taupe/[0.07]">
        <Ornament className="h-72 w-72 sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter V"
          title="The Theme"
          intro="A warm, modern minimalist celebration shaped by oat, taupe, and mocha."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="border-t border-taupe/30 pt-7">
              <p className="eyebrow text-mocha/55">Style</p>
              <p className="mt-4 text-pretty text-3xl leading-tight text-charcoal sm:text-4xl">
                {theme.style.join(' · ')}
              </p>

              <p className="eyebrow mt-10 text-mocha/55">Mood</p>
              <p className="mt-4 text-pretty text-3xl leading-tight text-charcoal sm:text-4xl">
                {theme.mood.join(' · ')}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <Ornament className="h-10 w-10 text-taupe" />
                <p className="max-w-xs font-body text-lg italic leading-relaxed text-mocha">
                  Quiet details, warm neutrals, and a celebration that feels effortless.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper relative border border-taupe/30 p-7 shadow-paper sm:p-9">
              <div className="absolute inset-4 border border-mocha/10" />
              <div className="relative">
                <p className="eyebrow text-mocha/55">The palette</p>
                <div className="mt-5">
                  <PaletteRow label="Primary colors" colors={theme.primaryColors} />
                  <PaletteRow label="Accent" colors={theme.accentColors} />
                  <PaletteRow label="Background" colors={theme.backgroundColors} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
