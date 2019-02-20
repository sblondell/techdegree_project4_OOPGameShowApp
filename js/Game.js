class Game {
  constructor() {
    this.missed = 0;
    this.phrase = [
      new Phrase("AnjunaDeep Stream"),
      new Phrase("Casio Calculator Wins"),
      new Phrase("Down the road is gold"),
      new Phrase("Ocean flows Wind Blows"),
      new Phrase("Yippie Kaiya")
    ];
    this.activePhrase = null;
  }

  startGame() {
    this.resetGame();
    const startScreen = document.querySelector("#overlay");
    startScreen.style.display = 'none';
    startScreen.className = 'start';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  resetGame() {
    const keyboard = document.querySelectorAll('.key');
    const lives = document.querySelectorAll('.tries');
    const phrase = document.querySelector('#phrase ul');

    this.missed = 0;
    for (let life of lives) {
      life.firstChild.src='images/liveHeart.png';
    }

    for (let key of keyboard) {
      key.className = 'key';
      key.disabled = false;
    }

    phrase.innerHTML = '';
  }

  getRandomPhrase() {
    return this.phrase[Math.ceil((Math.random() * this.phrase.length) - 1)];
  }

  handleInteraction(e) {
    const keyboard = document.querySelectorAll('.key');
    var qwertyKey = null;
    var userChoice = null;
    e.target.tagName === 'BUTTON' ? userChoice = e.target.textContent : userChoice = e.key;

    
    for (let key of keyboard) {
      if (key.innerText === userChoice) {
	qwertyKey = key;
      } 
    }
    function keyFlip (judgement) {
      qwertyKey.classList.add(judgement);
      qwertyKey.disabled = true;
    }
    /*if (e.target.tagName === 'BUTTON') {
      userChoice = e.target.textContent;
    }else {
      userChoice = e.key;
    }*/

    //If userChoice is a valid letter and the associated keydown press hasn't been triggered yet
    //Testing for 'className' = 'key' makes sure the associated onscreen keyboard button hasn't been guessed...
    //...if this wasn't here, the user could PRESS an identical key multiple times
    if (/[a-z]/.test(userChoice) && qwertyKey.className === 'key') {
      if (this.activePhrase.checkLetter(userChoice)) {
	//e.target.classList.add('chosen');
	this.activePhrase.showMatchedLetter(userChoice);
	this.activePhrase.tile_generatePattern();
	this.checkForWin();
	keyFlip('chosen');
      }else {
	//e.target.classList.add('wrong');
	keyFlip('wrong');
	this.removeLife();
      }
    }
  }

  removeLife() {
    const lives = document.querySelectorAll('.tries');

    if (this.missed <= 4) {

      //JQuery animation
      $('img').eq(this.missed).animate({height:'110%', width:'110%'}, 200).animate({height:'35', width:'30'}, 500);

      lives[this.missed].firstChild.src='images/lostHeart.png';
      this.missed++;
    }else {
      this.gameOver();
    }
  }

  checkForWin() {
    const dom_phrase = document.querySelectorAll('.letter');
    var win = true;

    //If any letter is still hidden (ie. class list has 'hide'), then player has not met win criteria
    for (let i = 0; i < dom_phrase.length; i++) {
      if (/^hide/.test(dom_phrase[i].classList.value)) {
	win = false;
	break;
      }
    }

    win ? this.gameOver() : false;
  }

  gameOver() {
    const startScreen = document.querySelector("#overlay");
    const gameOverMsg = document.querySelector("#game-over-message");

    startScreen.style.display = '';
    
    if (this.missed === 5) {
      startScreen.className = 'lose';
      gameOverMsg.textContent = "Sorry, you lose. Play again!";
    }else {
      startScreen.className = 'win';
      //gameOverMsg.innerHTML =  '"' + this.activePhrase.phrase + '"';
      gameOverMsg.innerHTML = `You Win!<br>
			      <p>The phrase was: <i>"${this.activePhrase.phrase}"</i></p>
			      `;
    }
  }
}
