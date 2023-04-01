class Brick extends Cell {
	constructor(...props) {
		super(...props);
	}

	show() {
		this.showBorders()
		fill(color('rgba(28, 28, 216, 0.1)'));
		rectMode(CENTER)
		rect(this.center.x, this.center.y, this.size, this.size)
	}
}