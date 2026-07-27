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
            newGame();
            break;
        default:
            break;
    }
    console.log(`Action: ${action}`);
    if (hasChange) {
        addRandomTile();
        increaseMove();
        checkLose();
        saveData();
        updateUI();
    }
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