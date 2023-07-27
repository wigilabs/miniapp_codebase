import {
	CuentaModel,
	GeneralMessagesKey,
	HttpModel,
	MiClaroModel,
	MiClaroQueryModel,
	SessionModel,
	SystemModel,
	UsuarioModel
} from "../domain/index";
import {MiClaroAdapter} from "../infra/index";
import {PhonePort} from "./phone.port";
import {StoragePort} from "./storage.port";
import {ValidationsPort} from "../testing/validations.port";

export class MiclaroPort {
	constructor() {
		this.adapter = MiClaroAdapter.getInstance;
		this.phonePort = PhonePort.getInstance;
		this.storagePort = StoragePort.getInstance;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	async getRequest({dataType = "json", isProd = true, method = "POST", serviceBody = {}, servicio = {}}) {
		const data = Object.keys(serviceBody).length > 0 ? serviceBody : false;

		ValidationsPort.getInstance.validateService({data, servicio});

		const query = new MiClaroQueryModel({
			data,
			dataType,
			isProd,
			method,
			service: servicio.name
		});
		return await this.setRequestConfig(query);
	}

	setRequestConfig(query = new MiClaroQueryModel()) {
		return new Promise((resolve, reject) => {
			try {
				this.getClaroInfo(query).then((claro) => {
					if (!(claro.query.service in claro.endpoints.metodos)) {
						const errMsg = GeneralMessagesKey.invalidService;
						reject(errMsg);
					}

					const url = `${claro.endpoints.host}${claro.endpoints.metodos[claro.query.service]}`;

					const requestConfig = new HttpModel({
						dataType: claro.query.dataType,
						headers: claro.headers,
						method: claro.query.method,
						query: claro.query.data,
						url
					});

					switch (claro.query.method) {
						case "GET":
							delete requestConfig.method;
							delete requestConfig.data;
							delete requestConfig.dataType;
							break;
						default:
							break;
					}

					resolve(requestConfig);
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	async getClaroInfo(query) {
		const sysInfo = await this.phonePort.systemInfo();

		return new MiClaroModel({
			allServices: this.adapter.allServices(this.phonePort.getAppid()),
			query,
			session: new SessionModel(CuentaModel.getInstance, UsuarioModel.getInstance),
			system: new SystemModel(sysInfo)
		});
	}
}
