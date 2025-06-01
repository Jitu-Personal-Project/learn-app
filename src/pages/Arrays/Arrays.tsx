import React from 'react';
import CodeOutlinedIcon from '@mui/icons-material/Code';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTime';
import LoopOutlinedIcon from '@mui/icons-material/Loop';
import GridOnOutlinedIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhite';

import './Arrays.css';

const Arrays = () => {
  return (
    <div className="arrays-container">
      <header className="page-header">
        <h1>JavaScript Arrays</h1>
        <meta name="description" content="Learn about Arrays in JavaScript" />
        <meta name="keywords" content="Javascript, DSA, Arrays, Data Structures" />
      </header>

      <div className="page-content">
        <section key="1" className="content-section article">
          <h2 className="content-title">Understanding JavaScript Arrays</h2>
          <div className="content-body">
            Arrays in JavaScript are used to store multiple values in a single variable. They are a
            special type of object with built-in methods to perform common operations.
          </div>

          <ul className="bullet-points">
            <li key="1" className="bullet-point">
              {CodeOutlinedIcon && <CodeOutlinedIcon className="bullet-icon" />}
              <span>Creating and initializing arrays</span>
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
              <span>Multi-dimensional arrays</span>
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

export default Arrays;
