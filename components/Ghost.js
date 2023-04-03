/** @format */

class Ghost extends Entity {
  constructor(...props) {
    super(...props);
   
    this.images = [
      { normal: loadImage('gator.png'), flee: loadImage('gatorweak.png') },
      { normal: loadImage('fgold.png'), flee: loadImage('fgoldweak.png') },
      { normal: loadImage('snow.png'), flee: loadImage('snowweak.png') },
    ];
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.normalImage = this.images[randomIndex].normal;
    this.fleeImage = this.images[randomIndex].flee;
    this.image = this.normalImage;
    this.size = 60;
    this.isFleeing = false;
    this.directionSteps = 15;
    this.directionPacman = 10;
    this.directions = ['up', 'down', 'right', 'left'];
  }

  show() {
    image(this.image, this.position.x - 20 , this.position.y - 20, this.size, this.size);
  }

  flee() {
    this.image = this.fleeImage;
    this.isFleeing = true;
    this.size = 30;
  }

  normal() {
    this.image = this.normalImage;
    this.isFleeing = false;
    this.size = 60;
  }

  catch(target) {
    return this.row == target.row && this.column == target.column;
  }

  setDirection() {
    if (
      !this.target ||
      !this.direction ||
      (!this.isMoving && this.directionSteps <= 0)
    ) {
      this.direction =
        this.directions[parseInt(random(this.directions.length))];
      this.directionSteps = 15;
    }
  }

  chase(pacman) {
    if (!this.directionPacman) {
      let { x, y } = p5.Vector.sub(this.position, pacman.position);

      if (random() < 0.5) {
        if (y > 0) this.direction = 'up';
        else this.direction = 'down';
      } else {
        if (x > 0) this.direction = 'left';
        else this.direction = 'right';
      }

      this.directionPacman = 10;
    }
  }

  move() {
    if (this.target && this.direction) {
      let desired = p5.Vector.sub(this.target.center, this.position);

      if (desired.mag() <= 1) {
        this.directionSteps--;
        this.directionPacman--;
        this.isMoving = false;
        this.column = this.target.column;
        this.row = this.target.row;
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
