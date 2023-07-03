import { useState } from "react";
import "./App.css";

function Square({ square, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {square}
    </button>
  );
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [square, setSquares] = useState(Array(9).fill(null));

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (calculateWinner(square)) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext && nextSquares[i] === null) {
      nextSquares[i] = "X";
      setXIsNext(false);
    } else if (nextSquares[i] === null) {
      nextSquares[i] = "O";
      setXIsNext(true);
    }
    setSquares(nextSquares);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square square={square[0]} handleClick={() => handleClick(0)} />
        <Square square={square[1]} handleClick={() => handleClick(1)} />
        <Square square={square[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square square={square[3]} handleClick={() => handleClick(3)} />
        <Square square={square[4]} handleClick={() => handleClick(4)} />
        <Square square={square[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square square={square[6]} handleClick={() => handleClick(6)} />
        <Square square={square[7]} handleClick={() => handleClick(7)} />
        <Square square={square[8]} handleClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;
