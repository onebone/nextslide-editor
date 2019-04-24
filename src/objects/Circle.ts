import VisibleObject from "./VisibleObject";
import Interactable from "./Interactable";
import Vector2 from "../math/Vector2";
import {Ellipse, StaticCanvas} from "fabric/fabric-impl";
import {fabric} from 'fabric';
import Screen from "../Screen";
import Vector3 from "../math/Vector3";

// TODO implement Circle class
class Circle extends VisibleObject implements Interactable {
	protected fill: string;

	constructor(screen: Screen, pos: Vector3, size: Vector2, fill: string) {
		super(screen, pos, size);

		this.fill = fill;
	}

	isInside(vec: Vector2): boolean {
		return false;
	}

	onMove(dx: number, dy: number): void {
	}

	onRelease(dx: number, dy: number): void {
	}

	onTouch(x: number, y: number): void {
	}

	get needUpdate(): boolean {
		return false; // TODO
	}

	initializeObject(): fabric.Object {
		return new Ellipse({
			left: this.pos.x,
			top: this.pos.y,
			rx: this.size.x/2,
			ry: this.size.y/2,
			fill: this.fill,
			angle: 0,
			flipX: this.size.x < 0,
			flipY: this.size.y < 0
		});
	}

	update(): void {
		if(this.obj instanceof Ellipse)
			this.obj.set({
				left: this.pos.x,
				top: this.pos.y,
				rx: this.size.x / 2,
				ry: this.size.y / 2,
				fill: this.fill,
				angle: 0,
				flipX: this.size.x < 0,
				flipY: this.size.y < 0
			});
	}
}

export default Circle;
