import {ResponseModel} from "../../common/domain/index";
import {TextoDinamicoUseCase} from "./textoDinamico.useCase";

test("debe formatear el numero de telefono correctamente", () => {
	const useCase = new TextoDinamicoUseCase();
	const result = useCase.formatedText("3041234567");

	const expectedResponse = new ResponseModel("304 123 4567");

	expect(result).toEqual(expectedResponse);
});
