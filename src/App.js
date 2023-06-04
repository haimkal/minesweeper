import logo from './logo.svg';
import './App.css';
import Board from './Board/Board';
import { createBlankBoard, createMinds, setHowManyTouchingMinds } from './helper/helper.js'
import { useState } from 'react';

const noOfMinds = 5

const createBoardGame = () => {
  const board = createBlankBoard(5, 5)
  createMinds(board, noOfMinds)
  setHowManyTouchingMinds(board)
  return board
}

function App() {

  const [board, setBoard] = useState(createBoardGame())
  const [uiBoard, setUiBoard] = useState(createBlankBoard(5, 5))
  return (
    <div className="App">
      <Board board={board} uiBoard={uiBoard} noOfMinds={noOfMinds} />
    </div>
  );
}

export default App;
