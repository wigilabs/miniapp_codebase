import {SessionModel} from "./session.model";
import {SystemModel} from "../core/system.model";
import {ValidationsPort} from "../../testing/validations.port";
import {MiClaroKey as mck} from "../core/keys";

class MiClaroHeadersModel {
	constructor(infoSystem, infoSession) {
		this[mck.headers.content] = "application/json; charset=UTF-8";
		this[mck.headers.appVersion] = infoSystem.version;
		this[mck.headers.deviceId] = infoSession[mck.headers.deviceId];
		this[mck.headers.deviceName] = infoSystem.modelo;
		this[mck.headers.linea] = infoSession.cuenta.AccountId;
		this[mck.headers.lob] = infoSession.cuenta.LineOfBusiness;
		this[mck.headers.mail] = infoSession.usuario.UserProfileID;
		this[mck.headers.token] = infoSession.cuenta.token;
		this[mck.headers.sitema] = infoSystem.sistema;
		this[mck.headers.sitemaVersion] = infoSystem.sitemaVersion;
		this[mck.headers.userAgent] = infoSession[mck.headers.userAgent];
		this[mck.headers.wifi] = infoSystem.wifi;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}

class MiClaroEndpointsModel {
	constructor(isProd, allServices) {
		this.host = isProd ? mck.hosts.prod : mck.hosts.dev;
		this.allServices = allServices;
		this.metodos = {};
		this.setMetodos();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	// TODO: Los endpoints deben ser singleton?
	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new MiClaroEndpointsModel();
		}
		return this.instance;
	}

	setMetodos() {
		for (const serviceKey in mck.services) {
			if (mck.services[serviceKey]) {
				const skey = mck.services[serviceKey].name || "default";
				const servicio = this.allServices.find((serv) => serv.key === skey);
				if (typeof servicio !== "object") {
					throw new Error(`El servicio ${skey} no se reconoce como un servicio válido`);
				}

				if (servicio.key && servicio.segmento && servicio.path && mck.services[serviceKey].name == servicio.key) {
					this.metodos[mck.services[serviceKey].name] = `${mck.segmentos[servicio.segmento]}${servicio.path}`;
				}
			} else {
				throw new Error(`El servicio ${serviceKey} no se reconoce como un servicio válido`);
			}
		}
	}
}

export class MiClaroQueryModel {
	constructor({data = false, dataType = "json", isProd = true, method = "POST", service = ""}) {
		this.service = service;
		this.method = method;
		this.isProd = isProd;
		this.dataType = dataType;
		if (data) {
			this.data = {data};
		}

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}

export class MiClaroModel {
	constructor({
		allServices = [],
		session = new SessionModel(),
		query = new MiClaroQueryModel(),
		system = new SystemModel()
	}) {
		this.headers = new MiClaroHeadersModel(system, session);
		this.endpoints = new MiClaroEndpointsModel(query.isProd, allServices);
		this.query = query;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
