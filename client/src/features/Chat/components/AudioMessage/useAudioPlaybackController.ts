import { useCallback, useMemo, useRef, useState } from 'react';
import { formatMediaTime } from './utils';

const useAudioPlaybackController = () => {
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleLoadedMetadata = useCallback(() => {
    const audioElement = audioElementRef.current;
    if (audioElement) setDuration(audioElement.duration);
  }, []);

  const togglePlayback = useCallback(() => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;
    try {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error(error);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    const audioElement = audioElementRef.current;
    if (audioElement) setCurrentTime(Math.floor(audioElement.currentTime));
  }, []);

  const handlePlaybackEnded = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  const setTimePercentage = useCallback((percentage: number) => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;
    audioElement.currentTime = audioElement.duration * (percentage / 100);
  }, []);

  const timePercentage = useMemo(
    () => (currentTime / duration) * 100,
    [currentTime, duration],
  );

  const playbackTime = useMemo(
    () => `${formatMediaTime(currentTime)} / ${formatMediaTime(duration)}`,
    [currentTime, duration],
  );

  return {
    audioElementRef,
    isPlaying,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlaybackEnded,
    timePercentage,
    setTimePercentage,
    togglePlayback,
    playbackTime,
  };
};

export default useAudioPlaybackController;
