/** @format */

class Pacman extends Entity {
  constructor(...props) {
    super(...props);
    this.pac = loadImage('bot.png');
    this.size = 40;
    this.image = this.pac;
    this.points = 0;
    this.lives = 3;
    this.hasPower = false;
    this.powerUsed = false;
    this.isPacman = true;

    this.normalSize = this.size;
    this.normalSpeed = this.speed;

    this.powerSize = this.normalSize + 5;
    this.powerSpeed = this.normalSpeed + 3;

    this.eat(this.cell);
  }

  show() {
    image(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  eat(cell) {
    if (!cell.isVisited) {
      cell.isVisited = true;

      if (cell.type == 'coin') {
        this.points++;
        this.grid.coins--;
      }

      if (cell.type == 'power') {
        this.hasPower = true;
        this.powerUsed = false;
      }

      if (cell.type == 'goThrough') {
        cell.isVisited = false;

        const next = this.grid.opens.find(({ row, column }) => {
          return row == cell.row && column != cell.column;
        });

        if (next) {
          this.setPosition(next);
          this.target = null;
          this.velocity.mult(0);
        }
      }
    }
  }

  powerUp() {
    this.speed = this.powerSpeed;
    this.size = this.powerSize;
  }

  powerDown() {
    this.speed = this.normalSpeed;
    this.size = this.normalSize;
  }

  move() {
    if (this.target && this.direction) {
      let desired = p5.Vector.sub(this.target.center, this.position);

      if (desired.mag() <= 1) {
        this.eat(this.target);
        if (this.target) {
          this.column = this.target.column;
          this.row = this.target.row;
        }
        this.isMoving = false;
        return;
      }

      desired.limit(this.speed);
      this.isMoving = true;
      this.position.add(desired);
    } else {
      this.isMoving = false;
    }
  }
}
