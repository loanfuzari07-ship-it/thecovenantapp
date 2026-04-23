"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomAudioPlayerProps {
  src: string;
}

export function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime('0:00');
      };
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[12px] p-[14px_16px] mb-[14px]">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        preload="none"
        className="hidden"
      />
      
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-colors"
        >
          {isPlaying ? (
            <div className="flex gap-[3px]">
              <div className="w-[3px] h-3 bg-white rounded-full" />
              <div className="w-[3px] h-3 bg-white rounded-full" />
            </div>
          ) : (
            <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div 
              ref={progressBarRef}
              onClick={handleSeek}
              className="flex-1 h-1 bg-[rgba(201,169,110,0.2)] rounded-full cursor-pointer relative"
            >
              <div 
                className="h-full bg-[var(--gold)] rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] font-medium text-[var(--text-muted)] font-inter">{currentTime}</span>
            <span className="text-[10px] font-medium text-[var(--text-muted)] font-inter">{duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-1">
          <Volume2 className="w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-[60px] h-[3px] accent-[var(--gold)] cursor-pointer appearance-none bg-[rgba(201,169,110,0.2)] rounded-full"
          />
        </div>
      </div>
      <p className="text-[11px] text-[var(--text-muted)] text-center mt-1.5 font-inter">
        Listen with headphones for the best experience.
      </p>
    </div>
  );
}
