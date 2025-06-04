import { useState } from 'react';

function Square({val, setSquares}) {

  return (
    <button className="square" onClick={setSquares}>
      {val}
      </button>
  );
}

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);

  function handleClick(n) {
    if (squares[n] || CalculateWin(squares)) return;
    const newSquares = squares.slice();
    newSquares[n] = turn ? 'X' : 'O';
    setTurn(!turn);
    setSquares(newSquares);
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
      <button className="reset"
        onClick={() => {setSquares(Array(9).fill(null)) 
        setTurn(true)}}>
        Reset 
      </button>
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
