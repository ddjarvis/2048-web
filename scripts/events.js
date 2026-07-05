
function addScore(add) {
    const score = Reactive.score;
    score.value = score.value + add;
}

function increaseMove() {
    const moves = Reactive.moves;
    moves.value = moves.value + 1;
}

function newSession() {
    BOARD = Array.from({ length: 4 }, () => Array(4).fill(0));
    Reactive.moves.value = 0;
    Reactive.score.value = 0;
    Reactive.time.value = 0;
    Reactive.win.value = false;
    Reactive.lose.value = false;
    GAME.specialTiles.merged = [];
    GAME.specialTiles.new = [];
}
function newGame() {
    newSession();
    addRandomTiles();
    saveData();
    updateUI();
}

function winState() {
    document.querySelector('.gameStatus').innerText = 'You Win!';
    console.log('You Win!');
}
function loseState() {
    document.querySelector('.gameStatus').innerText = 'You Lose!';
    console.log('You Lose!');
}
function resetState() {
    document.querySelector('.gameStatus').innerText = '';
}




/*
=============================================================
                        TEST FUNCTIONS
=============================================================
*/
function showAllTiles() {
    const vals = [
        2, 2, 4, 4,
        8, 16, 32, 64,
        128, 0, 512, 0,
        1024, 0, 0, 1024,
    ];
    const tiles = [];

    for (let i = 0; i < vals.length; i++) {
        let col = i % 4;
        let row = (i - col) / 4;
        let val = vals[i];
        BOARD[row][col] = val;
        const obj = {
            id: i,
            row,
            column: col,
            value: val,
        };
        tiles.push(obj);
    }

    console.table(tiles);
    updateUI();
}
