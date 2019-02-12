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
    document.querySelector("#overlay").style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  getRandomPhrase() {
    return this.phrase[Math.ceil(Math.random() * 4)];
  }

  handleInteraction(e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.disabled = true;
      const userChoice = e.target.textContent;
      
      if (this.activePhrase.checkLetter(userChoice)) {
	e.target.classList.add('chosen');
	this.activePhrase.showMatchedLetter(userChoice);
	this.checkForWin();
      }else {
	e.target.classList.add('wrong');
	this.removeLife();
      }
    }
  }

  removeLife() {
    const lives = document.querySelectorAll('.tries');

    if (this.missed < 4) {
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
    const startScreenMsg = document.querySelector("#game-over-message");

    startScreen.style.display = '';
    startScreen.classList.remove('start');
    
    if (this.missed === 4) {
      startScreen.classList.add('lose');
      startScreenMsg.textContent = "Sorry, you lose. Play again!";
    }else {
      startScreen.classList.add('win');
      startScreenMsg.textContent = "Winner, GAGNON!";
    }
  }
}
