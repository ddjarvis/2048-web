const Reactive = {
  score: reactiveValue(0),
  best: reactiveValue(0),
  moves: reactiveValue(0),
  time: reactiveValue(0),
  timer: reactiveValue('00:00'),
  win: reactiveValue(false),
  lose: reactiveValue(false),
  paused: reactiveValue(false),
  state: reactiveValue(''),
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
  saveData();
});
Reactive.paused.subscribe(() => {
  const val = Reactive.paused.value;
  const btn = document.querySelector('#togglePauseBtn');
  const state = GAME.state;
  
  if(state.win || state.lose) return;

  state.paused = val;
  if(val) {
    btn.innerText = 'Play';
    pauseGame();
  }
  else {
    btn.innerText = 'Pause';
    resumeGame();
  }
});
Reactive.state.subscribe(() => {
  const val = Reactive.state.value;
  GAME.state.value = val;
  UI.data.state = val;
});
// Reactive.win.subscribe(() => {

// });
// Reactive.lose.subscribe(() => {});
reactiveExpression((win,lose, paused) => {
  if(win || lose) {
    if (win) {
      Reactive.paused.value = true;
      Reactive.lose.bypass = false;
      Reactive.win.bypass = true;
      Reactive.state.value = 'win';
      GAME.state.win = true;
      GAME.state.lose = false;
      winState();
    }
    if (lose) {
      Reactive.paused.value = true;
      Reactive.win.bypass = false;
      Reactive.lose.bypass = true;
      Reactive.state.value = 'lose';
      GAME.state.win = false;
      GAME.state.lose = true;
      loseState();
    }
  }
  else if (paused) {
    Reactive.state.value = 'paused';
  }
  else {
    Reactive.state.value = '';
    resetState();
  }
},
Reactive.win, Reactive.lose, Reactive.paused);



function showReactives() {
  const group = `Show Store: Reactive`;
  console.warn(`ReactiveStore: Reactive`);
  Object.entries(Reactive).forEach(r => console.log(`Reactive.${r[0]}.value = ${r[1].value}`));
  console.groupEnd(group);
}
