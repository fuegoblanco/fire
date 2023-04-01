/** @format */

class Game {
  constructor(config) {
    this.config = config;
    this.stage = null;
    this.pacman = null;
    this.level = 1;
    this.ghosts = [];
    this.directions = ['up', 'down', 'left', 'right'];
  }

  get isCompleted() {
    return this.stage.completed;
  }

  get pause() {
    noLoop();
  }

  get resume() {
    loop();
  }

  addStage() {
    this.stage = new Grid(this.config);
    this.stage.init(this);
  }

  addPacman(row, column) {
    let { size, speed } = this.config.pacman;
    this.pacman = new Pacman(this.stage, row, column, size, speed);
  }

  stop(message) {
    noLoop();
    console.log(message);
    if (game.pacman.lives <= 0) {
      // Display the modal and update the message
      const modal = document.getElementById('myModal');
      const modalMessage = document.getElementById('modalMessage');
      modal.style.display = 'block';
      modalMessage.innerHTML = message;

      // Update the tweet button with the player's score
      const tweetScoreButton = document.getElementById('tweetScore');
      const tweetText = `I scored ${game.pacman.points} points in Pacman!`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
      )}`;
      tweetScoreButton.setAttribute(
        'onclick',
        `window.open('${tweetUrl}', '_blank')`
      );
    }
  }

  resetGhosts() {
    this.ghosts.forEach((ghost) => game.resetUnit(ghost));
  }

  resetPacman() {
    this.addPacman(this.pacman.startRow, this.pacman.startColumn);
  }

  resetPacmanPosition() {
    this.resetUnit(this.pacman);
  }

  resetStage() {
    this.addStage(this.stage.pattern);
  }

  resetUnit(unit) {
    unit.row = unit.startRow;
    unit.column = unit.startColumn;
    unit.cell = unit.startCell;
    unit.target = null;
    unit.isMoving = null;
    this.direction = null;
    unit.position = new p5.Vector(unit.cell.center.x, unit.cell.center.y);
    unit.velocity.mult(0);
    unit.grid = this.stage;
  }

  resetGame() {
    this.ghosts = [];
    game.level = 1;
    this.resetStage();
    this.resetPacman();
    loop();
  }

  resetLevel() {
    this.resetGhosts();
    this.resetPacmanPosition();
    loop();
  }

  nextLevel() {
    this.level++;
    this.ghosts = [];
    this.resetStage();
    this.resetPacmanPosition();
    loop();
  }

  showStats(x, y) {
    fill(255);
    noStroke();
    text('Points: ' + this.pacman.points, x, y);
    text('Lives: ' + this.pacman.lives, x, y + 20);
    text('Level: ' + this.level, x, y + 40);
  }

  checkPower() {
    if (this.pacman.hasPower && !this.pacman.powerUsed) {
      if (this.powerTimeout) clearTimeout(this.powerTimeout);

      this.pacman.powerUsed = true;
      this.pacman.powerUp();

      this.powerTimeout = setTimeout(() => {
        this.pacman.hasPower = false;
        this.pacman.powerUsed = false;
        this.pacman.powerDown();
        this.ghosts.forEach((ghost) => ghost.normal());
        clearTimeout(this.powerTimeout);
      }, 10000);

      this.ghosts.forEach((ghost) => ghost.flee());
    }
  }

  checkCollision(ghost) {
    if (ghost.catch(this.pacman)) {
      if (ghost.isFleeing) {
        this.pacman.points += 20;
        this.resetUnit(ghost);
        ghost.normal();
      } else {
        if (this.pacman.lives-- == 0) {
          this.stop('Game over.');
          this.resetGame();
        } else {
          this.stop('You died.');
          this.resetLevel();
        }
      }
    }
  }

  checkCompleted() {
    if (this.isCompleted) {
      this.stop('Completed.');
      this.nextLevel();
    }
  }
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}
