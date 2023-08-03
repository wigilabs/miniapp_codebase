import {HttpCodesKey, MiClaroKey, ResponseModel, StorageKey} from "../../common/domain/index";
import {HttpPort, MiclaroPort, StoragePort} from "../../common/aplication/index";
import dataPage from "./home.data";
export class HomeUseCase {
	constructor() {
		this.data = dataPage;
		this.storagePort = StoragePort.getInstance;
		this.httpPort = HttpPort.getInstance;
		this.miclaroPort = new MiclaroPort();
	}

	mensajeBienvenida() {
		return new ResponseModel(dataPage.textos.mensajebienvenida);
	}

	async obtenerStorageVersiones() {
		return new ResponseModel(await this.storagePort.obtener(StorageKey.versiones));
	}

	async wsPrueba(serviceBody) {
		try {
			const request = await this.miclaroPort.getRequest({serviceBody, servicio: MiClaroKey.services.llavedeprueba});
			return new ResponseModel(await this.httpPort.execute(request));
		} catch (err) {
			return new ResponseModel(this.httpPort.errorHandler(err), true, HttpCodesKey.SERVER_ERROR);
		}
	}
}
