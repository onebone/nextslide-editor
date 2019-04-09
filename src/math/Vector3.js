class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * Returns vectors between two vectors.
	 * @param {Vector3} vec
	 * @returns {number}
	 */
	distance(vec) {
		return Math.hypot(vec.x - this.x, vec.y - this.y, vec.z - this.z);
	}

	/**
	 * Clones instance as Vector3.
	 * @returns {Vector3}
	 */
	asVector3() {
		return new Vector3(this.x, this.y, this.z);
	}
}

export default Vector3;
