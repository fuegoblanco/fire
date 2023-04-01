/** @format */

class Entity {
  constructor(grid, row, column, size = 40, speed = 3) {
    this.grid = grid;
    this.row = row;
    this.column = column;
    this.size = size;
    this.speed = speed;

    this.cellIndex = this.getIndex(this.row, this.column);
    this.cell = this.grid.grid[this.cellIndex];
    this.x = this.cell.center.x;
    this.y = this.cell.center.y;

    this.direction = null;
    this.isMoving = false;
    this.target = null;

    this.position = new p5.Vector(this.x, this.y);
    this.velocity = new p5.Vector(0, 0);

    this.startRow = this.row;
    this.startColumn = this.column;
    this.startCellIndex = this.cellIndex;
    this.startCell = this.grid.grid[this.startCellIndex];
  }

  getIndex(row, column) {
    if (row < 0 || row > this.grid.rows - 1) return false;
    if (column < 0 || column > this.grid.columns - 1) return false;
    return row * this.grid.columns + column;
  }

  setPosition(cell) {
    this.row = cell.row;
    this.column = cell.column;
    this.x = cell.center.x;
    this.y = cell.center.y;
    this.position = new p5.Vector(cell.center.x, cell.center.y);
  }

  checkDirection(direction) {
    let row = this.row;
    let column = this.column;

    if (direction == 'left') column--;
    if (direction == 'right') column++;
    if (direction == 'up') row--;
    if (direction == 'down') row++;

    const index = this.getIndex(row, column);
    const cell = this.grid.grid[index];

    if (!cell || cell.type == 'brick') return false;
    else if (this.isPacman && cell.type == 'door') return false;
    else return { column, row, index, cell };
  }

  steer(direction) {
    if (this.checkDirection(direction)) {
      this.direction = direction;
    }
  }

  update() {
    if (!this.isMoving) {
      let next = this.checkDirection(this.direction);
      if (next) this.target = next.cell;
      else this.target = null;
    }
  }
}
