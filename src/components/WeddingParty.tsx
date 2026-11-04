import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function WeddingParty() {
  const groups = weddingConfig.weddingParty;

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

        <div className="mt-14 space-y-10">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <div className="border-t border-taupe/30 pt-8">
                <div className="grid gap-5 md:grid-cols-[13rem_1fr] md:gap-10">
                  <div>
                    <p className="eyebrow text-mocha/55">{group.title}</p>
                    {group.intro && (
                      <p className="mt-3 font-body text-base leading-relaxed text-mocha/75">
                        {group.intro}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {group.members.map((member, memberIndex) => (
                      <div
                        key={`${group.title}-${member.role ?? 'member'}-${member.name}-${memberIndex}`}
                        className="border-b border-mocha/10 pb-3 last:border-0"
                      >
                        {member.role && (
                          <p className="font-sans text-[0.56rem] uppercase tracking-[0.2em] text-mocha/45">
                            {member.role}
                          </p>
                        )}
                        <p className="mt-1 font-display text-xl leading-snug text-charcoal sm:text-2xl">
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
