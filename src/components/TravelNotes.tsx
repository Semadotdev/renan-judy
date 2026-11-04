import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function mapUrl(): string | null {
  const query =
    weddingConfig.map.query ??
    weddingConfig.eventDetails.reception.mapQuery ??
    weddingConfig.eventDetails.ceremony.mapQuery;

  return (
    weddingConfig.map.url ??
    (query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : null)
  );
}

export default function TravelNotes() {
  const { travel } = weddingConfig;
  const directions = mapUrl();

  return (
    <section id="travel" className="relative overflow-hidden bg-oat py-24 text-charcoal sm:py-32">
      <div className="pointer-events-none absolute -left-24 bottom-0 text-mocha/[0.06]">
        <Ornament className="h-80 w-80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter VII"
          title="Travel Notes"
          intro={travel.intro}
        />

        <div className="mt-14">
          <p className="eyebrow text-mocha/55">Nearby accommodation</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travel.accommodations.map((place, index) => (
              <Reveal key={place.name} delay={index * 0.05}>
                <article className="h-full border border-taupe/30 bg-milk/60 p-5">
                  <h3 className="font-display text-2xl leading-tight text-charcoal">{place.name}</h3>
                  <div className="mt-4 flex items-start gap-2.5 text-mocha">
                    <MapPin size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-taupe" />
                    <p className="font-body text-base leading-snug">{place.address}</p>
                  </div>
                  {place.phone && (
                    <a
                      href={`tel:${place.phone.replace(/[^0-9+]/g, '')}`}
                      className="mt-3 inline-flex items-center gap-2.5 font-body text-base text-mocha transition-colors hover:text-charcoal"
                    >
                      <Phone size={15} strokeWidth={1.4} className="shrink-0 text-taupe" />
                      {place.phone}
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="space-y-5">
              {travel.tips.map((tip) => {
                const [address, ...notes] = tip.body;

                return (
                  <article key={tip.title} className="paper border border-taupe/30 p-6 shadow-paper sm:p-8">
                    <h3 className="text-3xl leading-tight text-charcoal">{tip.title}</h3>
                    <p className="mt-2 font-sans text-[0.56rem] uppercase tracking-[0.2em] text-mocha/50">
                      {address}
                    </p>
                    <div className="mt-5 space-y-3">
                      {notes.map((note) => (
                        <p key={note} className="font-body text-base leading-relaxed text-mocha">
                          {note}
                        </p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="night-panel flex h-full flex-col justify-between border border-taupe/25 p-7 text-milk sm:p-8">
              <div>
                <p className="eyebrow text-taupe">The pin</p>
                <h3 className="mt-4 text-3xl leading-tight text-milk">Find the celebration.</h3>
                <p className="mt-3 font-body text-lg leading-relaxed text-oat/65">
                  Use the location pin for the reception rather than the general address.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="border border-milk/15 bg-milk p-3">
                  <img
                    src={travel.qrImage}
                    alt="QR code for Google Maps directions to the reception"
                    className="h-40 w-40"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 font-sans text-[0.56rem] uppercase tracking-[0.2em] text-oat/50">
                  {travel.qrCaption}
                </p>
              </div>

              {directions && (
                <a
                  href={directions}
                  target="_blank"
                  rel="noreferrer"
                  className="cinematic-link mt-8 w-full justify-between border-taupe/55 text-milk hover:bg-milk/5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
