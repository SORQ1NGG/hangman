let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function pickWord() {
  let words = ["самолет", "вертолет", "крокодил", "удав"];

  return words[Math.floor(Math.random() * words.length)];
}

function setupAnswerArray(word) {
  let answerArray = [];
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }
  return answerArray;
}

let showPlayerProgress = function (answerArray) {
  alert(answerArray.join(" "));
};

let getGuess = function () {
  return prompt('Угадайте букву или нажмите "Отмена" для выхода из игры.');
};

let updateGameState = function (guess, word, answerArray) {
  guess = guess.toLowerCase();
  guesses--;

  let appearances = 0;

  for (let j = 0; j < word.length; j++) {
    if (word[j] === guess && answerArray[j] === "_") {
      answerArray[j] = guess;
      appearances++;
    } else if (answerArray[j] === guess) {
      alert("Буква(ы) уже угадана(ы)!");
      break;
    }
  }
  return appearances;
};

let showAnswerAndCongratulatePlayer = function (answerArray) {
  showPlayerProgress(answerArray);

  if (guesses > 0) {
    alert("Отлично! Было загадано слово " + answerArray.join(""));
  }
};

let drawSegment = function(incorrectGuesses) {
  ctx.lineWidth = 4;

      if (incorrectGuesses === 0) {
        ctx.strokeRect(20, 20, 20, 20);
      } else if (incorrectGuesses === 1) {
        ctx.beginPath();
        ctx.moveTo(30, 40);
        ctx.lineTo(30, 80);
        ctx.stroke();
      } else if (incorrectGuesses === 2) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(10, 110);
        ctx.stroke();
      } else if (incorrectGuesses === 3) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(50, 110);
        ctx.stroke();
      } else if (incorrectGuesses === 4) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(10, 50);
        ctx.stroke();
      } else if (incorrectGuesses === 5) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(50, 50);
        ctx.stroke();
      }
}

let word = pickWord();
let answerArray = setupAnswerArray(word);
let remainingLetters = word.length;
let incorrectGuesses = 0;
let guesses = 13;

while (remainingLetters > 0 && guesses > 0) {
  showPlayerProgress(answerArray);

  let guess = getGuess();

  if (guess === "") {
    alert("Введите букву!");
    continue;
  }

  if (guess === null) {
    break;
  } else if (guess.length !== 1) {
    alert("Введите только одну букву!");
  } else {
    let correctGuesses = updateGameState(guess, word, answerArray);
    remainingLetters -= correctGuesses;


    if (correctGuesses === 0) {
      drawSegment(incorrectGuesses);
      incorrectGuesses++;
    }
  }
}

showAnswerAndCongratulatePlayer(answerArray);
