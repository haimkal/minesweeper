
// const board = createBlankBoard(width, height)
// createMinds(board, 4)
// setHowManyTouchingMinds(board)

export const ENUM = {
    GAME: {
        LOST: 'lost',
        CONTINUE: 'continue',
        WON: 'won',
    },
    UI: {
        CLOSE: 0,
        OPEN: 1,
        MIND: 2,
        BOOM: 3
    }
}

export const createBlankBoard = (width, height) => {
    const board = []
    for (let x = 0; x < height; x++) {
        board.push(new Array(width).fill(ENUM.UI.CLOSE))
    }
    return board
}
export const createMinds = (board, amount) => { //check amount vs total slots

    let rows = board.length
    let cols = board[0].length
    if (amount > rows * cols) return;
    let mindsCount = 0

    while (mindsCount !== amount) {
        const newRow = Math.floor(Math.random() * rows)
        const newCol = Math.floor(Math.random() * cols)

        if (board[newRow][newCol] !== -1) {
            board[newRow][newCol] = -1
            mindsCount++
        }
        // אם מביאים מספר מוקשים שיותר גדול מהלוח- לולאה אינסופית
    }
}

export const addOne = (board, row, col) => {
    if (row < 0 || row > board.length - 1) return
    if (col < 0 || col > board[0].length - 1) return
    if (board[row][col] === -1) return;
    board[row][col]++
}

export const setHowManyTouchingMinds = (board) => {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] === -1) {
                addOne(board, row - 1, col - 1);
                addOne(board, row - 1, col);
                addOne(board, row - 1, col + 1);
                addOne(board, row, col - 1);
                //
                addOne(board, row, col + 1);
                addOne(board, row + 1, col - 1);
                addOne(board, row + 1, col);
                addOne(board, row + 1, col + 1);
            }
        }

    }
}

export const openCube = (row, col, board, uiBoard) => {
    // debugger
    // const close = 0;
    // const boom = 2;
    // const open = 1;
    // const mind = 3;

    if (row < 0 || row > board.length - 1) return
    if (col < 0 || col > board[0].length - 1) return

    if (uiBoard[row][col] === ENUM.UI.OPEN) return
    uiBoard[row][col] = ENUM.UI.OPEN

    if (board[row][col] === 0) {
        openCube(row - 1, col - 1, board, uiBoard)
        openCube(row - 1, col, board, uiBoard)
        openCube(row - 1, col + 1, board, uiBoard)
        openCube(row, col - 1, board, uiBoard)
        openCube(row, col + 1, board, uiBoard)
        openCube(row + 1, col - 1, board, uiBoard)
        openCube(row + 1, col, board, uiBoard)
        openCube(row + 1, col + 1, board, uiBoard)
    }

}

export const isWon = (uiBoard, noOfMinds) => {
    // debugger
    let countOpen = 0;
    for (let row = 0; row < uiBoard.length; row++) {
        for (let col = 0; col < uiBoard[0].length; col++) {
            if (uiBoard[col][row] === 1) {
                countOpen++;
            }
        }
        if (countOpen === (uiBoard.length * uiBoard[0].length) - noOfMinds) {
            return true;
        }
    }
}






export const runTurn = (row, col, noOfMinds, board, uiBoard) => {
    // debugger;
    if (board[row][col] === -1) {

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (board[row][col] === -1) {
                    uiBoard[row][col] = 1
                }
            }

        }
        uiBoard[row][col] = ENUM.UI.MIND //red
        return { command: ENUM.GAME.LOST }
    }
    openCube(row, col, board, uiBoard)
    if (!isWon(uiBoard, noOfMinds)) return { command: ENUM.GAME.CONTINUE } //to fix it to more efficeient and make one function of the loop insode loop
    return { command: ENUM.GAME.WON }
}


