import {CuentaModel} from "../app/cuenta.model";
import {UsuarioModel} from "../app/usuario.model";
import {ValidationsPort} from "../../testing/validations.port";
import {MiClaroKey as mc} from "../core/keys";

export class SessionModel {
	constructor(cuenta = CuentaModel.getInstance, usuario = UsuarioModel.getInstance) {
		this[mc.headers.deviceId] = "xxx";
		this[mc.headers.userAgent] = "xxx";
		this.cuenta = cuenta;
		this.usuario = usuario;

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}
}
