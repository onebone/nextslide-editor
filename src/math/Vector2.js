class Vector2 {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * @param {number|Vector2} x
	 * @param {number} y
	 * @returns {Vector2}
	 */
	add(x, y = 0) {
		if(x instanceof Vector2) {
			return new Vector2(this.x + x.x, this.y + x.y);
		}

		return new Vector2(this.x + x, this.y + y);
	}

	/**
	 * Returns distance between two vectors.
	 * @param vec
	 * @returns {number}
	 */
	distance(vec) {
		return Math.hypot(vec.x - this.x, vec.y - this.y);
	}

	/**
	 * Clones instance as Vector2.
	 * @returns {Vector2}
	 */
	asVector2() {
		return new Vector2(this.x, this.y);
	}
}

export default Vector2;
