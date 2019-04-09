import VisibleObject from './VisibleObject';

class Circle extends VisibleObject{
	constructor(screen, pos, size) {
		super(screen, pos, size);
	}

	render(canvas) {
		const c = this.getCanvas();
		
	}
}

export default Circle;
