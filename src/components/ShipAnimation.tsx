import { motion, useReducedMotion } from 'framer-motion';

interface ShipAnimationProps {
  count?: number;
  className?: string;
}

const ShipSVG = () => (
  <svg
    width="112"
    height="76"
    viewBox="0 0 112 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]"
  >
    <path
      d="M14 48 H98 L86 60 H26 L14 48 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M50 48 V20" stroke="currentColor" strokeWidth="1" />
    <path d="M67 48 V28" stroke="currentColor" strokeWidth="1" />
    <path
      d="M50 22 C58 27 65 34 65 42 H50 V22 Z"
      stroke="currentColor"
      strokeWidth="0.9"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path
      d="M67 30 C74 34 79 39 79 46 H67 V30 Z"
      stroke="currentColor"
      strokeWidth="0.9"
      fill="currentColor"
      fillOpacity="0.06"
    />
    <path
      d="M44 20 L50 27 L56 20"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    <path
      d="M8 64 Q22 58 36 64 T64 64 T92 64 T108 64"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.45"
    />
    <path
      d="M18 70 Q32 65 46 70 T74 70 T102 70"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity="0.25"
    />
  </svg>
);

export default function ShipAnimation({
  count = 3,
  className = '',
}: ShipAnimationProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => {
        const reverse = index % 2 === 1;
        const baseY = 18 + (index * 19) % 64;

        return (
          <motion.div
            key={index}
            className="absolute left-0 opacity-0"
            style={{ top: `${baseY}%` }}
            initial={{ x: reverse ? '110vw' : '-16vw' }}
            animate={{
              x: reverse ? '-16vw' : '110vw',
              y: [0, -10, 4, 0],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 32 + index * 12,
              repeat: Infinity,
              delay: index * 9,
              ease: 'linear',
            }}
          >
            <div className={reverse ? 'scale-x-[-1]' : ''}>
              <ShipSVG />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
