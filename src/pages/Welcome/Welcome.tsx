import React from 'react';
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
    <div className="welcome-container">
      <header className="page-header">
        <h1>JavaScript Welcome</h1>
        <meta name="description" content="Learn about Welcome in JavaScript" />
        <meta name="keywords" content="Javascript, DSA, Welcome, Data Structures" />
      </header>

      <div className="page-content">
        <section key="1" className="content-section article">
          <h2 className="content-title">Understanding JavaScript Welcome</h2>
          <div className="content-body">
            Welcome in JavaScript are used to store multiple values in a single variable. They are a
            special type of object with built-in methods to perform common operations.
          </div>

          <ul className="bullet-points">
            <li key="1" className="bullet-point">
              {CodeOutlinedIcon && <CodeOutlinedIcon className="bullet-icon" />}
              <span>Creating and initializing array</span>
            </li>

            <li key="2" className="bullet-point">
              {AccessTimeOutlinedIcon && <AccessTimeOutlinedIcon className="bullet-icon" />}
              <span>Common array methods and their time complexity</span>
            </li>

            <li key="3" className="bullet-point">
              {LoopOutlinedIcon && <LoopOutlinedIcon className="bullet-icon" />}
              <span>Array traversal techniques</span>
            </li>

            <li key="4" className="bullet-point">
              {GridOnOutlinedIcon && <GridOnOutlinedIcon className="bullet-icon" />}
              <span>Multi-dimensional array</span>
            </li>
          </ul>

          <button className="listen-button">
            <PlayCircleFilledWhiteOutlinedIcon />
            Listen
          </button>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
