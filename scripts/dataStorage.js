function saveData() {
    const saveData = {
        history: HISTORY,
        board: BOARD,
        data: {
            score: Reactive.score.value,
            best: Reactive.best.value,
            moves: Reactive.moves.value,
            time: Reactive.time.value,
            timer: Reactive.timer.value,
            win: Reactive.win.value,
            lose: Reactive.lose.value,
            paused: Reactive.paused.value,
        },
        timer: GAME.timer,
        timestamp: getDateTime(),
    };
    //console.log(JSON.stringify(saveData));
    localStorage.setItem('saveData',JSON.stringify(saveData));
    // console.log('saved game!');
}
function loadData() {
    const json = localStorage.getItem('saveData');    
    // console.log(json);
    if (!json) {
        console.error('loadData failed: no/invalid json');
        return false;
    }
    
    const {history, board, data, timer, timestamp} = JSON.parse(json);
    console.log(board);
    console.log(data);
    console.log(timer);
    console.log(timestamp);
    HISTORY = history;
    if (!data.best) {
        console.error('loadData stopped: no recorded best '+`(best: ${data.best})`);
        return false;
    }
    Reactive.best.value = data.best;

    if (data.win || data.lose) {
        console.error('loadData stopped: game is at win/lose state');
        return false;
    }
    if (data.moves === 0) {
        console.error('loadData stopped: no recorded moves');
        return false;
    }
    Reactive.score.value = data.score;
    Reactive.moves.value = data.moves;
    Reactive.time.value = data.time;
    Reactive.timer.value = data.timer || '00:00';
    Reactive.paused.value = data.paused || (data.moves > 0 ? true : false);

    BOARD = board;
    GAME.board = board;
    GAME.timer = {...timer, isRunning: data.paused};
    console.log('loaded data!');
    saveData();
    return true;
}
function deleteData() {
    // const del = window.confirm('Delete localStorage[saveData]?');
    // if (del) {
    //     localStorage.removeItem('saveData');
    //     alert('Deleted localstorage[saveData]');
    // }
    // else {
    //     alert('Date localstorage[saveData] not deleted.');
    // }
    localStorage.removeItem('saveData');
}