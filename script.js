var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// Last place we can use the reset function which is at beginning of code. When the page loads first time, what should happen is we need to pick random colors, then pick one color out of those random colors, and then assign a color to each square on the page so we can use our reset function because that's what it does.  Here we declare init() function and nest our forloop inside

init();

function init() {
   // mode button event listeners
   setUpModeButtons();
   setUpSquares();
   reset();
}

function setUpModeButtons() {
   for (var i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function () {
         modeButtons[0].classList.remove("selected");
         modeButtons[1].classList.remove("selected");
         this.classList.add("selected");
         this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
         // this line is called a TERNARY OPERATOR.  "If this textContent = "Easy", then numSquares = 3, otherwise numSquare = 6." This line does the same thing as the following:
         // if(this.textContent === "Easy"){
         // 	numSquares = 3;
         // }	else {
         // 	numSquares = 6;
         // }
         reset();
      });
   }
}

function setUpSquares() {
   for (var i = 0; i < squares.length; i++) {
      // add initial colors to squares
      // squares[i].style.background = colors[i];
      // use style.backgroundColor instead of style.background for cross-browser compatibility.
      // loops through all the squares and assigns it the RGB colors that are not yet randomized
      //add click listeners to squares
      squares[i].addEventListener("click", function () {
         //grab color of clicked squares
         var clickedColor = this.style.background;
         //compare color to pickedColor
         if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
            h1.style.background = clickedColor;
         } else {
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
         }
      });
   }
}

function reset() {
   // generate all new colors
   colors = generateRandomColors(numSquares);
   //pick a new random color from array
   pickedColor = pickColor();
   //change colorDisplay to match picked Color
   colorDisplay.textContent = pickedColor;
   // to display "Play Again?" only if the user has already won // to show "New Colors" only up until user wins
   resetButton.textContent = "New Colors";
   // empty messageDisplay when starting new game
   messageDisplay.textContent = "";
   //change colors of squares
   for (var i = 0; i < squares.length; i++) {
      if (colors[i]) {
         squares[i].style.display = "block";
         squares[i].style.background = colors[i];
      } else {
         squares[i].style.display = "none";
      }
   }
   h1.style.background = "steelblue";
}

// easyBtn.addEventListener("click", function(){
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		}	else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// });

// hardBtn.addEventListener("click", function(){
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// });

resetButton.addEventListener("click", function () {
   reset();
});

// function to turn all squares to pickedColor when pickedColor is selected
function changeColors(color) {
   //loop through all squares
   for (var i = 0; i < squares.length; i++) {
      //change each color to match given color
      squares[i].style.background = color;
   }
}

// function to get random color. we're doing this to clean up code and to use it later for when we'll need to start a new game and again pick a new random color
function pickColor() {
   var random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

function generateRandomColors(num) {
   //make an array
   var arr = [];
   //add num random colors to arr
   for (var i = 0; i < num; i++) {
      //get random color and push into arr
      arr.push(randomColor());
   }
   //return that array
   return arr;
}

function randomColor() {
   //pick a "red" from 0 - 255
   var r = Math.floor(Math.random() * 256);
   //pick a "green" from 0 - 255
   var g = Math.floor(Math.random() * 256);
   //pick a "blue" from 0 - 255
   var b = Math.floor(Math.random() * 256);
   return "rgb(" + r + ", " + g + ", " + b + ")";
}