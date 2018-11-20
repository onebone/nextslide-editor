import ShapeObject from '../ShapeObject';

class Circle extends ShapeObject {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 * @param {Number} radius
	 */
	constructor(id, pos, radius) {
		super(id, pos);

		this.radius = radius;
	}

	/**
	 * @param pos
	 * @returns {*}
	 */
	isInside(pos) {
		return this.add(this.radius, this.radius).distance(pos) < this.radius;
	}
}