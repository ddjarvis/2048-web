/*
=-=-= Key Listeners =-=-=
*/

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            action('up');
            break;
        case 'ArrowDown':
        case 'KeyS':
            action('down');
            break;
        case 'ArrowLeft':
        case 'KeyA':
            action('left');
            break;
        case 'ArrowRight':
        case 'KeyD':
            action('right');
            break;
        case 'KeyR':
            action('reset');
            break;
        default:
            console.log(`Key: ${event.code}`);
            break
    }
    event.preventDefault(); // stops page scrolling
});


let startX, startY;
const threshold = 50; // minimum swipe distance
document.addEventListener('touchstart', (e) => {
startX = e.touches[0].clientX;
startY = e.touches[0].clientY;
e.preventDefault(); // stops page scrolling
},{ passive: false });

document.addEventListener('touchend', (e) => {
    e.preventDefault(); // stops page scrolling
const endX = e.changedTouches[0].clientX;
const endY = e.changedTouches[0].clientY;

const diffX = startX - endX;
const diffY = startY - endY;

if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
    if (diffX > threshold) action('left');
    else if (diffX < -threshold) action('right');
} else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
    if (diffY > threshold) action('up');
    else if (diffY < -threshold) action('down');
}
},{ passive: false });


function action(direction) {
    if ((direction !== 'reset') && (GAME.state.win || GAME.state.lose)) {
        return;
    }
    let action = '';
    let hasChange = false;
    switch (direction.toLowerCase()) {
        case 'up':
            action = 'up';
            hasChange = action_up();
            break;
        case 'down':
            action = 'down';
            hasChange = action_down();
            break;
        case 'left':
            action = 'left';
            hasChange = action_left();
            break;
        case 'right':
            action = 'right';
            hasChange = action_right();
            break;
        case 'reset':
            initializeGame();
            break;
        default:
            break;
    }
    console.log(`Action: ${action}`);
    if (hasChange) { addRandomTile(); }
    checkLose();
    updateUI();
}

function action_left() {
    let hasChange = false;
    for (let y = 0; y <= 3; y++) {
       let arr = [];
       let newArr = [];

        for (let x = 0; x <= 3; x++) {
            arr.push(BOARD[y][x]);
        }

        newArr = arrayProcess(arr, {x: null, y});
        if (!arraysEqual(arr, newArr) ) { hasChange = true; }
        
        for (let x = 0; x <= 3; x++) {
            let i = x;
            BOARD[y][x] = newArr[i];
        }
    }
    return hasChange;
}
function action_right() {
    let hasChange = false;
    for (let y = 0; y <= 3; y++) {
       let arr = [];
       let newArr = [];

        for (let x = 3; x >= 0; x--) {
            arr.push(BOARD[y][x]);
        }

        newArr = arrayProcess(arr, {x: null, y, rev: true});
        if (!arraysEqual(arr, newArr) ) { hasChange = true; }
        
        for (let x = 3; x >= 0; x--) {
            let i = 3-x;
            BOARD[y][x] = newArr[i];
        }
        console.log({arr,newArr});
    }
    return hasChange;
}
function action_up() {
    let hasChange = false;
    for (let x = 0; x <= 3; x++) {
       let arr = [];
       let newArr = [];

        for (let y = 0; y <= 3; y++) {
            arr.push(BOARD[y][x]);
        }

        newArr = arrayProcess(arr, {x, y: null});
        if (!arraysEqual(arr, newArr) ) { hasChange = true; }
        
        for (let y = 0; y <= 3; y++) {
            let i = y;
            BOARD[y][x] = newArr[i];
        }
    }
    return hasChange;
}
function action_down() {
    let hasChange = false;
    for (let x = 0; x <= 3; x++) {
       let arr = [];
       let newArr = [];

        for (let y = 3; y >= 0; y--) {
            arr.push(BOARD[y][x]);
        }

        newArr = arrayProcess(arr, {x, y: null, rev: true});
        if (!arraysEqual(arr, newArr) ) { hasChange = true; }
        
        for (let y = 3; y >= 0; y--) {
            let i = 3-y;
            BOARD[y][x] = newArr[i];
        }
        //console.log({arr,newArr});
    }
    return hasChange;
}

function arrayCompress(arr, xyr = {}) {
    const { x, y, rev } = { rev: false, ...xyr};
    const newArr = [
        ...arr.filter(i => i > 0),
        ...Array(4).fill(0)
    ].slice(0, 4);
    console.log(arr);
    console.log(newArr);
    if (!arraysEqual(arr,newArr)) {
        let i;
        let row, col, direction;
        if(x === null) {
            row = y;
            col = rev ? 3-i : i;
            direction = !rev ? 'left' : 'right';
        }
        else if(y === null) {
            col = x;
            row = rev ? 3-i : i;
            direction = !rev ? 'up' : 'down';
        }
        console.log(`direction: ${direction}`);
    }
    return newArr;
}
function arrayMerge(arr, xyr = {}) {
    const { x, y, rev } = { rev: false, ...xyr};
    let newArr = [...arr];
    for (let i = 0; i < (newArr.length-1); i++) {
        if (newArr[i] > 0 && newArr[i] === newArr[i+1]) {
            let val = newArr[i] * 2;
            newArr[i] = val;
            newArr[i+1] = 0;
            
            GAME.score.now += val;
            GAME.score.best = Math.max(GAME.score.now, GAME.score.best);

            let row, col;
            if(x === null) {
                row = y;
                col = rev ? 3-i : i;
            }
            else if(y === null) {
                col = x;
                row = rev ? 3-i : i;
            }
            GAME.specialTiles.merged.push({value: val, row, col});
            
            if(newArr[i] === 2048) { GAME.state.win = true; }
        }
    }
    return newArr;
}
function arrayProcess(arr, xyr = {}) {
    const { x, y, rev } = { x: 0, y: 0, rev: false, ...xyr};
    let newArr = [...arr];
    newArr = arrayCompress(newArr, {x,y,rev});
    newArr = arrayMerge(newArr, {x,y,rev});
    newArr = arrayCompress(newArr);
    //console.log({x,y});
    return newArr;
}
