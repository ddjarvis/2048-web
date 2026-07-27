let BOARD = [];
const GAME = {
    state: {
        win: false,
        lose: false,
        paused: false,
    },
    stats: {
        moves: 0,
        time: {
            int: 0,
            str: '00:00',
        },
        score: 0,
    },
    timer: {
        elapsedMs: 0,
        lastTimestamp: null,
        timeoutId: null,
        isRunning: false,
    },
    specialTiles: {
        merged: [],
        new: [],
        moved: [],
    },
}
GAME.board = BOARD;
const UI = {
    data: {
        scores: {
            current: 0,
            best: 0,
        },
        moves: 0,
        timer: '00:00',
    },
    game: document.getElementById('game'),
    head: {
        elem: document.getElementById('statsArea'),
    },
    board: {
        elem: document.getElementById('gameBoard'),
        bg: {
            main: {
            },
            tile: [],
        },
    },
}
