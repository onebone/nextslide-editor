import VisibleObject from "./VisibleObject";

/**
 * @abstract
 */
class Interactable extends VisibleObject {
	/**
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 */
	onTouch(x, y) {

	}

	/**
	 * @abstract
	 * @param {number} dx
	 * @param {number} dy
	 */
	onMove(dx, dy) {

	}

	/**
	 * @abstract
	 * @param x
	 * @param y
	 */
	onRelease(x, y) {

	}
}
