import Objects from './Objects';
import MouseInfo from './MouseInfo';
import Circle from './object/shape/Circle';
import Vector2 from './math/Vector2';
import Vector3 from './math/Vector3';
import globals from './globals';

const f = require('fabric').fabric;
const canvas = new f.StaticCanvas('canvas');

const objs = new Objects(canvas);

const mouse = new MouseInfo();

/// TEST CODE
const circle = new Circle(globals.shapeId++, new Vector3(100, 100, globals.topZIndex++), 100);
objs.addObject(circle);
objs.render(canvas);

function resize() {
	canvas.setWidth(window.innerWidth);
	canvas.setHeight(window.innerHeight);
	canvas.renderAll();
}

addEventListener('resize', () => {
	resize();
});

resize();

addEventListener('mousedown', e => {
	const pos = new Vector2(e.clientX, e.clientY);

	const obj = objs.pickObject(pos);
	mouse.obj = obj;
	mouse.pos = pos;
	mouse.down = true;

	if(mouse.obj !== null) {
		obj.showAnchors();
	}

	objs.render();
});

addEventListener('mousemove', e => {
	if(mouse.down) {
		// TODO: move
	}
});

addEventListener('mouseup', e => {
	mouse.down = false;

	if(mouse.obj !== null) {
		mouse.obj.removeAnchors();
	}

	mouse.obj = null;
});