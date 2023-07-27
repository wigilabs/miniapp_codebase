export class ReqInvoiceNumberModel {
	constructor(numeroFactura = "") {
		this.numeroFactura = numeroFactura || "";
	}
}

export class ReqMetodoPagoModel {
	constructor(reqMetodoPago = {}) {
		this.tieneCFM = reqMetodoPago.tieneCFM || "";
		this.transactionType = reqMetodoPago.transactionType || "";
	}
}

export class ReqFacturaMovilModel {
	constructor(min = "") {
		this.min = min || "";
	}
}

export class ReqHistorialHogarModel {
	constructor(reqHistorailHogar = {}) {
		this.AccountId = reqHistorailHogar.AccountId || "";
		this.LineOfBusiness = reqHistorailHogar.LineOfBusiness || "";
	}
}

export class ReqHistorialPostpagoModel {
	constructor(reference = "") {
		this.ReferenceMin = reference || "";
	}
}

export class ReqLineasModel {
	constructor(documentNumber = "", documentType = "") {
		this.documentNumber = documentNumber;
		this.documentType = documentType;
	}
}

export class ReqAccountIdModel {
	constructor(AccountId = "") {
		this.AccountId = AccountId;
	}
}

export class ReqNombreUsuarioModel {
	constructor(nombreUsuario = "") {
		this.nombreUsuario = nombreUsuario;
	}
}

export class ReqBillHogarModel {
	constructor(reqBillHogar = {}) {
		this.lineOfBusiness = reqBillHogar.lineOfBusiness;
		this.numeroCuenta = reqBillHogar.numeroCuenta;
		this.canal = reqBillHogar.canal || "hogar";
		this.custcode = reqBillHogar.custcode || "";
		this.otraLinea = reqBillHogar.otraLinea;
	}
}

export class ReqFacturaInteractivaModel {
	constructor(reqFacturaInteractiva = {}) {
		this.origen = reqFacturaInteractiva.origen || "APP";
		this.telefono = reqFacturaInteractiva.telefono || "";
		this.tipoConsulta = reqFacturaInteractiva.tipoConsulta || "2";
		this.cuenta = reqFacturaInteractiva.cuenta;
		this.producto = reqFacturaInteractiva.producto;
	}
}

export class ReqUrlPaymentModel {
	constructor(reqUrlPaymentModel = {}) {
		this.LineaCelularHE = reqUrlPaymentModel.LineaCelularHE || "";
		this.fechaLimitePago = reqUrlPaymentModel.fechaLimitePago;
		this.formaPago = reqUrlPaymentModel.formaPago;
		this.numeroReferencia = reqUrlPaymentModel.numeroReferencia;
		this.valor = reqUrlPaymentModel.valor;
		this.tipoTrans = reqUrlPaymentModel.tipoTrans;
		this.numeroFactura = reqUrlPaymentModel.numeroFactura;
	}
}

export class ReqConsultFacturaModel {
	constructor(reqFactura = {}) {
		this.canal = reqFactura.canal || "hogar";
		this.numeroCuenta = reqFactura.numeroCuenta || "";
		this.LineOfBusiness = reqFactura.LineOfBusiness || "";
	}
}

export class ReqUpdateCorreosModel {
	constructor(reqUpdate = {}) {
		this.canal = reqUpdate.canal || "hogar";
		this.numeroCuenta = reqUpdate.numeroCuenta || "";
	}
}

export class ReqSendFacturaModel {
	constructor(reqSend = {}) {
		this.canal = reqSend.canal || "hogar";
		this.numeroCuenta = reqSend.numeroCuenta || "";
		this.email = reqSend.email || "";
	}
}

export class ReqConsultInfoUsuarioModel {
	constructor(reqInfo = {}) {
		this.AccountId = reqInfo.AccountId || "";
		this.LineOfBusiness = reqInfo.LineOfBusiness || "";
		this.UserProfileID = reqInfo.UserProfileID || "";
	}
}

export class ReqActivateDesactivateModel {
	constructor(reqFactura = {}) {
		this.correoElectronicoNotificacion = reqFactura.correoElectronicoNotificacion;
		this.esActivacionFacturaElectronica = reqFactura.esActivacionFacturaElectronica;
		this.numeroCuentaNotificacion = reqFactura.numeroCuentaNotificacion;
	}
}

export class ReqValidateNumberModel {
	constructor(reqNumber = {}) {
		this.AccountId = reqNumber.AccountId || "";
	}
}
