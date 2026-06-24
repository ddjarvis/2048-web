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
            
            // GAME.stats.score += val;
            // UI.data.scores.current = GAME.stats.score;
            // if (UI.data.scores.current > UI.data.scores.best) {
            //     UI.data.scores.best = UI.data.scores.current;
            // }
            addScore(val);

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
