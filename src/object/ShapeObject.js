import Vector3 from '../math/Vector3';

class ShapeObject extends Vector3 {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 */
	constructor(id, pos) {
		super(pos.x, pos.y, pos.z);

		this.id = id;

		this.needUpdate = true;
		/**
		 * Whether this object is requested to be shown
		 * This object will be updated on next render update
		 * @type {boolean}
		 */
		this.currentlyShown = true;

		this.closed = false;
	}

	isInside() {
		return false;
	}

	close() {
		this.closed = true;
		this.currentlyShown = false;

		this.needUpdate = true;
	}

	show() {
		this.needUpdate = this.currentlyShown === false;

		this.currentlyShown = true;
	}

	hide() {
		this.needUpdate = this.currentlyShown === true;

		this.currentlyShown = false;
	}

	render() {}
}

export default ShapeObject;
