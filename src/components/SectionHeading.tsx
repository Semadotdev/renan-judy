import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal
      className={`${centered ? 'mx-auto text-center' : ''} max-w-4xl ${className}`}
    >
      <div
        className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-10 bg-taupe" />
        <p className={`eyebrow ${dark ? 'text-taupe' : 'text-mocha/80'}`}>
          {eyebrow}
        </p>
      </div>
      <h2
        className={`mt-5 text-balance text-[2.65rem] leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl ${
          dark ? 'text-milk' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl ${
            centered ? 'mx-auto' : ''
          } ${dark ? 'text-oat/75' : 'text-mocha'}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
