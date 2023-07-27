import {ValidationsPort} from "../../testing/validations.port";

export class StorageModel {
	// TODO: optimize
	constructor(key = "", info = {}) {
		this.key = key;
		this.info = info;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
