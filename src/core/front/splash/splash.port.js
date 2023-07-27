import {SplashUseCase} from "./splash.useCase";
import splashData from "./splash.data";

export class SplashPort {
	constructor() {
		this.useCase = new SplashUseCase();
	}

	async setDataInicial() {
		const servicioVersiones = await this.useCase.consumirServicioVersiones();
		const dataInicial = this.useCase.setDataInicial();

		if (servicioVersiones.error) {
			return this.useCase.mostrarAlerta(servicioVersiones);
		}

		if (dataInicial.code === splashData.textos.ok200) {
			this.useCase.redirectLogin();
		}

		return this.useCase.guardarStorageVersiones(servicioVersiones);
	}
}
