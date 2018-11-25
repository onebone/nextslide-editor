import Vector2 from './math/Vector2';

class MouseInfo {
	constructor() {
		/**
		 * Whether mouse is currently being clicked
		 * @type {boolean}
		 */
		this.down = false;
		this.pos = new Vector2(0, 0);
		this.obj = null;
	}
}

export default MouseInfo;