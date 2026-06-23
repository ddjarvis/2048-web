function getAction() {
    const queryString = window.location.search;
    // console.log(queryString);
    if(!queryString) return null;
    const params = new URLSearchParams(queryString);
    if(!params.size) return null;
    console.log(params);
    // console.log(params.size);
    let action;
    if (params.has('new')) action = params.get('action');
    if (params.has('new')) action = 'new';
    if (params.has('reset')) action = 'reset';
    console.log(params.get('new'));
    if(!action) return null;
    console.log(action);
    switch (action) {
        case 'new':
            newGame();
            break;
        case 'reset':
            deleteData();
            // nweGame();
            Reactive.best.value = 0;
            Reactive.score.value = 0;
            initializeBoard();
            addRandomTiles();
            // initializeGame();
            updateUI();
            break;
        default:
            break;
    }
    window.history.replaceState({}, document.title, window.location.pathname);
}
getAction();