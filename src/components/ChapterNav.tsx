import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ThePassage from './ThePassage';

export interface Chapter {
  id: string;
  label: string;
}

interface ChapterNavProps {
  sections: Chapter[];
}

export default function ChapterNav({ sections }: ChapterNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-38% 0px -50% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [sections]);

  const activeIndex = Math.max(
    sections.findIndex((section) => section.id === active),
    0,
  );
  const activeLabel = sections[activeIndex]?.label ?? 'Invitation';

  return (
    <>
      <nav
        aria-label="Invitation chapters"
        className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 wide:block"
      >
        <div className="pointer-events-auto relative flex flex-col items-end gap-4">
          <ThePassage className="right-0" />
          {sections.map((section, index) => {
            const isActive = section.id === active;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center justify-end gap-3 py-1 font-sans text-[0.58rem] uppercase tracking-[0.2em]"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`translate-x-2 whitespace-nowrap transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 ${
                    isActive
                      ? 'text-milk opacity-100'
                      : 'text-milk/50 opacity-0'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} {section.label}
                </span>
                <span
                  className={`relative z-10 h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
                    isActive
                      ? 'border-taupe bg-taupe shadow-[0_0_0_5px_rgba(163,147,130,0.12)]'
                      : 'border-milk/35 bg-charcoal group-hover:border-taupe'
                  }`}
                />
              </a>
            );
          })}
        </div>
      </nav>

      <div className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,26rem)] -translate-x-1/2 wide:hidden">
        <div className="flex items-center gap-3 rounded-full border border-milk/15 bg-charcoal/85 px-4 py-2.5 shadow-cinematic backdrop-blur-md">
          <span className="max-w-[42vw] truncate font-sans text-[0.56rem] uppercase tracking-[0.2em] text-milk/70">
            {activeLabel}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-milk/15">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-taupe"
              style={{ scaleX: progress }}
            />
          </div>
          <span className="font-sans text-[0.56rem] tracking-[0.14em] text-taupe">
            {String(activeIndex + 1).padStart(2, '0')}/
            {String(sections.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </>
  );
}
