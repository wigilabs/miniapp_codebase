import {ValidationsPort} from "../testing/validations.port";
import {VisualAdapter} from "../infra/index";

export class VisualPort {
	static instance;

	constructor() {
		this.adapter = new VisualAdapter();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static get getInstance() {
		if (!this.instance) {
			this.instance = new VisualPort();
		}
		return this.instance;
	}

	createWebViewContext(identifier) {
		return this.adapter.createWebViewContext(identifier);
	}

	loading(msg) {
		this.adapter.loading(msg);
	}

	hideLoading() {
		this.adapter.hideLoading();
	}

	alert(props = {msg: "", title: ""}) {
		this.adapter.alert(props);
	}
}
