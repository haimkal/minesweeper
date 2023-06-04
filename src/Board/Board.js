import { useState } from 'react'
import { ENUM } from '../helper/helper'
import { runTurn } from '../helper/helper'
import './styles.css'
export default function Board({ board, uiBoard, noOfMinds }) {
    console.log('render')

    const [gameInstruction, setGameInstruction] = useState({ command: "Start" });
    //const [displayBoard, setDisplayBoard] = useState(uiBoard)

    const playTurn = (row, col) => {
        // debugger
        //console.log(board[row][col])
        return () => setGameInstruction(runTurn(row, col, noOfMinds, board, uiBoard))
    }
    /**
     * 
     * @param {*} row 
     * @param {*} col 
     * @returns {string}
     */
    const getContent = (row, col) => {

        if (uiBoard[row][col] === ENUM.UI.OPEN) {
            if (board[row][col] > 0) {
                return board[row][col] + ''
            }
        }
        return ''

    }

    const getClassName = (row, col) => {

        if (uiBoard[row][col] === ENUM.UI.CLOSE) return 'close'
        if (uiBoard[row][col] === ENUM.UI.OPEN) return 'open'
        if (uiBoard[row][col] === ENUM.UI.MIND) return 'mind'
        if (uiBoard[row][col] === ENUM.UI.BOOM) return 'boom'
    }
    const allowNextMove = !(gameInstruction.command === ENUM.GAME.LOST || gameInstruction.command === ENUM.GAME.WON)
    console.log('allow next move: ', allowNextMove)
    return (
        <div className="board">{uiBoard.map((row, rowIndex) =>
            row.map((col, colIndex) => (

                <div key={`${rowIndex},${colIndex}`} className={'cube ' + getClassName(rowIndex, colIndex)} onClick={!allowNextMove ? null : playTurn(rowIndex, colIndex)}  >
                    {getContent(rowIndex, colIndex)}
                </div>
            )))}
            <div>{gameInstruction.command}</div>
        </div>
    )
}
