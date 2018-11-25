class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(x, y = null, z = null) {
		if(z === null) z = x;
		if(y === null) y = x;

		return new Vector3(this.x + x, this.y + y, this.z + z);
	}

	/**
	 * @param {Vector3} pos
	 */
	distance(pos) {
		const dx = this.x - pos.x;
		const dy = this.y - pos.y;
		const dz = this.z - pos.z;

		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
}

export default Vector3;
