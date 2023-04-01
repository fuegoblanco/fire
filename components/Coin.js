class Coin extends Cell {
	constructor(...props) {
		super(...props);
		this.isVisited = false;
	}

	show() {
		noStroke();
		this.showBorders();

		if(!this.isVisited) {
			fill('#E9E9E9');
			ellipse(this.center.x, this.center.y, 4, 4);
		}
	}
}