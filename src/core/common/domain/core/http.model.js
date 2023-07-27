import {ValidationsPort} from "../../testing/validations.port";

export class HttpModel {
	constructor(options) {
		this.data = options.query || {};
		this.dataType = options.dataType || "json";
		this.headers = options.headers || {};
		this.method = options.method || "POST";
		this.url = options.url || "http://localhost";

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
