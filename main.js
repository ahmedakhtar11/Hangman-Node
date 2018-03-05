//require inquirer
var inquirer = require('inquirer');

//require is-letter
var isLetter = require('is-letter');

//require word.js
var Word = require('./word.js');

//require game.js
var Game = require('./game.js');

//hangman images
var displayHangman = Game.newWord.hangman;

//setting maxListener
require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  //Checks if the user has already guessed the letter
  lettersGuessed: [],

  //Index to display hangman image
  display: 0,
  currentWord: null,

  //Start Game
  startGame: function() {
    var that = this;

  //clear lettersGuessed before starting a new game
    if(this.lettersGuessed.length > 0){
       this.lettersGuessed = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "WELCOME TO HANGMAN! Press 'Y' to Begin Playing!"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("THANKS FOR VISITING! GOODBYE!");
      }
    })},

  //starting a new game
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("STARTING NEW HANGMAN GAME!");
      console.log('~~~~~~~~~~~~~~~~~~~~~');

      //choosing a random word
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.pushLetter();

      //display letters as blanks.
      console.log(this.currentWord.renderWord());
      this.promptletter();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  promptletter : function(){
    var that = this;

    //inputting letters by the user
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "CHOOSE A LETTER!:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } 
        else{
          return false;
        }
      }
    }]).then(function(ltr) {

      // updating Letters entered to Lowercase
      var letterReturned = (ltr.chosenLtr).toUpperCase();

      //adding letter to lettersGuessed array
      var guessedAlready = false;
        for(var i = 0; i<that.lettersGuessed.length; i++){
          if(letterReturned === that.lettersGuessed[i]){
            guessedAlready = true;
          }
        }

        //function if letter isn't guessed
        if(guessedAlready === false){
          that.lettersGuessed.push(letterReturned);

          var found = that.currentWord.matchLetter(letterReturned);
          
          //if the letter doesn't match
          if(found === 0){
            console.log('WRONG! INCORRECT LETTER CHOSEN!!!');
            that.guessesRemaining--;
            that.display++;
            console.log(displayHangman[(that.display)-1]);
            console.log('\n__________________________');
            console.log(that.currentWord.renderWord());
            console.log('\n__________________________');
            console.log('Remaining Guesses: ' + that.guessesRemaining);
            console.log("Letters Already Guessed: " + that.lettersGuessed);
          } 
          else{
            console.log('CORRECT LETTER CHOSEN!');
              
              //if all letters have been guessed
              if(that.currentWord.matchWord() === true){
                console.log(that.currentWord.renderWord());
                console.log('Congratulations! You won the game!!!'); 
              } 
              else{
              // number of guesses remaining
                console.log('Remaining Guesses: ' + that.guessesRemaining);
                console.log(that.currentWord.renderWord());
                console.log('\n_______________________');
                console.log("Letters Already Guessed: " + that.lettersGuessed);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.promptletter();

          }
          else if(that.guessesRemaining === 0){
            console.log('GAME OVER!!!');
            console.log('THE CORRECT WORD WAS: ' + that.currentWord.word);
          }
        } 
          else{
            console.log("--CHOSE ANOTHER LETTER. YOU HAVE ALREADY GUESSED THAT LETTER!--")
            that.promptletter();
          }
    });
  }
}

hangman.startGame();

