const UI = {
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

function initializeUI_background() {
    const frag = document.createDocumentFragment();

    const bg = document.createElement('div');
    bg.id = 'background';

    console.group('addTile');
    const tiles = [];
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 4; x++) {
            let tile = initializeUI_backgroundTile({x,y});
            frag.appendChild(tile);

            const id = (y*4) + (x+0);
            const elem = tile;
            const row = elem.dataset.row;
            const column = elem.dataset.column;
            const obj = {id, elem, row, column};
            tiles.push(obj);
        }
    }
    console.groupEnd('addTile');

    bg.appendChild(frag);
    UI.board.elem.appendChild(bg);

    UI.board.bg.main.elem = bg;
    UI.board.bg.tile = tiles;
}

function initializeUI_backgroundTile(xy = {}) {
    const { x, y } = { x: 0, y: 0, ...xy};
    const id = (y*4) + (x+0);
    const tileBg = document.createElement('div');
    tileBg.classList.add('tile', 'bg', 'tile-bg');
    tileBg.id = `tile-bg-${id}`;
    tileBg.dataset.id = id;
    tileBg.dataset.column = x;
    tileBg.dataset.row = y;
    tileBg.dataset.value = 0;
    console.log({x,y,id});
    return tileBg;
}
function updateUI() {
    updateUI_head();
    updateUI_board();
}
function updateUI_head() {
    const scoreBox = document.querySelector('.field-value.score');
    const bestBox = document.querySelector('.field-value.best');
    console.log({
        score: GAME.score.now,
        best: GAME.score.best,
    });
    scoreBox.innerText = GAME.score.now;
    bestBox.innerText = GAME.score.best;
}
function updateUI_board() {
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 4; x++) {
            let val = BOARD[y][x];
            let id = (y*4) + x;
            let tile = UI.board.bg.tile[id];
            if(val > 0) {
                tile.elem.className = `tile tile-${val}`;
                tile.elem.dataset.value = val;
                tile.elem.textContent = val;

                if (GAME.specialTiles.new.some(t => t.row === y && t.col === x)) {
                    tile.elem.classList.add("new");
                    console.log('added flag: new');
                }

                // Animate merged tiles
                if (GAME.specialTiles.merged.some(t => t.value === val && t.row === y && t.col === x)) {
                    tile.elem.classList.add("merged");
                    console.log('added flag: merged');
                }
            }
            else if (val == 0 && tile.elem.dataset.value != '0') {
                tile.elem.className = `tile bg tile-bg`;
                tile.elem.dataset.value = 0;
                tile.elem.textContent = '';
            }
        }
    }
    GAME.specialTiles.new = [];
    GAME.specialTiles.merged = [];
}

initializeUI_background();

updateUI();