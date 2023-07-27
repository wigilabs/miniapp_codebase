import {ValidationsPort} from "../../testing/validations.port";

export class ResponseModel {
	// TODO: Optimize this
	constructor(info = "ok", isError = false, code = 200) {
		if (info.error && info.status && info.errorMessage) {
			isError = false;
			info = info.errorMessage;
			code = info.status;
		}

		this.error = isError;
		this.info = info;
		this.code = code;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
