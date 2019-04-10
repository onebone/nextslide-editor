class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	distance(vec: Vector3): number {
		return Math.hypot(vec.x - this.x, vec.y - this.y, vec.z - this.z);
	}

	asVector3(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}
}

export default Vector3;
