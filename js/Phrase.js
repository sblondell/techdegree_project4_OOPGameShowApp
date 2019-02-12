class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /*
   * Adds the phrase(hidden) into the DOM.
   */
  addPhraseToDisplay() {
    this.phrase = "AnjunaDeep Stream";

    for (let alpha of this.phrase) {
      var li_letter;
      alpha === ' ' ? 
	  li_letter = $('<li>').addClass('space').text(alpha)
	: li_letter = $('<li>').addClass(`hide letter ${alpha.toLowerCase()}`).text(alpha);
      $('#phrase ul').append(li_letter);
    }
  }

  /*
   * Checks to see if user keyboard('click') selection matches any letter in phrase.
   * //CLEAN-UP
   * //the method here takes a parameter only for testing purposes; for the actual program it will respond to an event object
   */
  checkLetter(userChoice) {
    for (let letter of this.phrase) {
      if (letter === userChoice.toLowerCase()) {
	//showMatchedLetter(letter);
	break;
      }
    }
  }

  /*
   * Reveals all letters matching the user guess.
   * //CLEAN-UP
   * //the method here takes a parameter only for testing purposes; for the actual program it will respond as a callback
   */
  showMatchedLetter(letter) {
    const $li_hiddenPhrase = $('#phrase li');
    var regExp = `.*letter ${letter}$`; //Regular expression used to test if the user choice is in the class attribute...
					//of any of the html of the letters in the phrase
    var regexp_userChoice = new RegExp(regExp); 

    for (let li_letter of $li_hiddenPhrase) {
      let li_letterClass = $(li_letter).attr('class');

      if (regexp_userChoice.test(li_letterClass)) {
	$(li_letter).removeClass('hide');
	$(li_letter).addClass('show');
      }
    }
  }
}
