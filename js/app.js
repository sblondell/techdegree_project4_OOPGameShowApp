const newGame = new Game();

document.getElementById('btn__reset').addEventListener('click', function() { newGame.startGame(); });

document.getElementById('qwerty').addEventListener(
  'click',
  function(event) {
    newGame.handleInteraction(event);
  }
);
