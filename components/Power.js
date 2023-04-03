/** @format */

class Power extends Cell {
  constructor(...props) {
    super(...props);
    this.isVisited = false;
    this.image = loadImage('eth.png');
  }

  show() {
    noStroke();
    this.showBorders();

    if (!this.isVisited) {
      image(this.image, this.center.x - 15, this.center.y - 15, 30, 30);
      // Replace the ellipse function with the image function
    }
  }
}
