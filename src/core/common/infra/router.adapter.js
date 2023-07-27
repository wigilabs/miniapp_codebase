import {navigate, navigateBack, redirect} from "../../../scripts/my";
import {ValidationsPort} from "../testing/validations.port";

export class RouterAdapter {
	constructor() {
		this.redirectMy = redirect;
		this.navigateMy = navigate;
		this.navigateBackMy = navigateBack;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	redirect(url) {
		this.redirectMy(url);
	}

	navigate(url) {
		this.navigateMy(url);
	}

	navigateBack() {
		this.navigateBackMy();
	}
}
