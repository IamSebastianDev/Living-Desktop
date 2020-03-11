/** @format */

class STORE {
	constructor() {
		// create object that holds all the stored key/values on instatiation
		this.store = new Object();
	}

	/*

        methods to store and retrieve data. 
        Right now this is incredible barebones, basically a joke. I'll be working on this for a while.

    */

	set(key, value) {
		this.store[key] = {
			value: value
		};
	}

	get(key) {
		if (this.store[key] != undefined) {
			return this.store[key].value;
		}
	}
}

let store = new STORE();

export { store };
