import Vector3 from '../math/Vector3';
import Anchor from './Anchor';
import globals from '../globals';
import config from '../config';

const ANCHORS = [
	0, 1, 2,
	4,    6,
	8, 9, 10
];

class ShapeObject extends Vector3 {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 * @param {Vector2} size
	 */
	constructor(id, pos, size) {
		super(pos.x, pos.y, pos.z);

		this.id = id;
		this.anchors = [];
		this.size = size;

		this.needUpdate = true;
		/**
		 * Whether this object is requested to be shown
		 * This object will be updated on next render update
		 * @type {boolean}
		 */
		this.currentlyShown = true;

		this.closed = false;

		/**
		 * This variable is for checking whether super.render()
		 * is called from child. It will throw error if not
		 * called.
		 * @type {boolean}
		 */
		this._called = false;
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;

		this.anchors.forEach(a => {
			a.onParentMove(dx, dy);
		});

		this.needUpdate = true;
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

	showAnchors() {
		ANCHORS.forEach(v => {
			const dx = v & 0b0011;
			const dy = (v & 0b1100) >>> 2;

			const a = new Anchor(
				this,
				globals.shapeId++,
				v,
				new Vector3(
					this.x + dx * this.size.x/2 - config.AnchorSize/2,
					this.y + dy * this.size.y/2 - config.AnchorSize/2,
					globals.topZIndex
				)
			);

			this.anchors.push(a);
		});

		globals.topZIndex++;
	}

	removeAnchors() {
		this.anchors.forEach(a => a.close());
	}

	checkAnchors(pos) {
		for(const a of this.anchors) {
			if(a.isInside(pos)) {
				return a;
			}
		}
		return null;
	}

	_onAnchorMove(anchorId, dx, dy) {
		switch(anchorId) {
			case 0:
				dx = -dx;
				dy = -dy;
				break;
			case 4:
				dx = -dx;
				// fallthrough
			case 6:
				dy = 0;
				break;
			case 1:
				dy = -dy;
				// fallthrough
			case 9:
				dx = 0;
				break;
		}

		this.size.x += dx;
		this.size.y += dy;

		this.onResize(dx, dy);
	}

	/**
	 * Should be called after rendering child object
	 */
	render(canvas) {
		this._called = true;

		this.anchors.forEach(a => a.render(canvas));
		this.anchors = this.anchors.filter(a => a.closed === false);
	}

	onResize(dx, dy) {}
}

export default ShapeObject;
