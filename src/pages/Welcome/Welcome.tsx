import React, { useState, useEffect } from 'react';
import PageContentWrapper from '../../UI/PageContentWrapper/PageContentWrapper';
import useAudioPlay from '../../Utils/hooks/useAudioPlay';

import PageHeader from '../../UI/PageHeader/PageHeader';
import TextToSpeech from '../../UI/Widgets/TextToSpeech/TextToSpeech';
import HighlightContent from '../../UI/Widgets/HighlightContent/HighlightContent';
import Article from '../../UI/Article/Article';
import ImageGallery from '../../UI/ImageGallery/ImageGallery';
import DynamicImage from '../../UI/DynamicImage/DynamicImage';

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

  // Add this: for image gallery data arrays
  const imageGalleryData2 = [
    { id: 1, url: 'https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_1280.jpg' },
    {
      id: 2,
      url: 'https://media.istockphoto.com/id/1452731336/photo/blue-colored-megaphone-standing-out-from-the-crowd.jpg?s=1024x1024&w=is&k=20&c=vsvKQVvz7mYjbJxK0NnljSQinbXIxHcP5EFgOqC4cM8=',
    },
    {
      id: 3,
      url: 'https://media.istockphoto.com/id/1468173966/photo/cocktail-party-bright-fruity-and-citrus-alcoholic-drinks-with-gin-vodka-vermouth-and-juice.jpg?s=1024x1024&w=is&k=20&c=UZoYFu6ODQaLQ__zzayqhe6OUZ6G-QG9cdpdeqSUpwk=',
    },
    {
      id: 4,
      url: 'https://media.istockphoto.com/id/1406358305/photo/row-of-different-color-cars-on-asphalt-parking-lot-at-cloudy-summer-day.jpg?s=1024x1024&w=is&k=20&c=A6DTnCvdASKyUQRIpk0RQ_B21KzhYTnHaJnxsMTmZpI=',
    },
  ];

  // Add this: for dynamic image data arrays/objects
  const dynamicImageData3 = {
    id: '1',
    url: 'https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_1280.jpg',
    alt: 'First image',
    height: '300px',
  };

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
          <Article
            title="How to use this course"
            content="read the concept overview"
            number="1"
            isReadyToListen={true}
            handelListenAudio={handelListenAudio}
          />
          <HighlightContent
            highlightTitle="How to use this course"
            highlightData={highlightContentData1}
            isReadyToListen={true}
            audioTextContent={
              'How to use this course ? 1. Read the concept overview. 2. Listen to the audio explanation. 3. Review key points and examples. 4. Check or write notes in the Sidekick menu. 5. Practice with code exercises. 6. Take the quiz to test yourself.'
            }
            handelListenAudio={handelListenAudio}
          />
          <ImageGallery images={imageGalleryData2} />
          <DynamicImage
            src={'https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_1280.jpg'}
            alt={'First image'}
            height={'300px'}
          />
          <Article
            title="How to use this course"
            content="Arrays are fundamental data structures that allow you to store multiple values in a single variable. They are used extensively in programming for managing collections of data."
            number="1"
            isReadyToListen={true}
            handelListenAudio={handelListenAudio}
          />
        </div>
      </div>
    </PageContentWrapper>
  );
};

export default Welcome;
