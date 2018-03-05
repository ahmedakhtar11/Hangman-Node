// require letter.js
var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;

  this.word = wrd;
  this.letters = [];
  this.wordFound = false;

  this.pushLetter = function() {

    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //Finding the current word
  this.matchWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.matchLetter = function(guessedLetter) {
    var whatToReturn = 0;

    //checking if each letter matches guessedLetter

    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })

    //showing the letter object
    return whatToReturn;
  };

  this.renderWord = function() {
    var display = '';

   //rendering the word
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;

