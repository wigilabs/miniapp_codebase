import {CuentaModel, PerfilModel, StorageKey, StorageModel, VersionesModel} from "../../common/domain/index";
import {StoragePort} from "../../common/aplication/index";
import {ValidationsPort} from "../../common/testing/validations.port";

export class AppUseCase {
	constructor() {
		this.storagePort = StoragePort.getInstance;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	limpiarStorage() {
		this.storagePort.limpiar();
	}

	iniciarStorageCuenta() {
		this.storagePort.agregar(new StorageModel(StorageKey.cuenta, CuentaModel.getInstance));
	}

	inicializarStorageUsuario() {
		this.storagePort.agregar(new StorageModel(StorageKey.usuario, PerfilModel.getInstance));
	}

	inicializarStorageVersiones() {
		this.storagePort.agregar(new StorageModel(StorageKey.versiones, new VersionesModel()));
	}
}
