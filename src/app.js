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
    winner === 'draw' ? status = 'Draw!' : status = 'Winner: ' + winner;
  }
  else {
    status = 'Next Move: ' + (turn ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">
        {status}
      </div>
      <div className="board-row">
        <Square val={squares[0]} setSquares={()=>handleClick(0)}/>
        <Square val={squares[1]} setSquares={()=>handleClick(1)}/>
        <Square val={squares[2]} setSquares={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square val={squares[3]} setSquares={()=>handleClick(3)}/>
        <Square val={squares[4]} setSquares={()=>handleClick(4)}/>
        <Square val={squares[5]} setSquares={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square val={squares[6]} setSquares={()=>handleClick(6)}/>
        <Square val={squares[7]} setSquares={()=>handleClick(7)}/>
        <Square val={squares[8]} setSquares={()=>handleClick(8)}/>
      </div>
    </>
  );
}

function CalculateWin(squares) {
  const winlines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winlines.length; i++) {
    const [a, b, c] = winlines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
     }
  }
  for (let i = 0; i < 9; i++) {
    if(!squares[i]) {
      return null
    }
  }
  return('draw');
}


export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const turn = currentMove % 2 === 0;
  const [speak, setSpeak] = useState('');

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function Speak(text) {
    setSpeak(text);
    setTimeout(setSpeak, 2000, '');
  }

  return (
    <>
      <div>
        <div className="game-board">
          <Board turn={turn} squares={currentSquares} play={handlePlay}/>
        </div>
        <div className="bot">
          <Bot currentSquares={currentSquares} CalculateWin={CalculateWin} 
          currrentMove={currentMove} turn={turn} handlePlay={handlePlay} Speak={Speak}/>
        </div>
      </div>
      <div className="game-info">
        <button className="Undo" onClick={() => jumpTo(currentMove - 1)} disabled={currentMove === 0}>
          Undo
        </button>
        <button className="Reset" onClick={() => jumpTo(0)}>
          Reset
        </button>
      </div>
      {speak}
    </>
  );
}

function Bot({currentSquares, CalculateWin, currentMove, turn, handlePlay, Speak}) {

  const [botMove, setBotMove] = useState(false);
  const [closeCall, setCloseCall] = useState(false);

  if (botMove === turn) {
    setTimeout(MakeMove, 500);
  }

  function MakeMove() {
    if (CalculateWin(currentSquares)) return;
    const nextMove = BestMove(currentSquares, turn ? 'X' : 'O');
    if (nextMove) {
      handlePlay(nextMove);
    }
    if(CalculateWin(nextMove)) {
      setCloseCall(true);
    }
  }

  function BestMove(board, xo) {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = xo;
        const score = BestScore(newBoard, false, xo);
        if (score > bestScore) {
          bestScore = score;
          move = newBoard;
        }
      }
    }
    return move;
  }

  function BestScore(board, botTurn, xoBot) {
    const winner = CalculateWin(board);
    if (winner) {
      if (winner === xoBot) return 10;
      if (winner === 'draw') return 0;
      return -10;
    }

    const nextPlayer = botTurn ? xoBot : (xoBot === 'X' ? 'O' : 'X');
    let bestScore = botTurn ? -Infinity : Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = nextPlayer;
        const score = BestScore(newBoard, !botTurn, xoBot);
        if (botTurn) {
          bestScore = Math.max(score, bestScore);
        } else {
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }

  return (
    <>
    <button onClick={() => setBotMove(false)} className={!botMove ? "active" : ""}>
      O
    </button>
    <button onClick={() => setBotMove(true)} className={botMove ? "active" : ""}>
      X
    </button>
    </>
  );
}
