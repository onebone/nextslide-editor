import config from '../config';
import Vector2 from '../math/Vector2';

const f = require('fabric').fabric;

class RangeView {
	constructor(first, pos) {
		this.first = first;
		this.pos = pos;

		this.obj = new f.Rect();
		this.updateShape();
		this.currentlyShown = false;
	}

	updateShape() {
		this.obj.set({
			fill: config.RangeViewColor,
			left: Math.min(this.pos.x, this.first.x),
			top: Math.min(this.pos.y, this.first.y),
			width: Math.abs(this.pos.x - this.first.x),
			height: Math.abs(this.pos.y - this.first.y),

			stroke: config.RangeViewStroke,
			strokeWidth: config.RangeViewWidth,
			strokeDashArray: [5, 5]
		});
	}

	render(canvas) {
		canvas.remove(this.obj);

		if(this.currentlyShown) {
			canvas.add(this.obj);
		}
	}

	get min() {
		return new Vector2(Math.min(this.pos.x, this.first.x), Math.min(this.pos.y, this.first.y));
	}

	get max() {
		return new Vector2(Math.max(this.pos.x, this.first.x), Math.max(this.pos.y, this.first.y));
	}
}

export default RangeView;