import {createWebViewContext, hideLoading, showAlert, showLoading} from "../../../scripts/my";
import {ValidationsPort} from "../testing/validations.port";

export class VisualAdapter {
	constructor() {
		this.alertmy = showAlert;
		this.loadingmy = showLoading;
		this.hideLoadingmy = hideLoading;
		this.createWebViewContext = createWebViewContext;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	alert(alertInfo = {msg: "", title: ""}) {
		this.alertmy(alertInfo);
	}

	createWebViewContext(idwb) {
		return this.createWebViewContext(idwb);
	}

	loading(msg) {
		this.loadingmy(msg);
	}

	hideLoading() {
		this.hideLoadingmy();
	}
}
