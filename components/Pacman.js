/** @format */

class Pacman extends Entity {
  constructor(...props) {
    super(...props);
    this.pac = loadImage('40.png');
    this.size = 50;
    this.image = this.pac;
    this.points = 0;
    this.lives = 3;
    this.hasPower = false;
    this.powerUsed = false;
    this.isPacman = true;
    this.isPowerUp = false; // add boolean variable to track power-up state

    this.normalSize = this.size;
    this.normalSpeed = this.speed;

    this.powerSize = this.normalSize + 10;
    this.powerSpeed = this.normalSpeed + 3;

    this.eat(this.cell);
  }
  glow() {
    // Calculate the opacity of the light based on the current time
    const opacity = sin(millis() / 200) * 50 + 100;

    // Reduce the opacity by a factor of 0.99 each frame to make the light gradually fade out
    this.opacity = this.opacity ? this.opacity * 0.99 : opacity;

    // Set the fill color to yellow with the calculated opacity
    fill(243, 246, 244, opacity);

    // Draw an ellipse around the character with a radius slightly larger than the size of the character
    rectMode();
    rect(
      this.position.x + this.size / 2,
      this.position.y + this.size / 2,
      this.size * 0.7,
      this.size * 0.7,
      5
    );
  }

  show() {
    image(this.image, this.position.x - 15, this.position.y - 15 , this.size, this.size);
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
    this.glow();
    this.isPowerUp = true; // set isPowerUp to true
  }

  powerDown() {
    this.hasPower = false;
    this.powerUsed = true;
    this.speed = this.normalSpeed;
    this.size = this.normalSize;
    this.opacity = 0;
    this.isPowerUp = false; // set isPowerUp to false
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
