const section = document.querySelector(".section");
const hanger = document.querySelector(".hanger");
const knot = document.querySelector(".knot");
const head = document.querySelector(".head");
const torso = document.querySelector(".torso");
const leftArm = document.querySelector(".left-arm");
const rightArm = document.querySelector(".right-arm");
const leftLeg = document.querySelector(".left-leg");
const rightLeg = document.querySelector(".right-leg");
let category = document.querySelector(".category");
let finalMsg = document.querySelector(".final");
let wordHtml = document.querySelector(".word");
const keyboard = document.querySelector(".keyboard");
const wrongGuess = document.querySelector(".wrongGuess");
const restart = document.querySelector(".restart");
let alphabet = "qwertyuiopasdfghjklzxcvbnm";
let letters = alphabet.split("");
letters.forEach((letter) => {
  let single = letter;
  letter = document.createElement("button");
  letter.classList.add("letter");
  letter.style.color = "#12b3eb";
  letter.value = single;
  letter.innerHTML = `
  ${single}
  `;
  keyboard.append(letter);
});
const buttons = document.querySelectorAll(".letter");

const words = [
  [
    "html",
    "css",
    "javascript",
    "php",
    "python",
    "java",
    "golang",
    "ruby",
    "fortran",
  ],
  [
    "cat",
    "dog",
    "sheep",
    "tiger",
    "rabbit",
    "snake",
    "crocodile",
    "bear",
    "whale",
    "horse",
  ],
  [
    "germany",
    "usa",
    "russia",
    "japan",
    "france",
    "china",
    "brazil",
    "argentina",
    "albania",
    "mexico",
  ],
  [
    "paris",
    "london",
    "miami",
    "tokyo",
    "toronto",
    "madrid",
    "washington",
    "beijing",
    "dubai",
    "berlin",
  ],
];

const guess = [];
let word = words[Math.floor(Math.random() * words.length)];

const select = document.querySelector(".select");
const selectBtn = document.querySelectorAll(".select button");
selectBtn.forEach((button) => {
  button.addEventListener("click", () => {
    select.classList.add("hide");
    word =
      words[button.value][
        [Math.floor(Math.random() * words[button.value].length)]
      ];
    section.classList.remove("hide");
    section.classList.add("show");
    startGame();
    category.innerText = `${button.innerText}`;
  });
});

let mistakes = 0;

function showWord() {
  wordHtml.innerHTML = `${word
    .split("")
    .map(
      (letter) =>
        `<span class=letter>
    ${guess.includes(letter) ? letter : "_"}
    </span>`
    )
    .join("")}`;
  const innerWord = wordHtml.innerText.replace(/[ \n]/g, "");
  if (innerWord === word) {
    endGame();
    finalMsg.innerText = `Congrats! You Won!`;
  }
}

function hangman() {
  mistakes++;
  wrongGuess.innerText = `Wrong Guesses: ${mistakes}`;
  switch (mistakes) {
    case 1:
      display(hanger);
      break;
    case 2:
      display(knot);
      break;
    case 3:
      display(head);
      break;
    case 4:
      display(torso);
      break;
    case 5:
      display(leftArm);
      break;
    case 6:
      display(rightArm);
      break;
    case 7:
      display(leftLeg);
      break;
    case 8:
      display(rightLeg);
      endGame();
      break;
  }
}

function display(item) {
  item.style.display = "block";
}

function keydown(key) {
  if (key.keyCode >= 65 && key.keyCode <= 90) {
    const letter = key.key;
    buttons.forEach((button) => {
      if (button.value == letter) {
        button.disabled = true;
        button.style.color = "#e1fffc";
      }
    });
    if (word.includes(letter)) {
      if (!guess.includes(letter)) {
        guess.push(letter);
        showWord();
        buttons.forEach((button) => {
          if (button.value == letter) {
            button.classList.add("correct");
          }
        });
      }
    } else hangman();
  }
}

function startGame() {
  wordHtml.innerHTML = `${word
    .split("")
    .map((letter) => `<span class=letter>_ </span>`)
    .join("")}`;
  document.addEventListener("keydown", keydown);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const letter = button.value;
      if (word.includes(letter) && !guess.includes(letter)) {
        guess.push(letter);
        showWord();
        button.classList.add("correct");
      } else hangman();
      button.disabled = true;
    });
  });
}

function endGame() {
  disable();
  finalMsg.innerText = `You Lost! The Word Was "${word}"`;
  return;
}

function disable() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  document.removeEventListener("keydown", keydown);
}

function reload() {
  window.location.href = window.location.href;
}

restart.addEventListener("click", reload);
