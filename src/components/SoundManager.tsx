import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface SoundContextType {
  playSound: (soundType: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

// Sound configurations with frequencies and durations for different UI events
const soundConfigs = {
  buttonClick: {
    frequency: 800,
    duration: 0.1,
    type: 'sine' as OscillatorType,
    volume: 0.3
  },
  buttonHover: {
    frequency: 600,
    duration: 0.05,
    type: 'sine' as OscillatorType,
    volume: 0.15
  },
  success: {
    frequencies: [523, 659, 784, 1047], // C-E-G-C chord
    duration: 0.4,
    type: 'sine' as OscillatorType,
    volume: 0.4
  },
  achievement: {
    frequencies: [440, 554, 659, 880], // A-C#-E-A chord
    duration: 0.6,
    type: 'triangle' as OscillatorType,
    volume: 0.5
  },
  notification: {
    frequency: 1000,
    duration: 0.2,
    type: 'triangle' as OscillatorType,
    volume: 0.3
  },
  error: {
    frequency: 220,
    duration: 0.3,
    type: 'sawtooth' as OscillatorType,
    volume: 0.3
  },
  tick: {
    frequency: 1200,
    duration: 0.05,
    type: 'square' as OscillatorType,
    volume: 0.2
  },
  whoosh: {
    frequency: 400,
    duration: 0.3,
    type: 'sine' as OscillatorType,
    volume: 0.25,
    sweep: true,
    sweepEnd: 800
  },
  chime: {
    frequencies: [523, 659, 784], // C-E-G chord
    duration: 0.8,
    type: 'sine' as OscillatorType,
    volume: 0.4
  }
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseFloat(localStorage.getItem('optimusVolume') || '0.7');
    }
    return 0.7;
  });
  
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('optimusMuted') === 'true';
    }
    return false;
  });

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('optimusVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('optimusMuted', isMuted.toString());
  }, [isMuted]);

  const playTone = (frequency: number, duration: number, type: OscillatorType, soundVolume: number, sweepEnd?: number) => {
    if (!audioContextRef.current || isMuted || volume === 0) return;

    // Resume audio context if it's suspended (required for autoplay policies)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

    if (sweepEnd) {
      oscillator.frequency.exponentialRampToValueAtTime(
        sweepEnd,
        audioContextRef.current.currentTime + duration
      );
    }

    // Create smooth attack and release envelope
    const now = audioContextRef.current.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(soundVolume * volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  const playSound = (soundType: string) => {
    const config = soundConfigs[soundType as keyof typeof soundConfigs];
    if (!config) return;

    if ('frequencies' in config && config.frequencies) {
      // Play chord
      config.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, config.duration, config.type, config.volume);
        }, index * 50);
      });
    } else if ('frequency' in config) {
      // Play single tone
      playTone(
        config.frequency, 
        config.duration, 
        config.type, 
        config.volume,
        config.sweepEnd
      );
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, volume, setVolume, isMuted, setIsMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export function SoundControls() {
  const { volume, setVolume, isMuted, setIsMuted, playSound } = useSound();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white"
          onClick={() => playSound('buttonClick')}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
          <Settings className="h-3 w-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-black/90 backdrop-blur-xl border-white/10 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-orange-400">Audio Settings</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsMuted(!isMuted);
                if (isMuted) playSound('buttonClick');
              }}
              className="text-white/70 hover:text-white"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Volume</span>
              <span className="text-orange-400">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={1}
              step={0.1}
              className="w-full"
              disabled={isMuted}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => playSound('buttonClick')}
              className="text-xs border-white/20 text-white hover:bg-white/10"
              disabled={isMuted}
            >
              Click Sound
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => playSound('success')}
              className="text-xs border-white/20 text-white hover:bg-white/10"
              disabled={isMuted}
            >
              Success
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => playSound('achievement')}
              className="text-xs border-white/20 text-white hover:bg-white/10"
              disabled={isMuted}
            >
              Achievement
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => playSound('chime')}
              className="text-xs border-white/20 text-white hover:bg-white/10"
              disabled={isMuted}
            >
              Chime
            </Button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Premium audio feedback enhances your empire-building experience
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Enhanced Button component with sound
export function SoundButton({ 
  children, 
  onClick, 
  soundType = 'buttonClick',
  hoverSound = true,
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  soundType?: string;
  hoverSound?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const { playSound } = useSound();

  const handleClick = () => {
    playSound(soundType);
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (hoverSound) {
      playSound('buttonHover');
    }
  };

  return (
    <Button
      {...props}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Button>
  );
}