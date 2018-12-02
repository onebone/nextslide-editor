import Objects from './Objects';
import ShapeObject from './object/ShapeObject';
import Anchor from './object/Anchor';
import MouseInfo from './MouseInfo';
import MagnificationInfo from './util/MagnificationInfo';
import RangeView from './util/RangeView';
import Circle from './object/shape/Circle';
import Vector2 from './math/Vector2';
import Vector3 from './math/Vector3';
import globals from './globals';

const f = require('fabric').fabric;
const canvas = new f.StaticCanvas('canvas');

const objs = new Objects(canvas);
const mouse = new MouseInfo();
const mag = new MagnificationInfo(1, new Vector2(0, 0));
const rv = new RangeView(new Vector2(0, 0), new Vector2(0, 0));

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

	if(!e.ctrlKey && !(obj instanceof Anchor)) {
		objs.flushSelection();
	}

	mouse.obj = obj;
	mouse.lastPos = mouse.firstPos = pos;
	mouse.down = true;

	if(mouse.obj instanceof ShapeObject) {
		obj.select();
	}else if(mouse.obj === null) {
		rv.pos = rv.first = pos;
		rv.currentlyShown = true;
	}

	objs.render();
});

addEventListener('mousemove', e => {
	if(mouse.down) {
		const pos = new Vector2(e.clientX, e.clientY);

		if(mouse.obj !== null) {
			mouse.obj.move(e.clientX - mouse.lastPos.x, e.clientY - mouse.lastPos.y);
		}else{
			rv.pos = pos;
			rv.updateShape();
			rv.render(canvas);
		}

		mouse.lastPos = pos;
		objs.render();
	}
});

addEventListener('mouseup', e => {
	mouse.down = false;

	if(mouse.obj === null) {
		objs.flushSelection();

		rv.currentlyShown = false;
		rv.render(canvas);

		const min = rv.min;
		const max = rv.max;
		objs.objs.forEach(obj => {
			const leftX = Math.min(obj.x, obj.x + obj.size.x);
			const rightX = Math.max(obj.x, obj.x + obj.size.x);
			const leftY = Math.min(obj.y, obj.y + obj.size.y);
			const rightY = Math.max(obj.y, obj.y + obj.size.y);

			if(
				(min.x - rightX) * (max.x - leftX) < 0
				&& (min.y - rightY) * (max.y - leftY) < 0
			) {
				obj.select();
			}
		});
	}

	mouse.obj = null;

	objs.render();
});
