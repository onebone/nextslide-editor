import Objects from './Objects';
import Circle from './object/shape/Circle';
import Vector3 from './math/Vector3';
import globals from './globals';

const f = require('fabric').fabric;
const canvas = new f.StaticCanvas('canvas');

const objs = new Objects(canvas);

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
