

function increaseMove() {
    const moves = Reactive.moves.get();
    Reactive.moves.set(moves + 1);
}