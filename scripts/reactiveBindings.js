const Reactive = {
  score: reactiveValue(0),
  best: reactiveValue(0),
  moves: reactiveValue(0),
  time: reactiveValue(0),
  win: reactiveValue(false),
  lose: reactiveValue(false),
};

bindReactiveElements(Reactive);

Reactive.score.subscribe(() => {
  const val = Reactive.score.get();
  const best = Reactive.best.get();

  GAME.stats.score = val;
  UI.data.scores.current = val;

  if (val > best) {
    Reactive.best.set = val;
  }
});
Reactive.best.subscribe(() => {
  const val = Reactive.best.get();
  UI.data.scores.best = val;
});
Reactive.moves.subscribe(() => {
  const val = Reactive.moves.get();
  GAME.stats.moves = val;
  UI.data.moves = val;
});
Reactive.time.subscribe(() => {
  const val = Reactive.time.get();
  GAME.stats.time = val;
  UI.data.time = val;
});