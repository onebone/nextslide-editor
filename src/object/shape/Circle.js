import ShapeObject from '../ShapeObject';
import Config from '../../config';
import Vector2 from '../../math/Vector2';

const f = require('fabric').fabric;

class Circle extends ShapeObject {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 * @param {Vector2} size
	 * @param {MagnificationInfo} mag
	 * @param {String} fill
	 */
	constructor(id, pos, size, mag, fill = Config.DEFAULT_FILL_COLOR) {
		super(id, pos, size, mag);

		this.fill = fill;

		this.obj = new f.Ellipse();
		this.updateShape();
	}

	move(dx, dy) {
		super.move(dx, dy);

		this.updateShape();
	}

	isInside(pos) {
		pos = pos.asVector2();

		const size = this.size.abs().mul(this.mag.value);
		const c = Math.sqrt(Math.abs(size.x * size.x - size.y * size.y))/2;
		const axis = Math.max(size.x, size.y);

		let dx = 0, dy = 0;
		if(size.x > size.y) {
			dx = c;
		}else{
			dy = c;
		}

		const p = this.mag.convert(this.asVector2()).add(this.size.x/2 * this.mag.value, this.size.y/2 * this.mag.value);

		return p.add(dx, dy).distance(pos) + p.add(-dx, -dy).distance(pos) <= axis;
	}

	render(canvas) {
		if(this.needUpdate) { // TODO: hmm...
			canvas.remove(this.obj);

			if(this.currentlyShown) {
				canvas.add(this.obj);
			}

			this.needUpdate = false;
		}

		super.render(canvas);
	}

	onResize(dx, dy) {
		this.updateShape();
	}

	updateShape() {
		const size = this.size.abs().mul(this.mag.value);

		let posX = this.x, posY = this.y;

		if(this.size.x < 0) {
			posX += this.size.x;
		}

		if(this.size.y < 0) {
			posY += this.size.y;
		}

		const pos = this.mag.convert(new Vector2(posX, posY));
		this.obj.set({
			left: pos.x,
			top: pos.y,
			rx: size.x/2,
			ry: size.y/2,
			fill: this.fill,
			angle: 0,
			flipX: this.size.x < 0,
			flipY: this.size.y < 0
		});

		this.needUpdate = true;
	}
}

export default Circle;