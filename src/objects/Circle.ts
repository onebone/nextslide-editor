import VisibleObject from "./VisibleObject";
import Interactable from "./Interactable";
import Vector2 from "../math/Vector2";
import {StaticCanvas} from "fabric/fabric-impl";

// TODO implement Circle class
class Circle extends VisibleObject implements Interactable {
	isInside(vec: Vector2): boolean {
		return false;
	}

	onMove(dx: number, dy: number): void {
	}

	onRelease(dx: number, dy: number): void {
	}

	onTouch(x: number, y: number): void {
	}

	render(canvas: StaticCanvas): void {
	}
}

export default Circle;
