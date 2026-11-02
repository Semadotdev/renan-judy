import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ThePassageProps {
  className?: string;
}

export default function ThePassage({ className = '' }: ThePassageProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });
  const shipTop = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div
      className={`pointer-events-none absolute top-0 h-full w-px ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-milk/15" />
      <motion.div
        className="absolute inset-0 origin-top bg-gradient-to-b from-taupe/40 via-taupe to-taupe/30"
        style={{ scaleY: progress }}
      />
      <motion.div
        className="absolute right-1/2 top-0 translate-x-1/2 translate-y-[-50%] text-taupe"
        style={{ top: shipTop }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M1 8 L17 8 L14 12 H4 L1 8 Z" fill="currentColor" opacity="0.9" />
          <path d="M8 8 V1 L14 6 H8 V8 Z" fill="currentColor" opacity="0.7" />
          <path d="M8 8 V3 L3 7 H8 V8 Z" fill="currentColor" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
}
