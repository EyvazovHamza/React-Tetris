// src/components/TetrisGame/TetrisGame.jsx
import React, { useState, useEffect } from 'react';
import { useGameLogic } from './useGameLogic';
import GameBoard from '../GameBoard';
import GameInfo from '../GameInfo';
import Header from '../Header';
import Modal from '../Modal/Modal';
import './TetrisGame.css';

const TetrisGame = () => {
  const { grid, score, level, gameOver } = useGameLogic();
  const [showModal, setShowModal] = useState(false);

  const handleRestart = () => {
    console.log("Restart button clicked"); // Debugging log
    window.location.reload(); // Refresh the page to restart the game
  };

  useEffect(() => {
    if (gameOver) {
      console.log("Game Over triggered"); // Debugging log
      setShowModal(true);
    }
  }, [gameOver]);

  return (
    <div className="tetris-game">
      <Header />
      <div className="game-container">
        <GameBoard grid={grid} />
        <GameInfo score={score} level={level} />
      </div>
      <Modal show={showModal} onClose={handleRestart}>
        <h2>Game Over</h2>
      </Modal>
    </div>
  );
};

export default TetrisGame;