import React, { useState, useEffect } from 'react';
import PageContentWrapper from '../../UI/PageContentWrapper/PageContentWrapper';

import PageHeader from '../../UI/PageHeader/PageHeader';
import TextToSpeech from '../../UI/Widgets/TextToSpeech/TextToSpeech';

import CodeOutlinedIcon from '@mui/icons-material/Code';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTime';
import LoopOutlinedIcon from '@mui/icons-material/Loop';
import GridOnOutlinedIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhite';
import './Welcome.css';

const Welcome = () => {
  return (
    <PageContentWrapper className="welcome-page-container">
      <div className="welcome-inner-container">
        <PageHeader pageTitle="JavaScript Welcome" />

        <div className="page-content"></div>
      </div>
    </PageContentWrapper>
  );
};

export default Welcome;
