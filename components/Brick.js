/** @format */

class Brick extends Cell {
  constructor(...props) {
    super(...props);
  }

  show() {
    this.showBorders();
    fill(color('rgba(0, 0, 0, 0.5)'));
    rectMode(CENTER);
    rect(this.center.x, this.center.y, this.size, this.size);
  }
}
