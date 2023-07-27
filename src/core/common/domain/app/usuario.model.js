import {CuentaModel} from "./cuenta.model";
import {ValidationsPort} from "../../testing/validations.port";

export class UsuarioModel {
	constructor(user = {}) {
		this.UserProfileID = user.UserProfileID || "";
		this.apellido = user.apellido || "";
		this.nombre = user.nombre || "";
		this.DocumentType = user.DocumentType || "";
		this.DocumentNumber = user.DocumentNumber || "";

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new UsuarioModel();
		}
		return this.instance;
	}

	update(user = this.instance) {
		this.UserProfileID = user.UserProfileID || "";
		this.apellido = user.apellido || "";
		this.nombre = user.nombre || "";
		this.DocumentType = user.DocumentType || "";
		this.DocumentNumber = user.DocumentNumber || "";

		ValidationsPort.getInstance.validateModel({
			data: user,
			model: this
		});

		return this;
	}
}

export class PerfilModel {
	constructor(cuentas = [], usuario = UsuarioModel.getInstance) {
		this.cuentas = cuentas;
		this.usuario = UsuarioModel.getInstance.update(usuario);

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static instance;

	static get getInstance() {
		if (!this.instance) {
			this.instance = new PerfilModel();
		}
		return this.instance;
	}

	update(cuentas = [], usuario = UsuarioModel.getInstance) {
		if (cuentas.length > 0) {
			cuentas.forEach((cta) => {
				if (!(cta instanceof CuentaModel)) {
					console.error("modelo no valido para la cuenta:", cta);
				}
			});
		}

		if (!(usuario instanceof UsuarioModel)) {
			console.error("modelo no valido para el usuario:", usuario);
		}

		this.cuentas = cuentas;
		this.usuario = UsuarioModel.getInstance.update(usuario);

		return this;
	}
}
