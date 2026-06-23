
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
    let isLost = true;
    console.group('checkLose');
    for(let x = 0; x < 4; x++) {
        if(!isLost) { break; }
        console.log(`x: ${x}`);
        for(let y = 0; y < 3; y++) {
            if(!isLost) { break; }
            let valA = BOARD[x][y];
            let valB = BOARD[x][y+1];
            console.log(`BOARD[${x}][${y}] = ${valA}\nBOARD[${x}][${y+1}] = ${valB}`);
            if(valA === valB) { isLost = false; }
        }
    }
    for(let y = 0; y < 4; y++) {
        if(!isLost) { break; }
        for(let x = 0; x < 3; x++) {
            if(!isLost) { break; }
            let valA = BOARD[x][y];
            let valB = BOARD[x+1][y];
            console.log(`BOARD[${x}][${y}] = ${valA}\nBOARD[${x+1}][${y}] = ${valB}`);
            if(valA === valB) { isLost = false; }
        }
    }
    console.groupEnd('checkLose');
    !isLost ? console.log('Not Lost!') : '';

    if(isLost) {
        const emptyCells = getEmptyCells();
        if (emptyCells.length > 0) { isLost = false; }
    }
    
    GAME.state.lose = isLost;
    isLost ? console.log('You Lose!') : '';
    return true;
}

function drawConsole() {
    console.table(BOARD);
    console.log(`Score: ${GAME.stats.score}`);
    if(GAME.state.win) { console.log('You Win!'); }
    else if(GAME.state.lose) { console.log('You Lose!'); }
}

function deepEqual(a, b) {
  if (a === b) return true; // handles primitives + same reference
  if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEqual(a[key], b[key]));
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => deepEqual(val, b[i]));
}


function initializeGame() {
    BOARD = Array.from({ length: 4 }, () => Array(4).fill(0));
    Reactive.moves.value = 0;
    Reactive.score.value = 0;
    Reactive.time.value = 0;
    Reactive.win.value = false;
    Reactive.lose.value = false;
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