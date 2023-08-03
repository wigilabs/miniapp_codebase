import {ValidationsPort} from "../testing/validations.port";
// Import {getServicios} from "@clarocolombia/claro-super/dist/scripts";
import {listaServicios} from "../../../scripts/endpoints";
export class MiClaroAdapter {
	constructor() {
		this.servicios = listaServicios;

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
		// Return this.servicios(appid);
		return this.servicios;
	}
}
