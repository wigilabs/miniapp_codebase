const MiclaroServicesKey = {
	versiones: {model: "", name: "versiones"}
};

const MiclaroHeadersKey = {
	appVersion: "X-MC-APP-V",
	content: "Content-Type",
	deviceId: "X-MC-DEVICE-ID",
	deviceName: "X-MC-DEVICE-NAME",
	linea: "X-MC-LINE",
	lob: "X-MC-LOB",
	mail: "X-MC-MAIL",
	sitema: "X-MC-SO",
	sitemaVersion: "X-MC-SO-V",
	token: "X-SESSION-ID",
	userAgent: "X-MC-USER-AGENT",
	wifi: "X-Wifi"
};

const MiclaroSegmentosKey = {
	compartidos: "M3/Compartidos/",
	core: "api/v1/core/movil/",
	empresas: "M3/Empresas/",
	general: "M3/General/",
	hogar: "M3/Hogar/",
	postpago: "M3/Postpago/",
	rest: "api/index.php/v1/rest/",
	soap: "api/index.php/v1/soap/"
};

export const MiClaroKey = {
	headers: MiclaroHeadersKey,
	hosts: {
		dev: "https://urldesarrollo.com/",
		prod: "https://apiselfservice.co/"
	},
	segmentos: MiclaroSegmentosKey,
	services: MiclaroServicesKey
};

export const MiClaroUrlKey = {
	domiciliacionFactura: "url_domicilacion_factura",
	kitCuotas: "url_kit_a_cuotas",
	pagoFacturaHogar: "url_pago_factura_hogar",
	pagoFacturaPostpago: "url_pago_factura_postpago"
};

export const lobAtributtes = [
	{lob: "1", producto: "20", segmento: "hogar", textHeaderPago: "Pagar factura", transactionType: "3"},
	{lob: "2", producto: "", segmento: "prepago", textHeaderPago: "Pagar factura", transactionType: ""},
	{lob: "3", producto: "24", segmento: "postpago ", textHeaderPago: "Pagar factura", transactionType: "2"},
	{
		lob: "-1",
		producto: "",
		segmento: "equipos financiados",
		textHeaderPago: "Mis equipos financiados",
		transactionType: "12"
	}
];
