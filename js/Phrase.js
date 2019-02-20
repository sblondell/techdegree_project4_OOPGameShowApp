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
   * Checks to see if user selection matches any letter in phrase.
   * @return  {Boolean}
   */
  checkLetter(userChoice) {
    const li_hiddenPhrase = document.querySelectorAll('#phrase li');

    var regExp = `.*letter ${userChoice}$`; //Regular expression used to test if the user choice is in the class attribute...
					    //...of any of the html of the letters in the phrase
    var regexp_userChoice = new RegExp(regExp, "i"); 

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
  }


  tile_changeColor(color, tile) {
    tile.style.backgroundColor = color;
  }

  tile_colorGenerator(initialColor, rate = 1, deviation = 0) {
    let rgbArray_converted = [0,0,0];
    
    let rgbArray_num = initialColor.split(','); //Break 'intialColor' into [R,G,B] value array(string)

    //Convert string array into number array
    for (index in rgbArray_num) { 
      rgbArray_num[index] = parseInt(rgbArray_num[index], 10);
    }

    //Apply the rate of change and deviation from initial color to the RGB values
    for (let i = 0; i < rgbArray_num.length; i++) {
      rgbArray_num[i] = rgbArray_num[i] * (Math.pow(rate, deviation));
    }

    //Reconstructs a '000,000,000' based string for use in 'rgb(000,000,000)' html attributes
    rgbArray_converted = rgbArray_num.reduce(
      (finalRGB, rgbColor, index) => {
	finalRGB += rgbColor.toString();
	if (index != (rgbArray_num.length - 1)) { //If rgbColor being entered is not the last value in the array, add a ',' seperator 
	  finalRGB += ','; 
	} 
	return finalRGB;
      }, '');
    
    return rgbArray_converted;
  }

  tile_modifyOpacity(color, deviation) {
    const opacityCeiling = 0.60; //Creates a cap for opacity
    const opacityFloor = 0.20; //Creates a baseline for opacity
    const opacityWindow = opacityCeiling - opacityFloor;
    const opacityRate = (opacityWindow / document.querySelectorAll('.letter').length);
    const newOpacity = (opacityRate * deviation) + opacityFloor; 
    const transformedColor = `rgb(${color}, ${newOpacity.toString()})`; 

    return transformedColor;
  }

  tile_generatePattern(color, rate, iterations) {
    //Two pointers needed for functions to solve scoping issues with setInterval()
    const pointer_tile_modifyOpacity = this.tile_modifyOpacity;
    const pointer_tile_changeColor = this.tile_changeColor;

    const domLI_Phrase = document.querySelectorAll('.letter');
    const sweep_speed = 50;
    const sweep_fullSweep = sweep_speed * domLI_Phrase.length;
    const colors = [
      '255,51,204',
      '255,0,102',
      '204,51,255',
      '0,153,255',
      '255,26,26',
      '255,102,0',
      '0,0,102'
    ];

    function sweeper() {
      const randNum = Math.ceil((Math.random() * colors.length));
      let i = 0;
      let timerID = null;
      let rgbColor = '';

      timerID = setInterval(() => {                      
	rgbColor = pointer_tile_modifyOpacity(colors[randNum], i);
	pointer_tile_changeColor(rgbColor , domLI_Phrase[i]);
	++i;                                           
	if (i === domLI_Phrase.length) { clearInterval(timerID); }
      }, sweep_speed);
    }

    for (let send_off = 0; send_off <= 9/*domLI_Phrase.length*/; send_off++) {
      //Each subsequent "color sweep" is timed at 'C + Cn', C = one complete sweep , n = current iteration 
      const sweep_nextSweepSpeed = sweep_fullSweep + (sweep_fullSweep * send_off);
      setTimeout(() => {
	sweeper();
      }, sweep_nextSweepSpeed); 
    }
  }
}

