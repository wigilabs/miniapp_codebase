import {AppUseCase} from "./app.useCase";
import {ValidationsPort} from "../../common/testing/validations.port";

export class AppPort {
	constructor() {
		this.useCase = new AppUseCase();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	clearStorage() {
		this.useCase.limpiarStorage();
	}

	initStorage() {
		this.useCase.iniciarStorageCuenta();
		this.useCase.inicializarStorageUsuario();
		this.useCase.inicializarStorageVersiones();
	}
}
