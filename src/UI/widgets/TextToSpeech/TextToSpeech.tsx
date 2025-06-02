import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RefreshCw, Volume2, Settings } from "lucide-react";
import AnimatedCharacter from "../AnimatedCharacter/AnimatedCharacter";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import "./TextToSpeech.css";
import DraggableEle from "../../Draggable/DraggableEle";
interface Word {
  text: string;
  start: number;
  isHighlighted: boolean;
}

interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

type TextToSpeechProps = {
  isOpenTTS?: boolean;
  audioText?: string;
  language?: string;
  defaultVoice?: string;
  ttsMode?: "user" | "admin" | "developer" | "setting";
  handelMode?: (arg: "user" | "admin" | "developer" | "setting") => void;
  handelOpenTts?: () => void;
  handelCloseTts?: () => void;
};

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  isOpenTTS,
  audioText,
  language,
  defaultVoice,
  ttsMode,
  handelMode,
  handelOpenTts,
  handelCloseTts,
}) => {
  const [audioTextContent, setAudioTextContent] = useState<string>(
    audioText || "hello"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthHeight, setMouthHeight] = useState(2);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>();
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const synth = useRef<SpeechSynthesis | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const mouthAnimationInterval = useRef<number | null>(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    startBlinkInterval();

    // Initialize voices
    const loadVoices = () => {
      const availableVoices = synth.current!.getVoices().map((voice) => ({
        voice,
        name: voice.name,
        lang: voice.lang,
      }));
      setVoices(availableVoices);
      // Set default voice to the first English voice found
      const defaultVoice = availableVoices.find((v) => v.lang.startsWith("en"));
      if (defaultVoice) {
        setSelectedVoice(defaultVoice);
      }
    };

    // Chrome needs a small delay to load voices
    setTimeout(loadVoices, 100);

    // Handle dynamic voice loading
    synth.current?.addEventListener("voiceschanged", loadVoices);

    return () => {
      if (synth.current) {
        synth.current.cancel();
        synth.current.removeEventListener("voiceschanged", loadVoices);
      }
      if (mouthAnimationInterval.current) {
        clearInterval(mouthAnimationInterval.current);
      }
    };
  }, []);

  // Reset utterance when voice or other settings change
  useEffect(() => {
    if (utterance.current) {
      synth.current?.cancel();
      utterance.current = null;
      setIsPlaying(false);
      setIsSpeaking(false);
      setIsPaused(false);
      stopMouthAnimation();
    }
  }, [selectedVoice, pitch, rate, volume]);

  useEffect(() => {
    const wordArray = audioTextContent.split(" ").map((word, index) => ({
      text: word,
      start: index,
      isHighlighted: false,
    }));
    setWords(wordArray);

    // Reset utterance when text changes
    if (utterance.current) {
      synth.current?.cancel();
      utterance.current = null;
      setIsPlaying(false);
      setIsSpeaking(false);
      setIsPaused(false);
      stopMouthAnimation();
    }
  }, [audioTextContent]);
  useEffect(() => {
    if (audioText) {
      setAudioTextContent(audioText);
    }
  }, [audioText]);

  const startBlinkInterval = () => {
    setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);
  };

  const startMouthAnimation = () => {
    if (mouthAnimationInterval.current) {
      clearInterval(mouthAnimationInterval.current);
    }

    mouthAnimationInterval.current = window.setInterval(() => {
      setMouthHeight((prev) => {
        const newHeight = Math.floor(Math.random() * 4) + 2; // Random height between 2-6
        return newHeight;
      });
    }, 150);
  };

  const stopMouthAnimation = () => {
    if (mouthAnimationInterval.current) {
      clearInterval(mouthAnimationInterval.current);
      mouthAnimationInterval.current = null;
    }
    setMouthHeight(2);
  };

  const createUtterance = () => {
    utterance.current = new SpeechSynthesisUtterance(audioTextContent);
    if (selectedVoice) {
      utterance.current.voice = selectedVoice.voice;
    }
    utterance.current.rate = rate;
    utterance.current.pitch = pitch;
    utterance.current.volume = volume;

    utterance.current.onboundary = (event) => {
      if (event.name === "word") {
        const wordIndex = Math.floor(event.charIndex / 4);
        setCurrentWordIndex(wordIndex);
        setWords((prev) =>
          prev.map((word, idx) => ({
            ...word,
            isHighlighted: idx === wordIndex,
          }))
        );
      }
    };

    utterance.current.onstart = () => {
      setIsSpeaking(true);
      setIsPlaying(true);
      setIsPaused(false);
      startMouthAnimation();
    };

    utterance.current.onend = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      stopMouthAnimation();
      setWords((prev) =>
        prev.map((word) => ({
          ...word,
          isHighlighted: false,
        }))
      );
    };

    utterance.current.onpause = () => {
      setIsPaused(true);
      setIsPlaying(false);
      stopMouthAnimation();
    };

    utterance.current.onresume = () => {
      setIsPaused(false);
      setIsPlaying(true);
      startMouthAnimation();
    };
  };

  const handlePlay = () => {
    if (!synth.current) return;

    if (isPlaying) {
      synth.current.pause();
      setIsPlaying(false);
      setIsSpeaking(false);
      setIsPaused(true);
      stopMouthAnimation();
    } else {
      if (isPaused) {
        synth.current.resume();
        setIsPlaying(true);
        setIsSpeaking(true);
        setIsPaused(false);
        startMouthAnimation();
      } else {
        if (!utterance.current) {
          createUtterance();
        }
        synth.current.speak(utterance.current!);
        setIsPlaying(true);
        setIsSpeaking(true);
        startMouthAnimation();
      }
    }
  };

  const handleReset = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsPlaying(false);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      utterance.current = null;
      stopMouthAnimation();
      setWords((prev) =>
        prev.map((word) => ({
          ...word,
          isHighlighted: false,
        }))
      );
    }
  };

  return (
    <div className={`text-to-speech-main-wrp`}>
      <DraggableEle showElement={isOpenTTS ? isOpenTTS : false}>
        <div
          className={`text-to-speech-wrp ${
            isOpenTTS ? "tts-open" : "tts-close"
          }`}
        >
          <div className="character-container">
            <AnimatedCharacter
              mouthHeight={mouthHeight}
              isSpeaking={isSpeaking}
            />
          </div>

          <div className="buttons">
            <button
              onClick={handlePlay}
              className={`character-button ${isPlaying ? "playing" : ""}`}
            >
              {isPlaying ? <Pause size="small" /> : <Play size="small" />}
              {/* {isPlaying ? "Pause" : isPaused ? "Resume" : "Play"} */}
            </button>

            <button
              onClick={handleReset}
              className="character-button reset-button"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                if (handelMode) {
                  if (ttsMode == "setting") {
                    handelMode("user");
                  }
                  if (ttsMode != "setting") {
                    handelMode("setting");
                  }
                }
              }}
              className={`settings-button character-button ${
                ttsMode == "setting" ? "active" : ""
              }`}
            >
              <Settings size={20} />
            </button>

            <button
              onClick={handelCloseTts}
              className="character-button reset-button"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
          {ttsMode && (ttsMode == "admin" || ttsMode == "setting") && (
            <div className="text-to-speech-container">
              <textarea
                value={audioTextContent}
                onChange={(e) => setAudioTextContent(e.target.value)}
                className="text-input"
                placeholder="Enter text to convert to speech..."
              />

              <div className="controls">
                <div className="buttons">
                  <button
                    onClick={handlePlay}
                    className={`play-button ${isPlaying ? "playing" : ""}`}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    {/* {isPlaying ? "Pause" : isPaused ? "Resume" : "Play"} */}
                  </button>

                  <button onClick={handleReset} className="reset-button">
                    <RefreshCw size={20} />
                    Reset
                  </button>

                  <button
                    onClick={() => {
                      setShowSettings(!showSettings);
                    }}
                    className={`settings-button ${
                      showSettings ? "active" : ""
                    }`}
                  >
                    <Settings size={20} />
                    Settings
                  </button>
                </div>

                {showSettings && (
                  <div className="settings">
                    <div className="setting">
                      <label className="setting-label">Voice</label>
                      <select
                        value={selectedVoice?.name || ""}
                        onChange={(e) => {
                          const voice = voices.find(
                            (v) => v.name === e.target.value
                          );
                          setSelectedVoice(voice || null);
                        }}
                        className="setting-select"
                      >
                        {voices.map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="setting">
                      <label className="setting-label">Rate: {rate}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value))}
                        className="setting-range"
                      />
                    </div>

                    <div className="setting">
                      <label className="setting-label">Pitch: {pitch}</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(parseFloat(e.target.value))}
                        className="setting-range"
                      />
                    </div>

                    <div className="setting">
                      <label className="setting-label">
                        <Volume2 size={16} />
                        Volume: {Math.round(volume * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="setting-range"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-display">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`word ${
                      word.isHighlighted ? "highlighted" : ""
                    }`}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DraggableEle>
    </div>
  );
};
