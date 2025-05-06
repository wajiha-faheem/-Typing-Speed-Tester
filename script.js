const quoteElement = document.getElementById("quote");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const mistakesEl = document.getElementById("mistakes");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");

const quotes = [
    `The courtroom was her runwayEvery objection, a fashion statement.Her words were evidence,and her silence? A closing argument.`,
    
   `Her favorite subject was human behavior But she coded like a machine.Maybe because she knew exactly how people think — and made the interface that felt like home.`,
    `Pretty? Yes. But she’s also powerful.She builds websites in the morning,stands up for her beliefs by noon,and still has time to fix her winged eyeliner.`,
    `Some wear rings, she wears finger stains from her keyboard.She writes spells in JavaScript,casts layout magic in CSS,and dreams in responsive grids.`,
    `She didn’t read minds,she read micro-expressions.People were puzzles,and she loved cracking the code behind every ‘I’m fine.`,
    `She knew the law like she knew her eyeliner — sharp Arguments were her weapons,truth her shield, and justice her vibe.When she entered a room, even silence stood at attention.`,
    `Her code wasn’t just logic — it mirrored her mind.Calm, creative, sometimes chaotic.Every function she wrote was a thought untangled,a therapy session with semicolons.`,
    `They said coding is hard.She smiled, opened her laptop,and made the browser bow down to her brilliance.Because princesses can debug too.`,
    `Once upon a time, a girl typed into VS Codeand built a kingdom of colors and clicks.She didn't wear heels — she wore headphones.And her favorite shade? #ff6600.`,
    `Who needs a fairy godmother when you’ve got GitHub,a vision board, and a dark theme?Her beauty? Effortless.Her brain? Syntax-highlighted.`,
    `Coding isn’t just work — it’s art in disguise.With every curly brace, I paint logic.With every div, I define space.And with every bug, I level up.`,
    `She coded with glitter in her eyes and bugs in her code,but nothing could stop her from building a digital castlewhere every button clicked like magic,and every line told a story of strength and style.`
];

let currentQuote = "";
let startTime;
let interval;
let mistakes = 0;
let testStarted = false;
let timeLimit = 60;

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.innerText = currentQuote;
  input.value = "";
  timeEl.innerText = "0";
  wpmEl.innerText = "0";
  mistakesEl.innerText = "0";
  mistakes = 0;
  input.disabled = false;
  input.focus();
}

function startTimer() {
  startTime = new Date();
  interval = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentTime = new Date();
  const timeElapsed = Math.floor((currentTime - startTime) / 1000);
  timeEl.innerText = timeElapsed;

  if (timeElapsed >= timeLimit) {
    clearInterval(interval);
    input.disabled = true;
    restartBtn.style.display = "block";
  }

  const wordsTyped = input.value.trim().split(" ").length;
  const wpm = Math.round((wordsTyped / timeElapsed) * 60);
  wpmEl.innerText = timeElapsed > 0 ? wpm : 0;
}

input.addEventListener("input", () => {
  if (!testStarted) {
    testStarted = true;
    startTimer();
  }

  const enteredText = input.value;
  let errorCount = 0;

  for (let i = 0; i < enteredText.length; i++) {
    if (enteredText[i] !== currentQuote[i]) {
      errorCount++;
    }
  }

  mistakes = errorCount;
  mistakesEl.innerText = mistakes;

  if (enteredText === currentQuote) {
    clearInterval(interval);
    input.disabled = true;
    restartBtn.style.display = "block";
  }
});

startBtn.addEventListener("click", () => {
  loadQuote();
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  testStarted = false;
});

restartBtn.addEventListener("click", () => {
  loadQuote();
  clearInterval(interval);
  testStarted = false;
  restartBtn.style.display = "none";
});
