function tick() {
    if (!GAME.timer.isRunning) {
        return;
    }

    const now = Date.now();
    if (GAME.timer.lastTimestamp) {
        GAME.timer.elapsedMs += now - GAME.timer.lastTimestamp;
    }
    GAME.timer.lastTimestamp = now;

    const elapsed = Math.floor(GAME.timer.elapsedMs / 1000);
    GAME.stats.time.int = elapsed;
    Reactive.time.value = elapsed;

    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeText = `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;

    const nextTick = 1000 - (now % 1000);
    GAME.timer.timeoutId = setTimeout(tick, nextTick);
}

function startTimer() {
    if (GAME.timer.isRunning) {
        console.log('Resuming Timer');
        return;
    }
    console.log('Starting Timer');
    GAME.timer.isRunning = true;
    GAME.timer.lastTimestamp = Date.now();
    tick();
}

function resumeTimer() {
    console.log('Resuming Timer');
    GAME.timer.isRunning = true;
    GAME.timer.lastTimestamp = Date.now();
    tick();
}
function pauseTimer() {
    console.log('Pausing Timer');
    GAME.timer.isRunning = false;
}

function stopTimer() {
    if (!GAME.timer.isRunning) {
        return;
    }

    GAME.timer.isRunning = false;
    if (GAME.timer.timeoutId) {
        clearTimeout(GAME.timer.timeoutId);
        GAME.timer.timeoutId = null;
    }
    GAME.timer.lastTimestamp = null;
}

function clearTimer() {
    stopTimer();
    GAME.timer.elapsedMs = 0;
    GAME.timer.lastTimestamp = null;
    GAME.stats.time.int = 0;
    Reactive.time.value = 0;
}