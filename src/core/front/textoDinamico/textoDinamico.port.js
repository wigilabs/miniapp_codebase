import {ResponseModel} from "../../common/domain/index";
import {TextoDinamicoUseCase} from "./textoDinamico.useCase";
import dataPage from "./textoDinamico.data";

export class TextoDinamicoPort {
	constructor() {
		this.useCase = new TextoDinamicoUseCase();
	}

	textFormated(props) {
		const numberFormateado = this.useCase.formatedText(props.numeroUsuario);
		dataPage.data.numeroUsuarioFormateado = numberFormateado.info;
		return new ResponseModel(dataPage);
	}
}
