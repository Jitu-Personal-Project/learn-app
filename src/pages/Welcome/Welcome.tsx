import React, { useState, useEffect } from 'react';
import PageContentWrapper from '../../UI/PageContentWrapper/PageContentWrapper';
import useAudioPlay from '../../Utils/hooks/useAudioPlay';

import PageHeader from '../../UI/PageHeader/PageHeader';
import TextToSpeech from '../../UI/Widgets/TextToSpeech/TextToSpeech';
import HighlightContent from '../../UI/Widgets/HighlightContent/HighlightContent';

import CodeOutlinedIcon from '@mui/icons-material/Code';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTime';
import LoopOutlinedIcon from '@mui/icons-material/Loop';
import GridOnOutlinedIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhite';
import './Welcome.css';

const Welcome = () => {
  const [isOpenTTS, setIsOpenTTS] = useState(false);
  const [audioText, setAudioText] = useState('');
  const [audioPath, setAudioPath] = useState('');
  const [ttsMode, setTtsMode] = useState<'user' | 'admin' | 'developer' | 'setting'>('user');
  const playShineAudio = useAudioPlay('/shine-in.mp3', 0.2);
  const handelMode = (ttsMode: 'user' | 'admin' | 'developer' | 'setting') => {
    setTtsMode(ttsMode);
  };
  const handelOpenTts = () => {
    setIsOpenTTS(true);
  };
  const handelCloseTts = () => {
    setIsOpenTTS(false);
  };
  const handelListenAudio = (audioTextContent?: string, audioPathString?: string) => {
    if (isOpenTTS === false) {
      if (audioPathString) {
        setAudioText('');
        setAudioPath(audioPathString);
      }
      if (audioTextContent) {
        setAudioPath('');
        setAudioText(audioTextContent);
      }
      handelOpenTts();
      playShineAudio();
    }
    if (isOpenTTS === true) {
      handelCloseTts();
    }
  };

  const highlightContentData1 = [
    { id: '1', content: '1) Read the concept overview', icon: 'AutoStoriesOutlinedIcon' },
    {
      id: '2',
      content: '2) Listen to the audio explanation',
      icon: 'PlayCircleFilledWhiteOutlinedIcon',
    },
    { id: '3', content: '3) Review key points and examples', icon: 'VpnKeyOutlinedIcon' },
    { id: '4', content: '4) Check or write notes in the Sidekick menu', icon: 'FaceOutlinedIcon' },
    { id: '5', content: '5) Practice with code exercises', icon: 'FaceOutlinedIcon' },
    { id: '6', content: '6) Take the quiz to test yourself', icon: 'QuestionMarkOutlinedIcon' },
  ];

  return (
    <PageContentWrapper className="welcome-page-container">
      <TextToSpeech
        isOpenTTS={isOpenTTS}
        handelMode={handelMode}
        ttsMode={ttsMode}
        audioSrc={audioPath}
        audioText={audioText}
        handelOpenTts={handelOpenTts}
        handelCloseTts={handelCloseTts}
      />
      <div className="welcome-inner-container">
        <PageHeader
          pageTitle="JavaScript Welcome"
          isReadyToListen={true}
          audioSrc={'/Welcome-javascript.wav'}
          handelListenAudio={handelListenAudio}
        />

        <div className="page-content">
          <HighlightContent
            highlightTitle="How to use this course"
            highlightData={highlightContentData1}
            isReadyToListen={true}
            audioTextContent={
              'How to use this course ? 1. Read the concept overview. 2. Listen to the audio explanation. 3. Review key points and examples. 4. Check or write notes in the Sidekick menu. 5. Practice with code exercises. 6. Take the quiz to test yourself.'
            }
            handelListenAudio={handelListenAudio}
          />
        </div>
      </div>
    </PageContentWrapper>
  );
};

export default Welcome;
