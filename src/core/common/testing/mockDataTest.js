import {
	CuentaModel,
	HttpModel,
	MiClaroModel,
	MiClaroQueryModel,
	PerfilModel,
	SessionModel,
	SystemModel,
	UsuarioModel
} from "../domain/index";

export const MockAccount = new CuentaModel({
	AccountId: "testAccountId",
	LineOfBusiness: "testLineOfBusiness",
	alias: "testAlias",
	info: {},
	texto: "testTexto",
	token: "testToken"
});

export const MockUser = new UsuarioModel({
	DocumentNumber: "12345678",
	DocumentType: "1",
	UserProfileID: "testId",
	apellido: "testApellido",
	nombre: "testNombre"
});

export const MockPerfilModel = new PerfilModel([MockAccount], MockUser);

export const MockSystemInfo = {
	model: "testModel",
	platform: "testPlatform",
	system: "testSystem",
	systemInfo: "testSystemInfo",
	version: "testVersion",
	wifiEnabled: true
};

export function getMockHttpModel(httpModelParams = {}) {
	const mockSessionModel = new SessionModel(
		httpModelParams.account ? httpModelParams.account : MockAccount,
		MockPerfilModel.usuario
	);
	const mockSystemModel = new SystemModel(MockSystemInfo);
	const mockQueryModel = new MiClaroQueryModel({
		data: httpModelParams.data,
		dataType: httpModelParams.dataType,
		isProd: httpModelParams.isProd,
		method: httpModelParams.method,
		service: httpModelParams.service.name
	});
	const mockMiClaroModel = new MiClaroModel({
		allServices: [],
		query: mockQueryModel,
		session: mockSessionModel,
		system: mockSystemModel
	});
	const mockHttpModel = new HttpModel({
		dataType: mockMiClaroModel.query.dataType,
		headers: mockMiClaroModel.headers,
		method: mockMiClaroModel.query.method,
		query: mockMiClaroModel.query.data,
		url: mockMiClaroModel.endpoints.host + mockMiClaroModel.endpoints.metodos[httpModelParams.service.name]
	});
	return mockHttpModel;
}

export const MockError = {
	error: 12,
	errorMessage: "TestError"
};
