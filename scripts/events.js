
function addScore(add) {
    const score = Reactive.score.get();
    Reactive.score.set(score + add);
}

function increaseMove() {
    const moves = Reactive.moves.get();
    Reactive.moves.set(moves + 1);
}

