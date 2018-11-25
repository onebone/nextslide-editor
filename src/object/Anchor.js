import Vector3 from '../math/Vector3';
import config from '../config';

const f = require('fabric').fabric;

class Anchor extends Vector3 {
	/**
	 * @param {ShapeObject} parent
	 * @param {Number} id
	 * @param {Number} anchorId
	 * @param {Vector3} pos
	 */
	constructor(parent, id, anchorId, pos) {
		super(pos.x, pos.y, pos.z);

		this.parent = parent;

		this.obj = new f.Circle({
			left: pos.x, top: pos.y,
			fill: config.AnchorColor,
			strokeWidth: config.AnchorStrokeWidth,
			stroke: config.AnchorStrokeColor,
			radius: config.AnchorSize
		});

		this.needUpdate = true;
		this.currentlyShown = true;
		this.closed = false;

		this._called = false;
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;

		this.needUpdate = true;

		this.obj.set({
			left: this.x, top: this.y
		});
	}

	/**
	 * Shows anchor to the screen
	 */
	show() {
		this.currentlyShown = true;
		this.needUpdate = true;
	}

	/**
	 * Removes anchor from screen
	 */
	remove() {
		this.currentlyShown = false;
		this.needUpdate = true;
	}

	render(canvas) {
		this._called = true; // for compatibility with ShapeObject

		if(this.needUpdate) {
			canvas.remove(this.obj);

			if(this.currentlyShown) {
				canvas.add(this.obj);
			}

			this.needUpdate = false;
		}
	}

	isInside(pos) {
		return pos.asVector2().distance(this.asVector2()) < config.AnchorSize;
	}

	close() {
		this.closed = true;
		this.needUpdate = true;
		this.currentlyShown = false;
	}
}

export default Anchor;