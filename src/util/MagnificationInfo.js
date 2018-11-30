class MagnificationInfo {
	/**
	 *
	 * @param {Number} mag
	 * @param {Vector2} edge Absolute position of top left screen
	 */
	constructor(mag, edge) {
		this.mag = mag;
		this.edge = edge;
	}

	/**
	 * @param {Vector2|Vector3} pos
	 * @returns {Vector2|Vector3}
	 */
	convert(pos) {
		return pos.mul(this.mag).add(-this.edge.x, -this.edge.y);
	}
}

module.exports = MagnificationInfo;
