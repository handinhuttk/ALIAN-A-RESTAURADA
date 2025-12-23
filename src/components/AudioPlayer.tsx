import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  duration: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration, onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock audio progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    if (onPlayStateChange) onPlayStateChange(newState);
  };

  return (
    <div className="w-full glass-card rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
      {/* Waveform Visualization (Static Mock) */}
      <div className="flex items-center justify-center space-x-1 h-8 w-full px-4 overflow-hidden opacity-60">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 rounded-full bg-sand-600 transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
            style={{ 
              height: `${Math.max(20, Math.random() * 100)}%`,
              opacity: isPlaying ? 0.8 : 0.3
            }} 
          />
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-sand-600 hover:text-sand-800 transition-colors">
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-14 h-14 bg-sand-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sand-600 transition-all transform hover:scale-105"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <button className="text-sand-600 hover:text-sand-800 transition-colors">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="w-full space-y-2">
        <div className="w-full h-1 bg-sand-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sand-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-sand-700 font-sans tracking-wide">
          <span>{Math.floor((progress / 100) * parseInt(duration.split(':')[0]))}:{String(Math.floor(((progress / 100) * 60) % 60)).padStart(2, '0')}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};