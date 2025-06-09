import React, { useState, useEffect } from 'react';
import PageContentWrapper from '../../UI/PageContentWrapper/PageContentWrapper';
import useAudioPlay from '../../Utils/hooks/useAudioPlay';

import PageHeader from '../../UI/PageHeader/PageHeader';
import TextToSpeech from '../../UI/Widgets/TextToSpeech/TextToSpeech';
import HighlightContent from '../../UI/Widgets/HighlightContent/HighlightContent';
import Article from '../../UI/Article/Article';

import CodeOutlinedIcon from '@mui/icons-material/Code';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTime';
import LoopOutlinedIcon from '@mui/icons-material/Loop';
import GridOnOutlinedIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhite';
import './Arrays.css';

const Arrays = () => {
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

  const highlightContentData0 = [
    { id: '1', content: 'Read the concept introduction', icon: 'AutoStoriesOutlinedIcon' },
    {
      id: '2',
      content: 'Listen to the audio explanation',
      icon: 'PlayCircleFilledWhiteOutlinedIcon',
    },
    { id: '3', content: 'Review key concepts and examples', icon: 'VpnKeyOutlinedIcon' },
    { id: '4', content: 'Try the practice exercises', icon: 'FaceOutlinedIcon' },
    {
      id: '5',
      content: 'Take the quiz to test your understanding',
      icon: 'QuestionMarkOutlinedIcon',
    },
  ];
  const highlightContentData1 = [
    { id: '1', content: 'Read the concept introduction', icon: 'AutoStoriesOutlinedIcon' },
    {
      id: '2',
      content: 'Listen to the audio explanation',
      icon: 'PlayCircleFilledWhiteOutlinedIcon',
    },
    { id: '3', content: 'Review key concepts and examples', icon: 'VpnKeyOutlinedIcon' },
    { id: '4', content: 'Try the practice exercises', icon: 'FaceOutlinedIcon' },
    {
      id: '5',
      content: 'Take the quiz to test your understanding',
      icon: 'QuestionMarkOutlinedIcon',
    },
  ];

  // Add this: for image gallery data arrays

  // Add this: for dynamic image data arrays/objects

  return (
    <PageContentWrapper className="arrays-page-container">
      <TextToSpeech
        isOpenTTS={isOpenTTS}
        handelMode={handelMode}
        ttsMode={ttsMode}
        audioSrc={audioPath}
        audioText={audioText}
        handelOpenTts={handelOpenTts}
        handelCloseTts={handelCloseTts}
      />
      <div className="arrays-inner-container">
        <PageHeader
          pageTitle="JavaScript Arrays"
          isReadyToListen={true}
          handelListenAudio={handelListenAudio}
        />

        <div className="page-content">
          <HighlightContent
            highlightTitle="how to use this page"
            highlightData={highlightContentData0}
          />
          <HighlightContent
            highlightTitle="how to use this page 22"
            highlightData={highlightContentData1}
          />
          <Article
            title="Understanding JavaScript Arrays"
            content="Arrays in JavaScript are used to store multiple values in a single variable. They are a special type of object with built-in methods to perform common operations."
            number="1"
            isReadyToListen={true}
            handelListenAudio={handelListenAudio}
          />
        </div>
      </div>
    </PageContentWrapper>
  );
};

export default Arrays;
