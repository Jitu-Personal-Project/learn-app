import React, { useState, useEffect } from 'react';
import PageContentWrapper from '../../UI/PageContentWrapper/PageContentWrapper';

import PageHeader from '../../UI/PageHeader/PageHeader';
import TextToSpeech from '../../UI/Widgets/TextToSpeech/TextToSpeech';
import HighlightContent from '../../UI/Widgets/HighlightContent/HighlightContent';

import CodeOutlinedIcon from '@mui/icons-material/Code';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTime';
import LoopOutlinedIcon from '@mui/icons-material/Loop';
import GridOnOutlinedIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhite';
import './Arrays.css';

const Arrays = () => {
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

  return (
    <PageContentWrapper className="arrays-page-container">
      <div className="arrays-inner-container">
        <PageHeader pageTitle="JavaScript Arrays" />

        <div className="page-content">
          <HighlightContent
            highlightTitle="how to use this page"
            highlightData={highlightContentData0}
          />
          <HighlightContent
            highlightTitle="how to use this page 22"
            highlightData={highlightContentData1}
          />
        </div>
      </div>
    </PageContentWrapper>
  );
};

export default Arrays;
