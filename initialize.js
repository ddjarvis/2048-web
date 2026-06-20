let BOARD;
const GAME = {
    state: {
        win: false,
        lose: false,
    },
    score: {
        now: 0,
        best: 0,
    },

    specialTiles: {
        merged: [],
        new: [],
    },
}
function initializeBoard() {
    BOARD = Array.from({ length: 4 }, () => Array(4).fill(0));
}

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (BOARD[i][j] === 0) {
                emptyCells.push([i, j]);
            }  
        }
    }
    return emptyCells;
}

function addRandomTile() {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const val = Math.random() < 0.8 ? 2 : 4;
        BOARD[i][j] = val;
        GAME.specialTiles.new.push({value: val, row: i, col: j});
    }
}

function addRandomTiles() {
    const emptyCells = getEmptyCells();
    let countThreshold = 0.1 + (emptyCells.length / 16) * 0.4;
    let count = Math.min(emptyCells.length,Math.random() < countThreshold ? 1 : 2);
    console.log({count})
    for(let i = 0; i < count; i++) {
        addRandomTile();
    }
}

function checkLose() {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) { return false; }

    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 3; y++) {
            if(BOARD[x][y] === BOARD[x][y+1]) { return false; }
        }
    }
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 3; x++) {
            if(BOARD[x][y] === BOARD[x+1][y]) { return false; }
        }
    }
    GAME.state.lose = true;
    return true;
}

function drawConsole() {
    console.table(BOARD);
    console.log(`Score: ${GAME.score.now}`);
    if(GAME.state.win) { console.log('You Win!'); }
    else if(GAME.state.lose) { console.log('You Lose!'); }
}
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

function initializeGame() {
    BOARD = Array.from({ length: 4 }, () => Array(4).fill(0));
    GAME.score.now = 0;
    GAME.state.win = false;
    GAME.state.lose = false;
    GAME.specialTiles.merged = [];
    GAME.specialTiles.new = [];
    addRandomTiles(BOARD);
}

initializeGame();
/*
BOARD = [
    [2, 4, 16, 128],
    [0, 4, 2, 8],
    [2, 16, 32, 64],
    [32, 2, 64, 32],
]
*/
drawConsole();