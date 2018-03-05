var Letter = function(ltr) {

// property to store Keyboard Letters Used
  this.letter = ltr;

// property to store letter appearance
  this.appear = false;

  this.letterRender = function() {
    if(this.letter == ' '){ 

      //If-Then Statement to use letter appear property
      this.appear = true;
	      return '  ';
	    }
	    if(this.appear === false){
	    		return ' _ ';
		} 
		else{
		      	return this.letter;
		}
  };
};

// export to word.js
module.exports = Letter;



