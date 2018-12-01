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
			obj.unselect();
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
			const pos = obj.mag.convert(obj);
			const size = obj.size.mul(obj.mag.value);
			if(pos.x < 0 && pos.x + size.x < 0
			||  pos.y < 0 && pos.y + size.y < 0) {
				return; // omit shape if not need to
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