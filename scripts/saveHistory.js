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
