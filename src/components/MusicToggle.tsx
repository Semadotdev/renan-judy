import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!weddingConfig.music.enabled || !available) return null;

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        onError={() => setAvailable(false)}
        aria-label="Background music"
      >
        <source src={weddingConfig.music.src} type="audio/mpeg" />
      </audio>

      <motion.button
        type="button"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-3 border border-milk/15 bg-charcoal/80 px-4 py-2.5 text-milk shadow-cinematic backdrop-blur-md transition-colors hover:border-taupe/60 lg:bottom-6 lg:right-6"
        onClick={toggleMusic}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label={isPlaying ? 'Turn off background music' : 'Play background music'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Turn off background music' : 'Play background music'}
      >
        <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              className="w-[2px] origin-bottom bg-taupe"
              style={{ height: `${9 + bar * 3}px` }}
              animate={
                isPlaying
                  ? { scaleY: [0.35, 1, 0.55, 0.9, 0.35] }
                  : { scaleY: 0.35 }
              }
              transition={
                isPlaying
                  ? {
                      duration: 0.8 + bar * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </span>
        <span className="hidden font-sans text-[0.54rem] uppercase tracking-[0.2em] sm:inline">
          {isPlaying ? 'Sound on' : 'Sound off'}
        </span>
        {isPlaying ? <Volume2 size={15} strokeWidth={1.4} /> : <VolumeX size={15} strokeWidth={1.4} />}
      </motion.button>
    </>
  );
}
