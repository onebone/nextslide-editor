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
	 * @param {MagnificationInfo} mag
	 */
	constructor(id, pos, size, mag) {
		super(pos.x, pos.y, pos.z);

		this.id = id;
		this.anchors = [];
		this.size = size;
		this.mag = mag;

		this.selected = false;

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
		this.x += dx / this.mag.value;
		this.y += dy / this.mag.value;

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
		const pos = this.mag.convert(this);
		const size = this.size.mul(this.mag.value);

		ANCHORS.forEach(v => {
			const dx = v & 0b0011;
			const dy = (v & 0b1100) >>> 2;

			const a = new Anchor(
				this,
				globals.shapeId++,
				v,
				new Vector3(
					pos.x + dx * size.x/2 - config.AnchorSize/2,
					pos.y + dy * size.y/2 - config.AnchorSize/2,
					globals.topZIndex
				)
			);

			this.anchors.push(a);
		});

		globals.topZIndex++;
	}

	select() {
		this.selected = true;
		this.showAnchors();
	}

	unselect() {
		this.selected = false;
		this.removeAnchors();
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
			case 4: case 6:
				dy = 0;
				break;
			case 1: case 9:
				dx = 0;
				break;
		}

		let posX = 0, posY = 0;
		let sizeX = dx, sizeY = dy;

		if([0, 4, 8].includes(anchorId)) {
			posX = dx;
			sizeX = -sizeX;
		}

		if([0, 1, 2].includes(anchorId)) {
			posY = dy;
			sizeY = -sizeY;
		}

		this.x += posX / this.mag.value;
		this.y += posY / this.mag.value;

		this.size.x += sizeX / this.mag.value;
		this.size.y += sizeY / this.mag.value;

		this.repositionAnchors();

		this.onResize(dx, dy);
	}

	repositionAnchors() {
		const pos = this.mag.convert(this);
		const size = this.size.mul(this.mag.value);

		this.anchors.forEach(a => {
			const id = a.anchorId;

			const dx = id & 0b0011;
			const dy = (id & 0b1100) >>> 2;

			a.x = pos.x + dx * size.x/2 - config.AnchorSize/2;
			a.y = pos.y + dy * size.y/2 - config.AnchorSize/2;

			a.updateShape();
		});
	}

	/**
	 * Should be called after rendering child object
	 */
	render(canvas, mag) {
		this._called = true;

		this.anchors.forEach(a => a.render(canvas));
		this.anchors = this.anchors.filter(a => a.closed === false);
	}

	/**
	 * @param {MagnificationInfo} mag
	 */
	onMagnificationChanged(mag) {
		this.mag = mag;
		this.needUpdate = true;
	}

	onResize(dx, dy) {}
}

export default ShapeObject;
