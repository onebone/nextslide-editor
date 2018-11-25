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

	render() {
		this.objs.forEach(obj => {
			obj.render(this.canvas);
		});

		this.canvas.renderAll();
	}
}

export default Objects;