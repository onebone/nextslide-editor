import Vector3 from '../math/Vector3'

class ShapeObject extends Vector3 {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 */
	constructor(id, pos) {
		super(pos.x, pos.y);

		this.id = id;

		this.closed = false;
	}

	isInside() {
		return false;
	}

	close() {
		this.closed = true;
	}
}

export default ShapeObject;
