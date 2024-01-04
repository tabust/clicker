const screens = document.querySelectorAll(".screen");
const chooseSweetBtns = document.querySelectorAll(".choose-sweet-btn");
const startBtn = document.getElementById("start-btn");
const gameNode = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const exitBtn = document.getElementById("exit_btn");

let seconds = 0;
let score = 0;
let selectedSweet = {};
let gameInterval;
let gameActive = false;
let misses = 0;

startBtn.addEventListener("click", () => {
  screens[0].classList.remove("visible");
  screens[1].classList.add("visible");
});

chooseSweetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");

    selectedSweet = { src };

    screens[1].classList.remove("visible");
    screens[2].classList.add("visible");
    startGame();
  });
});

exitBtn.addEventListener("click", () => {
  screens[2].classList.remove("visible");
  screens[0].classList.add("visible");
  endGame();
});

function startGame() {
  gameActive = true;
  seconds = 0;
  gameInterval = setInterval(increaseTime, 1000);
  createSweet();
}

function endGame() {
  clearInterval(gameInterval);
  gameActive = false;
}

function clearSweets() {
  const sweets = document.querySelectorAll(".sweet");
  sweets.forEach((sweet) => {
    sweet.remove();
  });
}

function increaseTime() {
  if (gameActive) {
    timeEl.innerHTML = `Time: ${seconds}`;
    seconds++;
    createSweet();
  }
}

function createSweet() {
  if (gameActive) {
    const { x, y } = getRandomLocation();
    const sweet = document.createElement("img");

    sweet.src = selectedSweet.src;

    sweet.classList.add("sweet");
    sweet.style.display = "block";
    sweet.style.top = `${y}px`;
    sweet.style.left = `${x}px`;
    sweet.style.transform = `rotate (${Math.random() * 360})deg`;

    sweet.addEventListener("click", catchSweet);

    gameNode.appendChild(sweet);
  }
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const sweetSize = 100;

  const x = Math.max(Math.random() * (width - sweetSize), 100);
  const y = Math.max(Math.random() * (height - sweetSize), 100);

  return { x, y };
}

function playBiteSound() {
  const audio = document.getElementById("bite");

  audio.play();
}

function catchSweet() {
  playBiteSound();
  increaseScore();

  this.remove();
}

function addSweet() {
  setTimeout(createSweet, 1000);
}

function increaseScore() {
  score++;

  scoreEl.innerHTML = `Score ${score}`;
}

function endGame() {
  clearInterval(gameInterval);
  gameActive = false;
  score = 0;
  seconds = 0;
  timeEl.innerHTML = "Time: 0";
  scoreEl.innerHTML = "Score: 0";
  clearSweets();
}
