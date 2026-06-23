
function addScore(add) {
    const score = Reactive.score;
    score.value = score.value + add;
}

function increaseMove() {
    const moves = Reactive.moves;
    moves.value = moves.value + 1;
}

