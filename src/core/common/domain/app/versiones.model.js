import {ValidationsPort} from "../../testing/validations.port";

export class VersionesModel {
	constructor(infoVersiones) {
		if (infoVersiones) {
			for (const info in infoVersiones) {
				if (infoVersiones[info]) {
					this[info] = infoVersiones[info];
				}
			}
		} else {
			this.estado = 1;
			this.mensaje = "ok";
			this.splash = "";
			this.token = "";
		}

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
