import {ValidationsPort} from "../testing/validations.port";
import {myrequest} from "../../../scripts/my";

export class HttpAdapter {
	constructor() {
		this.httpClient = myrequest;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	execute(requestConfig) {
		try {
			return this.httpClient(requestConfig);
		} catch (err) {
			return false;
		}
	}
}
