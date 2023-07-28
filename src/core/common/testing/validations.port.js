/* eslint-disable no-console*/
/* eslint-disable class-methods-use-this*/
export class ValidationsPort {
	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new ValidationsPort();
		}
		return this.instance;
	}

	// Private
	validarTipoData({data = "", init = false, model = "", tag = ""}) {
		if (!init) {
			if (data && model) {
				if (!(data instanceof model)) {
					/* Console.error(`modelo no valido para: ${tag}`);
					   console.warn(data);
					    Throw new Error(`Invalid ${new model().constructor.name} model`); */
				}
			} else {
				console.log(typeof data);
				console.log(typeof model);
				throw new Error(`data o modelo para ${tag} no validos:`, data, model);
			}
		}
	}

	// Private
	conteo({data = {}, init = false, tag = ""}) {
		const action = init ? "creado" : "actualizado";

		console.group(tag);
		console.count(`${tag} se ha ${action} ->`);
		if (!init) {
			console.dir(data);
		}
		console.groupEnd();
	}

	validateModel({contar = false, data = {}, detail = false, init = false, model = {}}) {
		const instance = model.constructor;
		const tag = instance.name;
		if (contar) {
			this.conteo({data, init, tag});
		}
		if (detail) {
			console.trace(tag);
		}
		this.validarTipoData({data, init, model: instance, tag});
	}

	validateService({data = false, servicio = {}}) {
		if (data) {
			if (servicio.model) {
				if (!(data instanceof servicio.model)) {
					const ServiceModel = servicio.model;
					console.warn(data);
					throw new Error(`modelo ${new ServiceModel().constructor.name} no valido para ${servicio.name} :`);
				}
			} else {
				throw new Error(`No existe un modelo para ${servicio.name}`);
			}
		}
	}
}
