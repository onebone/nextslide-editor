interface Interactable {
	onTouch(x: number, y: number): void;
	onMove(dx: number, dy: number): void;
	onRelease(dx: number, dy: number): void;
}

export default Interactable;
