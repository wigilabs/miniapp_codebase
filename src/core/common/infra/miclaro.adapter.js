import {ValidationsPort} from "../testing/validations.port";
import {getServicios} from "@clarocolombia/claro-super/dist/scripts";

export class MiClaroAdapter {
	constructor() {
		this.servicios = getServicios;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new MiClaroAdapter();
		}
		return this.instance;
	}

	allServices(appid = 0) {
		return this.servicios(appid);
	}
}
