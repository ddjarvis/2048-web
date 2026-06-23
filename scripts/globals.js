let BOARD = [];
const GAME = {
    state: {
        win: false,
        lose: false,
    },
    stats: {
        moves: 0,
        time: 0,
        score: 0,
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
    },
    game: document.getElementById('game'),
    head: {
        elem: document.getElementById('gameHeader'),
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