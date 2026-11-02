interface OrnamentProps {
  className?: string;
}

export default function Ornament({ className = '' }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="25" stroke="currentColor" strokeOpacity="0.45" />
      <circle cx="40" cy="40" r="17" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M40 10 L43 36 L70 40 L43 44 L40 70 L37 44 L10 40 L37 36 Z" fill="currentColor" fillOpacity="0.55" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
      <path d="M20 20 L28 28 M60 20 L52 28 M20 60 L28 52 M60 60 L52 52" stroke="currentColor" strokeOpacity="0.3" />
    </svg>
  );
}
