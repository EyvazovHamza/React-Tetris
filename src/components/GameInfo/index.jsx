import React from 'react';
import './GameInfo.css';

const GameInfo = ({ score, level }) => {
  return (
    <div className="game-info">
      <h2>Score: {score}</h2>
      <h2>Level: {level}</h2>
    </div>
  );
};

export default GameInfo;