import {ValidationsPort} from "../../testing/validations.port";

export class SystemModel {
	// TODO: debe ser singleton
	constructor(infoSystem = {}) {
		this.version = infoSystem.version;
		this.modelo = infoSystem.model;
		this.sistema = infoSystem.platform.toLowerCase();
		this.sitemaVersion = infoSystem.system;
		this.wifi = infoSystem.wifiEnabled;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
