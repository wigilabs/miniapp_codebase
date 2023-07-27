import {HttpModel, WhaleKey} from "../domain/index";
import {HttpAdapter} from "../infra/index";
import {ValidationsPort} from "../testing/validations.port";
import {VisualPort} from "./visual.port";

export class HttpPort {
	constructor() {
		this.httpAdapter = new HttpAdapter();
		this.whaleKey = WhaleKey;
		this.visualPort = VisualPort.getInstance;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new HttpPort();
		}
		return this.instance;
	}

	async execute(requestConfig = new HttpModel()) {
		try {
			this.visualPort.loading();
			const resp = await this.httpAdapter.execute(requestConfig);
			this.visualPort.hideLoading();
			return resp;
		} catch (err) {
			this.visualPort.hideLoading();
			throw err;
		}
	}

	errorHandler(err) {
		if (err.error && err.errorMessage) {
			const whaleErr = this.whaleKey.errors.filter((wErr) => wErr.code === err.error);
			err = whaleErr ? whaleErr[0].text : err.errorMessage;
		}
		return err;
	}
}
