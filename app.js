/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guesses
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < minNum || guess > max || guess <= 0) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    // Check if won
    if (guess === winningNum) {
      // Disable input
      gameOver(true, `${winningNum} is correct! You win!`);
    } else {
      // Wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Game Over
        gameOver(
          false,
          `Game over, you lost. The correct number was ${winningNum}`
        );
      } else {
        // Game continues - answer wrong

        setMessage(
          `${guess} is not correct, you need to try again. You have ${guessesLeft} guesses left!`,
          "red"
        );
        guessInput.value = "";
      }
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  setMessage(msg, color);

  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get winning num
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message

function setMessage(msg, color) {
  message.style.color = color;
  guessInput.style.borderColor = color;
  message.textContent = msg;
}
