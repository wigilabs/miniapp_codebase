import {clearStorage, getStorage, removeStorage, setStorage} from "../../../scripts/my";
import {ValidationsPort} from "../testing/validations.port";

export class StorageAdapter {
	constructor() {
		this.clearMy = clearStorage;
		this.setMy = setStorage;
		this.getMy = getStorage;
		this.removeMy = removeStorage;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	clearr() {
		this.clearMy();
	}

	sett(infoStorage) {
		this.setMy(infoStorage.key, infoStorage.info);
	}

	async gett(key) {
		return await this.getMy(key);
	}

	removee(key) {
		this.removeMy(key);
	}
}
