/** @format */

let canvas;
let game;
let config = {
  cellSize: 40,
  pacman: {
    size: 30,
    speed: 3,
  },
  ghost: {
    size: 30,
    speed: 2.5,
  },
  canvas: {
    width: null,
    height: null,
  },
  stage: stage,
};

function setup() {
  frameRate(40);
  config.canvas.width = Math.min(windowWidth, 450);
  config.canvas.height = Math.min(windowHeight, 450);

  canvas = createCanvas(config.canvas.width, config.canvas.height);
  canvas.parent('screen');
  game = new Game(config);
  game.addStage();
  game.addPacman(1, 5);

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
  background(color(11, 15, 26));

  // Calculate the camera's position based on Pacman's position.
  const cameraX = -game.pacman.position.x + config.canvas.width / 2;
  const cameraY = -game.pacman.position.y + config.canvas.height / 2;

  // Apply the camera's position as a translation.
  push();
  translate(cameraX, cameraY);

  // Draw the game elements.
  game.stage.show();

  game.pacman.show();
  game.pacman.update();
  game.pacman.move();

  game.checkPower();
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
  config.canvas.width = Math.min(windowWidth, 650);
  config.canvas.height = Math.min(windowHeight, 650);
  resizeCanvas(config.canvas.width, config.canvas.height);
}
