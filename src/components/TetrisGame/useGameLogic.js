import { useState, useEffect, useCallback } from 'react';
import { TETROMINO_SHAPES, GAME_CONSTANTS } from './constants';

const SHAPES_ARRAY = Object.values(TETROMINO_SHAPES);

export const useGameLogic = () => {
  const [grid, setGrid] = useState(() => 
    Array(GAME_CONSTANTS.HEIGHT).fill().map(() => Array(GAME_CONSTANTS.WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const checkCollision = (piece, pos) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (
            newX < 0 || 
            newX >= GAME_CONSTANTS.WIDTH ||
            newY >= GAME_CONSTANTS.HEIGHT ||
            (newY >= 0 && grid[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = (piece, pos) => {
    const newGrid = grid.map(row => row.slice());
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          newGrid[pos.y + y][pos.x + x] = piece[y][x];
        }
      }
    }
    return newGrid;
  };

  const clearLines = (grid) => {
    const newGrid = grid.filter(row => row.some(cell => cell === 0));
    const linesCleared = GAME_CONSTANTS.HEIGHT - newGrid.length;
    const newScore = score + linesCleared * 100;
    setScore(newScore);
    if (linesCleared > 0) {
      setLevel(Math.floor(newScore / 1000) + 1); // Increase level every 1000 points
    }
    return [...Array(linesCleared).fill().map(() => Array(GAME_CONSTANTS.WIDTH).fill(0)), ...newGrid];
  };

  const spawnPiece = useCallback(() => {
    const newPiece = SHAPES_ARRAY[Math.floor(Math.random() * SHAPES_ARRAY.length)];
    const startPosition = { x: Math.floor(GAME_CONSTANTS.WIDTH / 2) - Math.floor(newPiece[0].length / 2), y: 0 };
    if (checkCollision(newPiece, startPosition)) {
      setGameOver(true);
    } else {
      setCurrentPiece(newPiece);
      setPosition(startPosition);
    }
  }, [grid]);

  const movePiece = (dx, dy) => {
    const newPos = { x: position.x + dx, y: position.y + dy };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    } else if (dy > 0) {
      const newGrid = mergePiece(currentPiece, position);
      setGrid(clearLines(newGrid));
      spawnPiece();
    }
  };

  const rotatePiece = () => {
    const rotatedPiece = currentPiece[0].map((_, index) => currentPiece.map(row => row[index]).reverse());
    if (!checkCollision(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    }
  };

  const renderGridWithPiece = (grid, piece, pos) => {
    if (!piece) return grid; // Ensure piece is not null
    const gridCopy = grid.map(row => row.slice());
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          gridCopy[pos.y + y][pos.x + x] = piece[y][x];
        }
      }
    }
    return gridCopy;
  };

  const resetGame = () => {
    setGrid(Array(GAME_CONSTANTS.HEIGHT).fill().map(() => Array(GAME_CONSTANTS.WIDTH).fill(0)));
    setScore(0);
    setLevel(1);
    setGameOver(false);
    spawnPiece();
  };

  useEffect(() => {
    if (!gameOver) {
      spawnPiece();
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return; // Stop the game loop if game is over

    const handleKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault(); // Prevent default scrolling behavior
      }
      if (event.key === 'ArrowLeft') movePiece(-1, 0);
      if (event.key === 'ArrowRight') movePiece(1, 0);
      if (event.key === 'ArrowDown') movePiece(0, 1);
      if (event.key === 'ArrowUp') rotatePiece();
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, Math.max(1000 / level, 100)); // Decrease interval time as level increases, with a minimum of 100ms

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [currentPiece, position, level, gameOver]);

  return {
    grid: renderGridWithPiece(grid, currentPiece, position),
    currentPiece,
    position,
    score,
    level,
    gameOver,
    movePiece,
    rotatePiece,
    resetGame, // Add resetGame to the return object
  };
};