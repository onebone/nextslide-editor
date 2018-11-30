class Objects {
	constructor(canvas) {
		this.canvas = canvas;

		this.objs = [];
	}

	/**
	 * Flush selection which
	 */
	flushSelection() {
		this.objs.forEach(obj => {
			obj.removeAnchors();
			obj.selected = false;
		});
	}

	/**
	 * @param {ShapeObject} obj
	 */
	addObject(obj) {
		this.objs.push(obj);
	}

	/**
	 * Picks object from position
	 * @param {Vector2} pos
	 */
	pickObject(pos) {
		let zIndex = -Infinity;
		let picked = null;

		this.objs.forEach(obj => {
			const anchor = obj.checkAnchors(pos);
			if(anchor !== null) {
				picked = anchor;
				zIndex = Infinity;
			}else if(obj.isInside(pos)) {
				if(obj.z >= zIndex) {
					picked = obj;

					zIndex = obj.z;
				}
			}
		});

		return picked;
	}

	render() {
		let hasClosed = false;

		this.objs.forEach(obj => {
			if(obj.x < 0 || obj.y < 0) { // omit shape if not need to
				if(obj.x + obj.size.x < 0 || obj.y + obj.size.y < 0) {
					return;
				}
			}

			obj._called = false;
			obj.render(this.canvas);
			if(obj._called === false) {
				throw new Error('super.render() not called');
			}

			if(obj.closed) hasClosed = true;
		});

		this.canvas.renderAll();

		if(hasClosed) {
			this.objs = this.objs.filter(obj => obj.closed === false);
		}
	}
}

export default Objects;