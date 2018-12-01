class MagnificationInfo {
	/**
	 *
	 * @param {Number} value
	 * @param {Vector2} edge Absolute position of top left screen
	 */
	constructor(value, edge) {
		this.value = value;
		this.edge = edge;
	}

	/**
	 * @param {Vector2|Vector3} pos
	 * @returns {Vector2|Vector3}
	 */
	convert(pos) {
		return pos.mul(this.value).add(-this.edge.x, -this.edge.y);
	}
}

export default MagnificationInfo;
