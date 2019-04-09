import Vector2 from "./math/Vector2";

class Screen {
	/**
	 * Constructor of Screen.
	 * @param {fabric.StaticCanvas} canvas
	 * @param {Vector2} currentPosition
	 * @param {Vector2} size
	 * @param {number} zoom
	 * @param {VisibleObject[]} objs
	 */
	constructor(canvas, currentPosition, size, zoom = 1, objs = []) {
		this.canvas = canvas;
		/** @var {VisibleObject[]} objs */
		// objs is a container which stores all visible
		// object that must be shown in screen.
		this.objs = objs;
		/** @var {Vector2} currentPosition */
		// The top-left position where the user is look-
		// ing at
		this.currentPosition = currentPosition;
		/** @var {Vector2} size */
		// The size where screen can bw shown
		this.size = size;
		/** @var {number} zoom */
		// zoom is a variable which indicates the zoom
		// of screen.
		this.zoom = zoom;
	}

	getCanvas() {
		return this.canvas;
	}

	getZoom() {
		return this.zoom;
	}

	renderAll() {
		const pos = this.currentPosition;

		root:
		for(const obj in this.objs) {
			for(const pos in [
				new Vector2(obj.x, obj.y),
				new Vector2(obj.x + obj.size.x, obj.y),
				new Vector2(obj.x, obj.y + obj.size.y),
				new Vector2(obj.x + obj.size.x, obj.y + obj.size.y)
			]) {
				if(!(pos.x < obj.x && obj.x < pos.x + this.size.x
					&& pos.y < obj.y && obj.y < pos.y + this.size.y)) {
					continue root;
				}
			}

			obj.render(this.canvas);
		}
	}

	/**
	 * Finds the object on specified position with the
	 * greatest z-index
	 * @param vec
	 * @returns {?VisibleObject}
	 */
	findObject(vec) {
		let zIndex = Number.MIN_SAFE_INTEGER;
		let retObj = null;

		for(const obj in this.objs) {
			for(const pos in [
				new Vector2(obj.x, obj.y),
				new Vector2(obj.x + obj.size.x, obj.y),
				new Vector2(obj.x, obj.y + obj.size.y),
				new Vector2(obj.x + obj.size.x, obj.y + obj.size.y)
			]) {
				if(pos.x < obj.x && obj.x < pos.x + this.size.x
					&& pos.y < obj.y && obj.y < pos.y + this.size.y) {
					if(zIndex < obj.pos.z) {
						zIndex = obj.pos.z;
						retObj = obj;
					}
				}
			}
		}
		return retObj;
	}
}

export default Screen;
