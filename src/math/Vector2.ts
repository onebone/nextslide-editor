class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Returns distance between two vectors.
	 * @param vec
	 */
	distance(vec: Vector2): number {
		return Math.hypot(vec.x - this.x, vec.y - this.y);
	}

	/**
	 * Clones instance as Vector2.
	 */
	asVector2(): Vector2 {
		return new Vector2(this.x, this.y);
	}
}

export default Vector2;
