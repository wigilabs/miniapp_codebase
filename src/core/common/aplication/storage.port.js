import {StorageAdapter} from "../infra/index";
import {ValidationsPort} from "../testing/validations.port";

export class StoragePort {
	static instance;

	constructor() {
		this.adapter = new StorageAdapter();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static get getInstance() {
		if (!this.instance) {
			this.instance = new StoragePort();
		}
		return this.instance;
	}

	limpiar() {
		this.adapter.clearr();
	}

	agregar(infoStorage) {
		this.adapter.sett(infoStorage);
	}

	async obtener(key) {
		return await this.adapter.gett(key);
	}
}
