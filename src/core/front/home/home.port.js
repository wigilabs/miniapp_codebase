import {ReqAccountIdModel, ResponseModel} from "../../common/domain/index";
import {HomeUseCase} from "./home.useCase";
import dataPage from "./home.data";

export class HomePort {
	constructor() {
		this.data = dataPage;
		this.useCase = new HomeUseCase();
	}

	getDataInicial() {
		return new ResponseModel(this.data);
	}

	async getInfo() {
		// Traer texto del data

		const infoBienvenida = this.useCase.mensajeBienvenida();
		const infoData = infoBienvenida.info;

		// Traer info del storage

		const infoStorage = await this.useCase.obtenerStorageVersiones();
		const dataStorage = infoStorage.info.info.mensaje_orden_razonada;

		// Traer info del servicio

		const infoServicio = await this.useCase.wsPrueba(new ReqAccountIdModel(this.data.constantes.numero));

		// Console.log(infoServicio);

		// Cambiar data del template

		this.data.tempData.mostrarA = true;

		const dataResponse = {...this.data, dataStorage, infoData};

		if (infoServicio.error) {
			/* Retorna completo el responsemodel del servicio
			   return infoServicio; */

			// Retorna un responsemodel si se hace lógica en la visual

			return new ResponseModel({...dataResponse, error: infoServicio.info, showError: true});
		}

		// Tratar la respuesta del servicio para devolver lo que se requiera

		return new ResponseModel({...dataResponse, servicio: infoServicio.info});
	}
}
