import { useRef } from "react";

const useAudioPlay = (audioSrc: string, volume: number = 1) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current = new Audio(audioSrc);
    }
    audioRef.current.volume = volume;
    audioRef.current.play();
  };

  return playAudio;
};

export default useAudioPlay;
