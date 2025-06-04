import { useState } from 'react';

function Square({val, setSquares}) {
  return (
    <button className="square" onClick={setSquares}>
      {val}
      </button>
  );
}

function Board({turn, squares, play}) {

  function handleClick(n) {
    if (squares[n] || CalculateWin(squares)) return;
    const newSquares = squares.slice();
    newSquares[n] = turn ? 'X' : 'O';
    play(newSquares);
  }

  const winner = CalculateWin(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  }
  else {
    status = 'Next player: ' + (turn ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">
        {status}
      </div>
      <div className="board-row">
        <Square val={squares[1]} setSquares={()=>handleClick(1)}/>
        <Square val={squares[2]} setSquares={()=>handleClick(2)}/>
        <Square val={squares[3]} setSquares={()=>handleClick(3)}/>
      </div>
      <div className="board-row">
        <Square val={squares[4]} setSquares={()=>handleClick(4)}/>
        <Square val={squares[5]} setSquares={()=>handleClick(5)}/>
        <Square val={squares[6]} setSquares={()=>handleClick(6)}/>
      </div>
      <div className="board-row">
        <Square val={squares[7]} setSquares={()=>handleClick(7)}/>
        <Square val={squares[8]} setSquares={()=>handleClick(8)}/>
        <Square val={squares[9]} setSquares={()=>handleClick(9)}/>
      </div>
    </>
  );
}

function CalculateWin(squares) {
  const winlines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  for (let i = 0; i < winlines.length; i++) {
    const [a, b, c] = winlines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const turn = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let text = (move>0) ? 'Go to move #' + move : 'Go to start';
    return (
      <li key={move}> 
        <button onClick={() => jumpTo(move)}>
          {text}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board turn={turn} squares={currentSquares} play={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}