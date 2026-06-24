
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
