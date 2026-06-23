function saveData() {
    const getDateTime = () => {
        const d = new Date();
        const date = [
            d.getFullYear(),
            ('0' + (d.getMonth() + 1)).slice(-2),
            ('0' + d.getDate()).slice(-2),
        ].join('-');
        const time = [
            ('0' + d.getHours()).slice(-2),
            ('0' + d.getMinutes()).slice(-2),
            ('0' + d.getSeconds()).slice(-2),
        ].join(':');
        return `${date} ${time}`;
    };
    const saveData = {
        board: BOARD,
        data: {
            score: Reactive.score.value,
            best: Reactive.best.value,
            moves: Reactive.moves.value,
            time: Reactive.time.value,
            win: Reactive.win.value,
            lose: Reactive.lose.value,
        },
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
    
    const {board, data, timestamp} = JSON.parse(json);
    // console.log(data);
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

    BOARD = board;
    console.log('loaded data!');
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