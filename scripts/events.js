
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
    Reactive.moves.value = 0;
    Reactive.win.value = false;
    Reactive.lose.value = false;
    Reactive.paused.value = false;
    GAME.specialTiles.merged = [];
    GAME.specialTiles.new = [];
    document.querySelector('#stateArea').dataset.active = 'false';
}
function newGame() {
    newSession();
    clearTimer();
    addRandomTiles();
    saveData();
    updateUI();
    startTimer();
}

function winState() {
    document.querySelector('#stateArea').dataset.active = 'true';
    document.querySelector('.gameStatus').innerText = 'You Win!';
    hist_saveEntry();
    console.log('You Win!');
}
function loseState() {
    document.querySelector('#stateArea').dataset.active = 'true';
    document.querySelector('.gameStatus').innerText = 'You Lose!';
    hist_saveEntry();
    console.log('You Lose!');
}
function resetState() {
    document.querySelector('#stateArea').dataset.active = 'false';
    document.querySelector('.gameStatus').innerText = '';
}

function pauseGame() {
    pauseTimer();
    document.querySelector('#stateArea').dataset.active = 'true';
    document.querySelector('.gameStatus').innerText = 'Game Paused';
    console.log('Game Paused');
}
function resumeGame() {
    resetState();
    resumeTimer();
}


function isMobile() {
  // Checks for common mobile keywords in the User-Agent string
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function autoPause() {
    const gameElem = document.getElementById('game');
    const allowAutoPause = gameElem?.dataset?.autopause === 'true';
    if(allowAutoPause) {
        const isPaused = GAME.state.paused;
        Reactive.paused.value = true;
    }
}
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App is backgrounded or tab is hidden (VisibilityChange API)');
        autoPause();
    }
});
/* iOS Fallback */
window.addEventListener('pagehide', (event) => {
        console.log('App is backgrounded or tab is hidden (PageHide API)');
        autoPause();
});
window.addEventListener('blur', () => {
    // Ignore the event if on mobile
    if (isMobile()) {
    return; 
    }

    // This will ONLY run on desktop
    // console.log('Desktop window lost focus!');
    autoPause();
    // Pause your game, stop timers, etc.
});


/*
=============================================================
                        TEST FUNCTIONS
=============================================================
*/
function showAllTiles() {
    const vals = [];
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
