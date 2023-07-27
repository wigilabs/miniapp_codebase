import {
	AppUrlKey,
	HttpCodesKey,
	MiClaroKey,
	ResponseModel,
	StorageKey,
	StorageModel,
	VersionesModel
} from "../../common/domain/index";
import {HttpPort, MiclaroPort, RouterPort, StoragePort, VisualPort} from "../../common/aplication/index";
import dataPage from "./splash.data";
export class SplashUseCase {
	constructor() {
		this.miclaroPort = new MiclaroPort();
		this.routerPort = RouterPort.getInstance;
		this.httpPort = HttpPort.getInstance;
		this.storagePort = StoragePort.getInstance;
		this.visualPort = VisualPort.getInstance;
		this.data = dataPage;
	}

	async consumirServicioVersiones() {
		try {
			const request = await this.miclaroPort.getRequest({method: "GET", servicio: MiClaroKey.services.versiones});
			return new ResponseModel(await this.httpPort.execute(request));
		} catch (err) {
			return new ResponseModel(this.httpPort.errorHandler(err), true, HttpCodesKey.SERVER_ERROR);
		}
	}

	guardarStorageVersiones(infoVersiones) {
		this.storagePort.agregar(new StorageModel(StorageKey.versiones, new VersionesModel(infoVersiones)));
		return new ResponseModel();
	}

	setDataInicial() {
		return new ResponseModel({
			textos: this.data.textos
		});
	}

	redirectLogin() {
		this.routerPort.redirect(AppUrlKey.login);
	}

	mostrarAlerta(response) {
		if (typeof response.info !== "object" && response.info !== false) {
			this.visualPort.alert({msg: response.info});
		}
		return response;
	}
}
