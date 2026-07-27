function btn_newGame(e) {
    const arrows = e.querySelector('.icon .arrows');
    if(arrows) {
        e.classList.add('spin-once');
        arrows.addEventListener('animationend', () => {
            e.classList.remove('spin-once');
        }, { once: true });
    }
    newGame();
}

function btn_togglePause(e) {
    Reactive.paused.value = !Reactive.paused.value;
}