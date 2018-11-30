import Objects from './Objects';
import ShapeObject from './object/ShapeObject';
import MouseInfo from './MouseInfo';
import MagnificationInfo from './util/MagnificationInfo';
import Circle from './object/shape/Circle';
import Vector2 from './math/Vector2';
import Vector3 from './math/Vector3';
import globals from './globals';

const f = require('fabric').fabric;
const canvas = new f.StaticCanvas('canvas');

const objs = new Objects(canvas);

const mouse = new MouseInfo();

const mag = new MagnificationInfo(1, new Vector2(0, 0));

/// TEST CODE
const circle = new Circle(globals.shapeId++, new Vector3(100, 100, globals.topZIndex++), new Vector2(100, 100), mag);
objs.addObject(circle);

const circle2 = new Circle(globals.shapeId++, new Vector3(200, 200, globals.topZIndex++), new Vector2(100, 100), mag);
objs.addObject(circle2);
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
	mouse.lastPos = mouse.firstPos = pos;
	mouse.down = true;

	if(mouse.obj instanceof ShapeObject) {
		obj.showAnchors();
	}

	objs.render();
});

addEventListener('mousemove', e => {
	if(mouse.down) {
		const pos = new Vector2(e.clientX, e.clientY);

		if(mouse.obj !== null) {
			mouse.obj.move(e.clientX - mouse.lastPos.x, e.clientY - mouse.lastPos.y);
		}

		mouse.lastPos = pos;
		objs.render();
	}
});

addEventListener('mouseup', e => {
	mouse.down = false;

	if(mouse.obj === null) {
		objs.flushSelection();
	}

	mouse.obj = null;

	objs.render();
});
