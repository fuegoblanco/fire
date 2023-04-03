/** @format */

class Game {
  constructor(config) {
    this.timer = 0;
    this.gameDuration = 90000;
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
    this.showStats();
  }

  stop(message) {
    noLoop();
    console.log(message);
   
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
  showStats() {
    const scoreContainer = document.getElementById('score');
    const timeLeft = Math.max(0, this.gameDuration - this.timer);
    scoreContainer.innerHTML = `
   
      <p>SCORE:${this.pacman.points} </p>
      <p>${timeLeft}</p>
    `;
    document.body.appendChild(scoreContainer);
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
      this.showStats();
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
