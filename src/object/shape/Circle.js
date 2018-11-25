import ShapeObject from '../ShapeObject';
import Config from '../../config';

const f = require('fabric').fabric;

class Circle extends ShapeObject {
	/**
	 * @param {Number} id
	 * @param {Vector3} pos
	 * @param {Number} radius
	 * @param {String} fill
	 */
	constructor(id, pos, radius, fill = Config.DEFAULT_FILL_COLOR) {
		super(id, pos);

		this.radius = radius;
		this.fill = fill;

		this.obj = new f.Circle({
			radius: this.radius,
			fill: this.fill,
			left: this.x,
			top: this.y
		});
	}

	isInside(pos) {
		return this.add(this.radius).asVector2().distance(pos) < this.radius;
	}

	render(canvas) {
		if(this.needUpdate) { // TODO: hmm...
			canvas.remove(this.obj);

			if(this.currentlyShown) {
				canvas.add(this.obj);
			}
		}
	}
}

export default Circle;