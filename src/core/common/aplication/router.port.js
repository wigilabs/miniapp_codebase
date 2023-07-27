import {RouterAdapter} from "../infra/index";
import {ValidationsPort} from "../testing/validations.port";

export class RouterPort {
	static instance;

	constructor() {
		this.adapter = new RouterAdapter();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static get getInstance() {
		if (!this.instance) {
			this.instance = new RouterPort();
		}
		return this.instance;
	}

	navigateBack() {
		this.adapter.navigateBack();
	}

	navigate(url) {
		this.adapter.navigate(url);
	}

	redirect(url) {
		this.adapter.redirect(url);
	}
}
