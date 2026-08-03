function hist_saveEntry() {
    const sessionData = {
        moves: GAME.stats.moves,
        score: GAME.stats.score,
        time: GAME.stats.time.str,
        state: GAME.state.value,
        datetime: getDateTime(),
    };
    HISTORY.push(sessionData);
    saveData();
}
function hist_deleteEntry(idx) {
    const data = {...HISTORY[idx]};
    if(!data) {
        console.error(`hist_deleteEntry: invalid index = ${idx}`);
        return;
    }
    HISTORY.splice(idx,1);
    console.log(`Deleted HISTORY[${idx}]: `, data);
    saveData();
}