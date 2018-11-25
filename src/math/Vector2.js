class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(x, y) {
		return new Vector2(this.x + x, this.y + y);
	}

	/**
	 * @param {Vector2} pos
	 */
	distance(pos) {
		const dx = this.x - pos.x;
		const dy = this.y - pos.y;

		return Math.sqrt(dx * dx + dy * dy);
	}

	asVector2() {
		return new Vector2(this.x, this.y);
	}
}

export default Vector2;