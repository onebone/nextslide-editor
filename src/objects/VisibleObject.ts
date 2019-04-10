import Vector2 from "../math/Vector2";
import Screen from '../Screen';
import {fabric} from 'fabric';

abstract class VisibleObject {
	/** @var screen     The screen where object belongs to */
	private screen: Screen;
	/** @var pos        Top-left position of object with z-index */
	protected pos: Vector2;
	protected size: Vector2;

	protected constructor(screen: Screen, pos: Vector2, size: Vector2) {
		this.screen = screen;
		this.pos = pos;
		this.size = size;
	}

	abstract render(canvas: fabric.StaticCanvas): void;
	abstract isInside(vec: Vector2): boolean;

	get position(): Vector2 {
		return this.pos;
	}

	get canvas(): fabric.StaticCanvas {
		return this.screen.getCanvas();
	}

	move(dx: number, dy: number) {
		this.pos.x += dx;
		this.pos.y += dy;
	}
}

export default VisibleObject;
