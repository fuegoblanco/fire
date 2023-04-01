/** @format */

class Coin extends Cell {
  constructor(...props) {
    super(...props);
    this.isVisited = false;
  }

  show() {
    noStroke();
    this.showBorders();

    if (!this.isVisited) {
      fill('#FFD700');
      ellipse(this.center.x, this.center.y, 20, 20);
    }
  }
}
