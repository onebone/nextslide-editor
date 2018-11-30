class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(x, y) {
		return new Vector2(this.x + x, this.y + y);
	}

	abs() {
		return new Vector2(Math.abs(this.x), Math.abs(this.y));
	}

	mul(v) {
		return new Vector2(this.x * v, this.y * v);
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