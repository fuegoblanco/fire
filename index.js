/** @format */

let canvas;
let game;
let backgroundMusic;


let config = {
  timeLimit: 90000,
  cellSize: 60,
  pacman: {
    size: 40,
    speed: 3,
  },
  ghost: {
    size: 40,
    speed: 2.5,
  },

  canvas: {
    width: null,
    height: null,
  },
  stage: stage,
};

function preload() {
  backgroundMusic = loadSound('HoliznaCC0Legends.mp3');
}

function setup() {
  
  frameRate(35);

  background(0);
  noStroke();
  var container = document.getElementById('screen');
  var containerWidth = container.offsetWidth * 0.96;
  var containerHeight = container.offsetHeight * 0.95;

  canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent('screen');
  game = new Game(config);
  game.addStage();
  game.addPacman(1, 5);

  backgroundMusic.loop();
  document
    .getElementById('dpad-up')
    .addEventListener('mousedown', () => handleButtonClick('up'));
  document
    .getElementById('dpad-down')
    .addEventListener('mousedown', () => handleButtonClick('down'));
  document
    .getElementById('dpad-left')
    .addEventListener('mousedown', () => handleButtonClick('left'));
  document
    .getElementById('dpad-right')
    .addEventListener('mousedown', () => handleButtonClick('right'));
}
function handleButtonClick(direction) {
  game.pacman.steer(direction);
}
function draw() {
  if (game.timer >= game.config.timeLimit) {

    this.stop('Time is up!');
      showModal(game.score); // Display the modal with the score

    this.resetGame();
    return;
  }
  game.timer++;
  if (game.pacman.isPowerUp) {
    background(0, 0, 0); // set background color to red during power-up
  } else {
    background(color(195, 248, 255)); // set background color to black otherwise
  }
  const cameraX = -game.pacman.position.x;
  const cameraY = -game.pacman.position.y;

  // Apply the camera's position as a translation.
  push();
  translate(cameraX + canvas.width / 3, cameraY + canvas.height / 3); // add half of the canvas width and height to center the camera

  // Draw the game elements.
  game.stage.show();
 

  game.pacman.show();
  game.pacman.update();
  game.pacman.move();

  game.checkPower();
  game.showStats();

  if (game.timer >= game.config.timeLimit) {
    // Game over, time's up!
  }
 
  game.checkCompleted();

  game.ghosts.forEach((ghost) => {
    ghost.show();
    ghost.update();
    ghost.move();
    ghost.chase(game.pacman);
    ghost.setDirection();

    game.checkCollision(ghost);
  });

  // Restore the original drawing context.
  pop();

  if (keyIsPressed) {
    if (keyCode == UP_ARROW) game.pacman.steer('up');
    if (keyCode == DOWN_ARROW) game.pacman.steer('down');
    if (keyCode == LEFT_ARROW) game.pacman.steer('left');
    if (keyCode == RIGHT_ARROW) game.pacman.steer('right');
  }
}

function windowResized() {
  resizeCanvas(containerWidth * 0.9, containerHeight* 0.9);
}
function showModal(score) {
  // Get the modal element and the span element that will display the score
  const modal = document.getElementById("modal");
  const scoreSpan = document.getElementById("score");

  // Set the score in the span element
  scoreSpan.textContent = score;

  // Display the modal
  modal.style.display = "block";

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // When the user clicks the tweet button, send a tweet with the score
  const tweetBtn = document.getElementById("tweet-btn");
  tweetBtn.onclick = function() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=My%20Pacman%20score%20is%20${score}%21&hashtag=BOODAO`;
    window.open(tweetUrl, "_blank");
  }
}