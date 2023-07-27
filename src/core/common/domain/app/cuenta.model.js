import {ValidationsPort} from "../../testing/validations.port";

export class CuentaModel {
	constructor(linea = {}) {
		this.AccountId = linea.AccountId || "";
		this.LineOfBusiness = linea.LineOfBusiness || "";
		this.alias = linea.alias || "";
		this.token = linea.token || "";
		this.info = linea.info || {};
		this.texto = linea.texto || "";

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new CuentaModel();
		}
		return this.instance;
	}

	update(linea = {}) {
		this.AccountId = linea.AccountId || "";
		this.LineOfBusiness = linea.LineOfBusiness || "";
		this.alias = linea.alias || "";
		this.token = linea.token || "";
		this.info = linea.info || {};
		this.texto = linea.texto || "";

		return this;
	}
}
