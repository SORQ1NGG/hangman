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

let word = pickWord();

let answerArray = setupAnswerArray(word);

let remainingLetters = word.length;

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
  }
}

showAnswerAndCongratulatePlayer(answerArray);
