const moonImg = new Image();
moonImg.src = "moon.png"; // or "img/moon.png" if using a subfolder

const bgImg = new Image();
bgImg.src = "background.jpg"; // or "img/background.jpg"

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const throwButton = document.getElementById("throwButton");
const popup = document.getElementById("popup");
const playAgainBtn = document.getElementById("playAgain");

const readLetterBtn = document.getElementById("readLetter");
const closeLetterBtn = document.getElementById("closeLetter");
const letterPopup = document.getElementById("letterPopup");

// Game variables
let moonX = 200;
let moonY = 100;
let moonDirection = 1;

let hookY = 550;
let isThrowing = false;
let isCaught = false;
let isGameOver = false;

function drawMoon() {
  ctx.drawImage(moonImg, moonX - 30, moonY - 30, 60, 60);
}

function drawHook() {
  if (isThrowing || isCaught || isGameOver) {
    ctx.beginPath();
    ctx.moveTo(200, 550);
    ctx.lineTo(200, hookY);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
}

function updateGame() {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Move moon left-right before caught
  if (!isCaught && !isGameOver) {
    moonX += moonDirection * 2;
    if (moonX > 350 || moonX < 50) {
      moonDirection *= -1;
    }
  }

  // Animate hook
  if (isThrowing && !isCaught) {
    hookY -= 5;

    const hookX = 200;
    const distance = Math.sqrt((hookX - moonX) ** 2 + (hookY - moonY) ** 2);

    if (distance < 30) {
      isCaught = true;
    }

    if (hookY <= 0) {
      isThrowing = false;
      hookY = 550;
    }
  }

  // Pull moon down
  if (isCaught && !isGameOver) {
    moonY += 5;
    hookY = moonY;

    if (moonY >= 500) {
      isCaught = false;
      isThrowing = false;
      isGameOver = true;
      showPopup();
    }
  }

  drawMoon();
  drawHook();
  requestAnimationFrame(updateGame);
}

function showPopup() {
  popup.classList.remove("hidden");
  throwButton.disabled = true;
}

playAgainBtn.addEventListener("click", () => {
  // Reset game state
  moonX = 200;
  moonY = 100;
  moonDirection = 1;
  hookY = 550;
  isThrowing = false;
  isCaught = false;
  isGameOver = false;

  popup.classList.add("hidden");
  throwButton.disabled = false;
});

// Letter popup events


if (readLetterBtn && closeLetterBtn && letterPopup) {
  readLetterBtn.addEventListener("click", () => {
    letterPopup.classList.remove("hidden");
  });

  closeLetterBtn.addEventListener("click", () => {
    letterPopup.classList.add("hidden");
  });
}

throwButton.addEventListener("click", () => {
  if (!isThrowing && !isCaught && !isGameOver) {
    hookY = 550;
    isThrowing = true;
  }
});

updateGame();
