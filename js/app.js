/*
 * TO DO:
 * add keyboard functionality event listener
 */
$('.main-container').css({'opacity': '0.85', 'background-color': 'white'});
const newGame = new Game();

document.getElementById('btn__reset').addEventListener('click', function() { newGame.startGame(); });

document.getElementById('qwerty').addEventListener(
  'click',
  function(event) {
    newGame.handleInteraction(event);
  }
);

document.addEventListener(
  'keydown',
  function(event) {
    newGame.handleInteraction(event);
  }
);

