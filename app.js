const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highscore=0;

document.addEventListener("keydown", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    if (!started) return;
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    highscore = Math.max(highscore, level - 1);
    document.getElementById("level-title").innerHTML = `Game Over, Press Any Key to Restart.<br>Your Score: ${level - 1}<br>High Score: ${highscore}`;

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const btn = document.getElementById(randomChosenColor);
  btn.classList.add("pressed");
  playSound(randomChosenColor);
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 200);
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  let audio;
  switch (name) {
    case "green":
      audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
      break;
    case "red":
      audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
      break;
    case "yellow":
      audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
      break;
    case "blue":
      audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
      break;
    default:
      audio = new Audio("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav");
  }
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started =false;
}