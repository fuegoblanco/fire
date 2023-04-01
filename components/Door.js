class Door extends Cell {
	constructor(...props) {
		super(...props);
	}

	show() {
		rectMode(CENTER)
		stroke(color(255, 255, 255, 100))
		line(this.x, this.y + 2, this.x + this.size, this.y + 2);
	}
}