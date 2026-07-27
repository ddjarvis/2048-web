const Reactive = {
  score: reactiveValue(0),
  best: reactiveValue(0),
  moves: reactiveValue(0),
  time: reactiveValue(0),
  win: reactiveValue(false),
  lose: reactiveValue(false),
  paused: reactiveValue(false),
  time: reactiveValue(0),
  timer: reactiveValue('00:00'),
};

bindReactiveElements(Reactive);

Reactive.score.subscribe(() => {
  const val = Reactive.score.value;
  const best = Reactive.best.value;
  console.log('updated score: '+val);
  GAME.stats.score = val;
  UI.data.scores.current = val;

  if (val > best) {
    Reactive.best.value = val;
  }
});
Reactive.best.subscribe(() => {
  const val = Reactive.best.value;
  UI.data.scores.best = val;
});
Reactive.moves.subscribe(() => {
  const val = Reactive.moves.value;
  GAME.stats.moves = val;
  UI.data.moves = val;
});
Reactive.time.subscribe(() => {
  const val = Reactive.time.value;
  GAME.stats.time.int = val;

  let mins = Math.floor(val / 60);
  let secs = val % 60;
  let timer = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

  GAME.stats.time.str = timer;
  UI.data.timer = timer;
  Reactive.timer.value = timer;
});
Reactive.paused.subscribe(() => {
  const val = Reactive.paused.value;
  const btn = document.querySelector('#togglePauseBtn');
  // console.log(`Reactive.paused: ${Reactive.paused.value}`);
  GAME.state.paused = val;
  if(val) {
    btn.innerText = 'Play';
    pauseGame();
  }
  else {
    btn.innerText = 'Pause';
    resumeGame();
  }
});

reactiveExpression((win,lose) => {
  if (win) {
    GAME.state.win = true;
    GAME.state.lose = false;
    winState();
  }
  else if (lose) {
    GAME.state.win = false;
    GAME.state.lose = true;
    loseState();
  }
  else {
    resetState();
  }
},
Reactive.win, Reactive.lose);