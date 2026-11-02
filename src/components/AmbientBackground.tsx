import ShipAnimation from './ShipAnimation';

const STARS = Array.from({ length: 54 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  size: index % 9 === 0 ? 2 : 1,
  opacity: 0.18 + ((index * 17) % 55) / 100,
  delay: `${(index % 7) * 0.8}s`,
}));

export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-charcoal"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 76% 12%, rgba(229, 222, 210, 0.16), transparent 28%), radial-gradient(circle at 12% 72%, rgba(104, 93, 84, 0.26), transparent 38%), linear-gradient(148deg, #232323 0%, #1b1a19 52%, #232323 100%)',
        }}
      />
      <div className="absolute -right-[18vw] -top-[20vw] h-[62vw] w-[62vw] rounded-full bg-oat/[0.04] blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-[28vw] -left-[20vw] h-[58vw] w-[58vw] rounded-full bg-taupe/[0.08] blur-3xl animate-pulse-soft [animation-delay:2s]" />

      <div className="absolute inset-0">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-milk animate-shimmer"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-[58%] h-px bg-gradient-to-r from-transparent via-milk/10 to-transparent" />
      <div className="absolute inset-x-0 top-[58.3%] h-24 bg-gradient-to-b from-milk/[0.025] to-transparent blur-sm" />

      <ShipAnimation count={3} className="text-taupe/30" />
      <div className="absolute inset-0 grain opacity-[0.18] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.34)_100%)]" />
    </div>
  );
}
