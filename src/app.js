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
    const newSquares = squares.slice();
    newSquares[n] = turn ? 'X' : 'O';
    setTurn(!turn);
    setSquares(newSquares);
  }

  return (
    <>
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
