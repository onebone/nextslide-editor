class Objects {
	constructor(canvas) {
		this.canvas = canvas;

		this.objs = [];
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
			if(obj.isInside(pos)) {
				if(obj.z >= zIndex) {
					picked = obj;

					zIndex = obj.z;
				}
			}else{
				const anchor = obj.checkAnchors(pos);
				if(anchor !== null) {
					picked = obj;
					zIndex = Infinity;
				}
			}
		});

		return picked;
	}

	render() {
		let hasClosed = false;

		this.objs.forEach(obj => {
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