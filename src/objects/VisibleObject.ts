import Vector2 from "../math/Vector2";
import Screen from '../Screen';
import {fabric} from 'fabric';
import Vector3 from "../math/Vector3";

abstract class VisibleObject {
	public static STATUS_HIDDEN: number = 0;
	public static STATUS_VISIBLE: number = 1;

	/** @var screen     The screen where object belongs to */
	private screen: Screen;
	/** @var pos        Top-left position of object with z-index */
	protected absolutePosition: Vector3;
	protected size: Vector2;
	/** @var obj        Fabric canvas object */
	protected obj: fabric.Object;
	/** @var status     Indicates the current status of object */
	protected _status: number = VisibleObject.STATUS_HIDDEN;

	protected constructor(screen: Screen, pos: Vector3, size: Vector2) {
		this.screen = screen;
		this.absolutePosition = pos;
		this.size = size;

		this.obj = this.initializeObject();
	}

	get pos() {
		return this.absolutePosition; // TODO return relative position from screen properties
	}

	get status() {
		return this._status;
	}

	/**
	 * needUpdate() returns if the object has changed from
	 * last render.
	 */
	abstract get needUpdate(): boolean;
	abstract update(): void;

	abstract initializeObject(): fabric.Object;
	abstract isInside(vec: Vector2): boolean;

	get canvas(): fabric.StaticCanvas {
		return this.screen.getCanvas();
	}

	move(dx: number, dy: number) {
		this.pos.x += dx;
		this.pos.y += dy;
	}

	showObject() {
		if(this._status === VisibleObject.STATUS_HIDDEN) {
			this.canvas.add(this.obj);

			this._status = VisibleObject.STATUS_VISIBLE;
		}
	}

	hideObject() {
		if(this._status === VisibleObject.STATUS_VISIBLE) {
			this.canvas.remove(this.obj);

			this._status = VisibleObject.STATUS_HIDDEN;
		}
	}
}

export default VisibleObject;
