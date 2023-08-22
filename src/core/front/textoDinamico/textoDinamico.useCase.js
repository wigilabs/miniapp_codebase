import {ResponseModel} from "../../common/domain/index";
import data from "./textoDinamico.data";

export class TextoDinamicoUseCase {
	constructor() {
		this.data = data.data;
	}

	formatedText(text) {
		return new ResponseModel(
			text.replace(this.data.expresionesRegulares.searchMatches, (match) =>
				match.replace(this.data.expresionesRegulares.formatNumber, this.data.validaciones.replacePositionFormated)
			)
		);
	}
}
