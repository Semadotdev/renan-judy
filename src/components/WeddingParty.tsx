import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

export default function WeddingParty() {
  const party = weddingConfig.weddingParty;

  return (
    <section id="party" className="relative overflow-hidden bg-oat py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -left-24 bottom-0 text-mocha/[0.06]">
        <Ornament className="h-80 w-80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter IV"
          title="By Our Side"
          intro="The people who have carried us here, and who will stand with us as we begin."
          align="center"
        />

        {party.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {party.map((member, index) => (
              <Reveal key={`${member.name}-${member.role}`} delay={index * 0.06}>
                <article className="group relative overflow-hidden border border-taupe/30 bg-milk p-5">
                  <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(229,222,210,0.26),transparent_45%),linear-gradient(145deg,#232323,#171615)]">
                        <span className="font-display text-5xl text-taupe/60">{initials(member.name)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-milk/60">
                        {member.role}
                      </p>
                      <p className="mt-1 font-display text-2xl text-milk">{member.name}</p>
                    </div>
                  </div>
                  {member.note && (
                    <p className="mt-4 font-body text-base leading-relaxed text-mocha">{member.note}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14" delay={0.1}>
            <div className="paper relative mx-auto max-w-3xl border border-taupe/30 px-7 py-14 text-center shadow-paper sm:px-14 sm:py-16">
              <div className="absolute inset-4 border border-mocha/10" />
              <div className="relative">
                <Ornament className="mx-auto h-12 w-12 text-taupe" />
                <h3 className="mt-6 text-4xl leading-tight text-charcoal sm:text-5xl">
                  With our families
                </h3>
                <p className="mx-auto mt-5 max-w-xl text-pretty font-body text-xl leading-relaxed text-mocha">
                  We are grateful for the love that raised us, the friends who became family, and the people
                  who will be standing beside us on the day.
                </p>
                <p className="mt-7 font-sans text-[0.58rem] uppercase tracking-[0.24em] text-mocha/50">
                  Wedding party portraits to follow
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
