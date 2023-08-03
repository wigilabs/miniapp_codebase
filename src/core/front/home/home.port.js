import {HomeUseCase} from "./home.useCase";
import {ReqAccountIdModel, ResponseModel} from "../../common/domain/index";

export class HomePort {
	constructor() {
		this.useCase = new HomeUseCase();
	}

	async setDataInicial() {
		// Traer texto del data
		const infoBienvenida = this.useCase.mensajeBienvenida();
		const texto1 = infoBienvenida.info;
		// Traer info del storage
		const infoStorage = await this.useCase.obtenerStorageVersiones();
		const texto2 = infoStorage.info.info.mensaje_orden_razonada;
		// Traer info del servicio
		const infoServicio = await this.useCase.wsPrueba(new ReqAccountIdModel("3101234567"));
		// Console.log(infoServicio);

		if (infoServicio.error) {
			/* Retorna completo el responsemodel del servicio
			   return infoServicio; */

			// Retorna un responsemodel si se hace lógica en la visual
			return new ResponseModel({texto1, texto2, showError: true, error: infoServicio.info});
		}

		// Tratar la respuesta del servicio para devolver lo que se requiera
		return new ResponseModel({texto1, texto2, servicio: infoServicio.info});
	}
}
