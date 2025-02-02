import React from 'react';
import { GAME_CONSTANTS, COLORS } from '../TetrisGame/constants';
import './GameBoard.css';

const GameBoard = ({ grid }) => {
  return (
    <div className="game-board" style={{ width: GAME_CONSTANTS.WIDTH * GAME_CONSTANTS.BLOCK_SIZE, height: GAME_CONSTANTS.HEIGHT * GAME_CONSTANTS.BLOCK_SIZE }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row" style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="cell" style={{ width: GAME_CONSTANTS.BLOCK_SIZE, height: GAME_CONSTANTS.BLOCK_SIZE, backgroundColor: COLORS[cell] }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;