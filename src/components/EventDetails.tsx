import { motion } from 'framer-motion';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { weddingConfig, type EventDetail } from '../config/weddingConfig';
import Ornament from './Ornament';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import AddToCalendar from './AddToCalendar';

interface EventCardProps {
  eyebrow: string;
  title: string;
  detail: EventDetail;
  dark?: boolean;
}

function EventCard({ eyebrow, title, detail, dark = false }: EventCardProps) {
  const hasDetail = Boolean(detail.time || detail.venue || detail.address);
  const mapUrl =
    detail.mapUrl ??
    (detail.mapQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.mapQuery)}`
      : null);

  return (
    <motion.article
      className={`relative flex h-full flex-col justify-between overflow-hidden border p-7 sm:p-8 ${
        dark
          ? 'night-panel border-taupe/30 text-milk'
          : 'border-taupe/30 bg-oat/60 text-charcoal'
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -right-10 -top-12 opacity-[0.09]">
        <Ornament className="h-40 w-40" />
      </div>
      <div className="relative">
        <p className={`eyebrow ${dark ? 'text-taupe' : 'text-mocha/60'}`}>{eyebrow}</p>
        <h3 className="mt-4 text-4xl leading-none sm:text-5xl">{title}</h3>

        <div className="mt-7 space-y-4">
          <div className="flex items-start gap-3">
            <Clock3 size={16} strokeWidth={1.4} className={dark ? 'mt-1 text-taupe' : 'mt-1 text-mocha/60'} />
            <div>
              <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] opacity-50">Time</p>
              <p className={`mt-1 font-body text-lg ${dark ? 'text-oat/85' : 'text-mocha'}`}>
                {detail.time ?? 'To be announced'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={16} strokeWidth={1.4} className={dark ? 'mt-1 text-taupe' : 'mt-1 text-mocha/60'} />
            <div>
              <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] opacity-50">Place</p>
              <p className={`mt-1 font-body text-lg leading-snug ${dark ? 'text-oat/85' : 'text-mocha'}`}>
                {detail.venue ?? 'Venue details to follow'}
              </p>
              {detail.address && (
                <p className={`mt-1 font-body text-base ${dark ? 'text-oat/55' : 'text-mocha/70'}`}>
                  {detail.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`relative mt-8 border-t pt-5 ${dark ? 'border-taupe/25' : 'border-mocha/15'}`}>
        {hasDetail && mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 font-sans text-[0.58rem] uppercase tracking-[0.2em] transition-colors ${
              dark ? 'text-oat/60 hover:text-milk' : 'text-mocha/65 hover:text-charcoal'
            }`}
          >
            Open in maps <ArrowUpRight size={13} strokeWidth={1.4} />
          </a>
        ) : (
          <p className={`font-body text-base italic ${dark ? 'text-oat/45' : 'text-mocha/55'}`}>
            The route will be charted soon.
          </p>
        )}
      </div>
    </motion.article>
  );
}

function MapCard() {
  const ceremony = weddingConfig.eventDetails.ceremony;
  const reception = weddingConfig.eventDetails.reception;
  const query =
    weddingConfig.map.query ?? ceremony.mapQuery ?? reception.mapQuery ?? null;
  const mapUrl =
    weddingConfig.map.url ??
    (query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : null);
  const locationLabel =
    weddingConfig.map.label ??
    ceremony.venue ??
    ceremony.address ??
    reception.venue ??
    reception.address ??
    'Location to be announced';

  return (
    <div className="paper relative min-h-[21rem] overflow-hidden border border-taupe/30 p-7 shadow-paper sm:p-8">
      <div className="absolute inset-0 opacity-[0.16]" aria-hidden="true">
        <svg viewBox="0 0 600 420" className="h-full w-full" fill="none">
          <path d="M-20 300 C80 240 150 340 260 270 S430 180 620 250" stroke="#685D54" strokeWidth="1.2" />
          <path d="M-20 345 C100 285 170 380 290 310 S460 230 620 300" stroke="#685D54" strokeWidth="0.8" />
          <path d="M80 -20 C140 80 50 150 120 230 S230 330 200 440" stroke="#A39382" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="430" cy="130" r="58" stroke="#A39382" strokeWidth="1" />
          <path d="M430 46 V214 M346 130 H514" stroke="#A39382" strokeWidth="0.7" />
          <path d="M430 72 L444 130 L430 188 L416 130 Z" stroke="#685D54" strokeWidth="1" />
          <circle cx="430" cy="130" r="6" fill="#685D54" />
        </svg>
      </div>

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="eyebrow text-mocha/60">The route</p>
          <h3 className="mt-4 text-4xl leading-none text-charcoal">Finding your way</h3>
          <p className="mt-4 max-w-sm font-body text-lg leading-relaxed text-mocha">
            {query
              ? 'Open the map for directions to the celebration.'
              : 'A map and travel notes will be added here once the venue is confirmed.'}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {mapUrl ? (
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="cinematic-link border-mocha/30 text-charcoal hover:bg-mocha/5"
            >
              Open map <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          ) : (
            <span className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/50">
              Directions to follow
            </span>
          )}
          <span className="font-body text-base italic text-mocha/55">{locationLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { schedule } = weddingConfig;

  return (
    <section id="day" className="relative overflow-hidden bg-milk py-24 text-charcoal sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter III"
          title="The Day"
          intro="The ceremony, the celebration, and the path between them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <EventCard eyebrow="First light" title="Ceremony" detail={weddingConfig.eventDetails.ceremony} dark />
          </Reveal>
          <Reveal delay={0.1}>
            <EventCard eyebrow="Under the moon" title="Reception" detail={weddingConfig.eventDetails.reception} />
          </Reveal>
        </div>

        {schedule.length > 0 && (
          <div className="mt-14 grid gap-4 border-t border-taupe/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {schedule.map((item, index) => (
              <Reveal key={`${item.time}-${item.title}`} delay={index * 0.06}>
                <div className="border-l border-taupe/35 pl-4">
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-mocha/55">
                    {item.time}
                  </p>
                  <p className="mt-2 font-display text-xl text-charcoal">{item.title}</p>
                  <p className="mt-1 font-body text-base leading-snug text-mocha">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal>
            <MapCard />
          </Reveal>
          <Reveal delay={0.1}>
            <AddToCalendar />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
