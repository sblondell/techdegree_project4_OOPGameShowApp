class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /*
   * Adds the phrase(hidden) into the DOM.
   */
  addPhraseToDisplay() {
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
    const li_hiddenPhrase = document.querySelectorAll('#phrase li');

    var regExp = `.*letter ${userChoice}$`; //Regular expression used to test if the user choice is in the class attribute...
					//of any of the html of the letters in the phrase
    var regexp_userChoice = new RegExp(regExp, "i"); 

    /*
    const $li_hiddenPhrase = $('#phrase li');
    $.each($li_hiddenPhrase, function(index, $letter) {
      let letterClass = $($letter).attr('class');

      if (regexp_userChoice.test(letterClass)) {
	console.log($($letter).text());
//	this.showMatchedLetter();
      }
    });*/

    for (let letter of li_hiddenPhrase) {
      if (regexp_userChoice.test(letter.className)) {
	//this.showMatchedLetter(letter);
	return true;
      }
    }
    return false;
  }
  
  /*
   * Reveals all letters matching the user guess.
   * //CLEAN-UP
   * //the method here takes a parameter only for testing purposes; for the actual program it will respond as a callback
   */
  showMatchedLetter(letter) {
    const li_hiddenPhrase = document.querySelectorAll('#phrase li');
    const regExp = `.*letter ${letter}$`; //Regular expression used to test if the user choice is in the class attribute...
					//of any of the html of the letters in the phrase
    const regexp_userChoice = new RegExp(regExp, "i"); 

    for (let letter of li_hiddenPhrase) {
      if (regexp_userChoice.test(letter.className)) {
	letter.classList.remove('hide');
	letter.classList.add('show');
      }
    }
    //$($letter).removeClass('hide');
    //$($letter).addClass('show');
  }
}
