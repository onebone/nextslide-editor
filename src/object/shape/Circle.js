import ShapeObject from '../ShapeObject';
import Config from '../../config';
import Vector2 from '../../math/Vector2';

const f = require('fabric').fabric;

class Circle extends ShapeObject {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 * @param {Vector2} size
	 * @param {String} fill
	 */
	constructor(id, pos, size, fill = Config.DEFAULT_FILL_COLOR) {
		super(id, pos, size);

		this.fill = fill;

		this.obj = new f.Ellipse({
			rx: this.size.x/2,
			ry: this.size.y/2,
			angle: 0,
			fill: this.fill,
			left: this.x,
			top: this.y
		});
	}

	move(dx, dy) {
		super.move(dx, dy);

		this.obj.set({
			left: this.x, top: this.y
		});
	}

	isInside(pos) {
		pos = pos.asVector2();

		const c = Math.sqrt(Math.abs(this.size.x * this.size.x - this.size.y * this.size.y))/2;
		const axis = Math.max(this.size.x, this.size.y);

		let dx = 0, dy = 0;
		if(this.size.x > this.size.y) {
			dx = c;
		}else{
			dy = c;
		}

		const p = this.asVector2().add(this.size.x/2, this.size.y/2);

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
		this.obj.set({
			rx: this.size.x/2,
			ry: this.size.y/2
		});

		console.log('resize', dx, dy);

		this.needUpdate = true;
	}
}

export default Circle;