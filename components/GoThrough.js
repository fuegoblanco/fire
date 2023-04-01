class GoThrough extends Cell {
	constructor(...props) {
		super(...props);
	}

	show() {
		fill('rgba(255, 255, 255, 0.05)');
		rectMode(CENTER)
		rect(this.center.x, this.center.y, this.size, this.size);
	}
}