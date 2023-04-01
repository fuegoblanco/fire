class Power extends Cell {
	constructor(...props) {
		super(...props);
		this.isVisited = false
	}

	show() {
		noStroke();
		this.showBorders()

		if(!this.isVisited) {
			fill('#FFB8AD');
			ellipse(this.center.x, this.center.y, 10, 10);
		}
	}
}