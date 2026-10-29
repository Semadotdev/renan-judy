import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMusic = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Try to play - browsers require user interaction
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log('Audio play failed:', error)
        // Still allow toggle even if autoplay blocked
        setIsPlaying(false)
      })
    }
  }

  if (!weddingConfig.music.enabled) return null

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        aria-label="Background music"
      >
        <source src={weddingConfig.music.src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <motion.button
        className="fixed top-4 right-4 z-40 p-3 border border-taupe/40 bg-milk/90 backdrop-blur-sm hover:bg-oat transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-taupe"
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 size={18} className="text-charcoal" />
        ) : (
          <VolumeX size={18} className="text-charcoal" />
        )}
      </motion.button>
    </>
  )
}
