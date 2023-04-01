/** @format */

class Cell {
  constructor(x, y, row, column, type, size = 20) {
    this.type = type;
    this.size = size;

    this.x = x;
    this.y = y;
    this.row = row;
    this.column = column;

    this.position = new p5.Vector(this.x, this.y);
    this.half = new p5.Vector(this.size / 2, this.size / 2);
    this.center = p5.Vector.add(this.position, this.half);
  }

  showBorders() {
    noFill();
    rectMode(RADIUS);
    stroke(color(255, 255, 255, 2));
    rect(this.x, this.y, this.size, this.size);
  }

  show() {
    this.showBorders();
  }
}
