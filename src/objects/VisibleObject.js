/**
 * @abstract
 */
class VisibleObject {
	/**
	 * @param {Screen} screen   The screen where object belongs to
	 * @param {Vector3} pos     Top-left position of object with z-index
	 * @param {Vector2} size
	 */
	constructor(screen, pos, size) {
		this.screen = screen;
		this.pos = pos;
		this.size = size;
	}

	getCanvas() {
		return this.screen.getCanvas();
	}

	/**
	 * @abstract
	 * @param canvas
	 */
	render(canvas) {
		throw new Error('VisibleObject must implement render()');
	}

	/**
	 * Checks if a point is inside the object.
	 * @abstract
	 * @param {Vector2} vec
	 * @returns boolean
	 */
	isInside(vec) {
		return (this.pos.x < vec.x && vec.x < this.pos.x + this.size.x)
			&& (this.pos.y < vec.y && vec.y < this.pos.y + this.size.y);
	}
}

export default VisibleObject;
