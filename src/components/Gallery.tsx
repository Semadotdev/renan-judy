import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type Motif = 'envelope' | 'ship' | 'moon';

interface GalleryItem {
  src?: string;
  alt: string;
  caption: string;
  motif?: Motif;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    alt: 'An illustrated invitation envelope with a wax seal',
    caption: 'The invitation',
    motif: 'envelope',
  },
  {
    alt: 'A ship crossing a moonlit sea',
    caption: 'The voyage',
    motif: 'ship',
  },
  {
    alt: 'A full moon over a quiet horizon',
    caption: 'The beginning',
    motif: 'moon',
  },
];

function PostcardArt({ motif }: { motif: Motif }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(229,222,210,0.24),transparent_28%),linear-gradient(155deg,#232323,#151514)]">
      <div className="absolute inset-0 grain opacity-[0.16] mix-blend-soft-light" />
      <svg viewBox="0 0 600 460" className="h-full w-full" fill="none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <circle
            key={index}
            cx={(index * 83 + 37) % 600}
            cy={(index * 51 + 19) % 300}
            r={index % 6 === 0 ? 1.6 : 1}
            fill="#FBF7F4"
            opacity={0.15 + ((index * 11) % 35) / 100}
          />
        ))}

        {motif === 'envelope' && (
          <g transform="translate(145 138) rotate(-4 155 92)">
            <rect x="0" y="0" width="310" height="184" fill="#E5DED2" />
            <path d="M0 0 L155 116 L310 0" stroke="#685D54" strokeWidth="1.4" fill="none" />
            <path d="M0 184 L118 76 M310 184 L192 76" stroke="#685D54" strokeWidth="1.2" />
            <circle cx="155" cy="116" r="31" fill="#A39382" />
            <circle cx="155" cy="116" r="23" stroke="#3D352E" strokeWidth="0.8" opacity="0.6" />
            <path d="M143 124 H167 L161 116 H149 L143 124 Z" stroke="#3D352E" strokeWidth="1" fill="none" />
            <path d="M152 116 L155 105 L158 116 Z" fill="#3D352E" opacity="0.7" />
          </g>
        )}

        {motif === 'ship' && (
          <g>
            <circle cx="422" cy="104" r="48" fill="#E5DED2" opacity="0.28" />
            <circle cx="422" cy="104" r="62" stroke="#A39382" strokeWidth="0.8" opacity="0.3" />
            <path d="M60 316 Q150 296 240 316 T420 316 T580 316" stroke="#A39382" strokeWidth="1" opacity="0.55" />
            <path d="M20 344 Q120 320 220 344 T420 344 T600 344" stroke="#A39382" strokeWidth="0.7" opacity="0.28" />
            <g transform="translate(210 188)">
              <path d="M0 92 H210 L184 120 H30 L0 92 Z" stroke="#FBF7F4" strokeWidth="1.2" fill="none" />
              <path d="M100 92 V26" stroke="#FBF7F4" strokeWidth="1" />
              <path d="M136 92 V44" stroke="#FBF7F4" strokeWidth="1" />
              <path d="M100 28 C120 40 134 56 134 76 H100 V28 Z" fill="#FBF7F4" fillOpacity="0.14" stroke="#FBF7F4" strokeWidth="0.8" />
              <path d="M136 46 C156 56 170 68 170 84 H136 V46 Z" fill="#FBF7F4" fillOpacity="0.09" stroke="#FBF7F4" strokeWidth="0.7" />
            </g>
          </g>
        )}

        {motif === 'moon' && (
          <g>
            <circle cx="300" cy="170" r="104" fill="#E5DED2" opacity="0.3" />
            <circle cx="300" cy="170" r="82" fill="#FBF7F4" opacity="0.55" />
            <circle cx="266" cy="143" r="18" fill="#A39382" opacity="0.18" />
            <circle cx="330" cy="196" r="24" fill="#A39382" opacity="0.13" />
            <circle cx="300" cy="170" r="122" stroke="#A39382" strokeWidth="0.8" opacity="0.35" />
            <path d="M0 306 Q110 288 220 306 T440 306 T660 306" stroke="#A39382" strokeWidth="1" opacity="0.5" />
            <path d="M0 334 Q120 312 240 334 T480 334 T720 334" stroke="#A39382" strokeWidth="0.7" opacity="0.28" />
          </g>
        )}
      </svg>
    </div>
  );
}

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function Lightbox({ item, onClose, onPrevious, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Postcard gallery"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-milk/20 text-milk transition-colors hover:bg-milk/10 sm:right-8 sm:top-8"
        aria-label="Close gallery"
      >
        <X size={18} strokeWidth={1.4} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-milk/20 text-milk transition-colors hover:bg-milk/10 sm:left-8"
        aria-label="Previous postcard"
      >
        <ChevronLeft size={20} strokeWidth={1.4} />
      </button>

      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="aspect-[4/3] w-full overflow-hidden border border-milk/15 bg-charcoal">
          {item.src ? (
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
          ) : (
            <PostcardArt motif={item.motif ?? 'moon'} />
          )}
        </div>
        <p className="mt-4 text-center font-body text-lg italic text-oat/70">{item.caption}</p>
      </motion.div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-milk/20 text-milk transition-colors hover:bg-milk/10 sm:right-8"
        aria-label="Next postcard"
      >
        <ChevronRight size={20} strokeWidth={1.4} />
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const configuredItems: GalleryItem[] = weddingConfig.gallery.map((image) => ({
    src: image.src,
    alt: image.alt,
    caption: image.caption,
  }));
  const items = configuredItems.length > 0 ? configuredItems : FALLBACK_ITEMS;
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const previous = useCallback(
    () =>
      setSelected((current) =>
        current === null ? current : (current - 1 + items.length) % items.length,
      ),
    [items.length],
  );
  const next = useCallback(
    () =>
      setSelected((current) =>
        current === null ? current : (current + 1) % items.length,
      ),
    [items.length],
  );

  return (
    <section id="gallery" className="relative overflow-hidden py-24 text-milk sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter VI"
          title="Postcards"
          intro="A few keepsakes from the voyage. Photographs will join them as the story unfolds."
          dark
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={`${item.caption}-${index}`}
              className={index === 0 ? 'md:col-span-2' : ''}
              delay={index * 0.06}
            >
              <button
                type="button"
                onClick={() => setSelected(index)}
                className="group relative block w-full overflow-hidden border border-milk/15 text-left"
                aria-label={`Open postcard: ${item.caption}`}
              >
                <div className={`${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'} w-full`}>
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
                      <PostcardArt motif={item.motif ?? 'moon'} />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em] text-milk/55">
                    Postcard {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-display text-2xl text-milk">{item.caption}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && items[selected] && (
          <Lightbox
            item={items[selected]}
            onClose={close}
            onPrevious={previous}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
