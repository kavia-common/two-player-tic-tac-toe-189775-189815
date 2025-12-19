import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Helpers to evaluate win/draw and to generate labels.
 */
const WIN_LINES = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function isBoardFull(squares) {
  return squares.every((sq) => sq);
}

/**
 * Accessible label utility.
 * Example: "row 1 column 1", "row 3 column 2"
 */
function getCellPositionLabel(index) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return `row ${row} column ${col}`;
}

// PUBLIC_INTERFACE
function App() {
  /** Board is a 9-length array of 'X' | 'O' | null */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(
    () => !winnerInfo && isBoardFull(squares),
    [winnerInfo, squares]
  );

  const currentPlayer = xIsNext ? 'X' : 'O';
  const isGameOver = Boolean(winnerInfo) || isDraw;
  const winningLine = winnerInfo?.line ?? [];

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // Ignore clicks if occupied or game finished
    if (squares[index] || isGameOver) return;
    const next = squares.slice();
    next[index] = currentPlayer;
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const statusText = (() => {
    if (winnerInfo) return `Winner: ${winnerInfo.player}`;
    if (isDraw) return 'Draw!';
    return `Turn: Player ${currentPlayer}`;
  })();

  return (
    <div className="ttt-app">
      <main className="ttt-container">
        <header className="ttt-header" aria-live="polite" aria-atomic="true">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p
            className={`ttt-status ${winnerInfo ? 'status-win' : isDraw ? 'status-draw' : 'status-turn'}`}
            data-testid="status-text"
          >
            {statusText}
          </p>
        </header>

        <section className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
          {squares.map((value, idx) => {
            const isWinningSquare = winningLine.includes(idx);
            const label = `Square ${getCellPositionLabel(idx)}${value ? ` currently ${value}` : ' empty'}`;

            return (
              <button
                key={idx}
                role="gridcell"
                className={`ttt-square ${isWinningSquare ? 'win' : ''}`}
                onClick={() => handleSquareClick(idx)}
                aria-label={label}
                aria-disabled={isGameOver || Boolean(value)}
                disabled={isGameOver || Boolean(value)}
                data-index={idx}
              >
                <span className={`ttt-mark ${value ? 'visible' : ''}`}>
                  {value || ''}
                </span>
              </button>
            );
          })}
        </section>

        <footer className="ttt-footer">
          <button
            className="ttt-restart"
            onClick={handleRestart}
            aria-label="Restart Game"
          >
            Restart Game
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;
