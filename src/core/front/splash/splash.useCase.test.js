import {MockAccount, MockPerfilModel, MockSystemInfo, getMockHttpModel} from "../../common/testing/mockDataTest";
import {HttpAdapter, PhoneAdapter, StorageAdapter, VisualAdapter, RouterAdapter} from "../../common/infra/index";
import {HttpPort, PhonePort, RouterPort, StoragePort, VisualPort} from "../../common/aplication/index";
import {StorageKey, StorageModel, MiClaroKey as mck, CuentaModel} from "../../common/domain/index";
import {SplashUseCase} from "./splash.useCase";

jest.mock("../../common/infra/storage.adapter");
jest.mock("../../common/infra/http.adapter");
jest.mock("../../common/infra/phone.adapter");
jest.mock("../../common/infra/visual.adapter");
jest.mock("../../common/infra/router.adapter");

beforeEach(() => {
	StorageAdapter.mockClear();
	HttpAdapter.mockClear();
	PhoneAdapter.mockClear();
	VisualAdapter.mockClear();
	RouterAdapter.mockClear();
	StoragePort.instance = null;
	VisualPort.instance = null;
	HttpPort.instance = null;
	PhonePort.instance = null;
	RouterPort.instance = null;
});

test("instancia correctamente", () => {
	const useCase = new SplashUseCase();
	expect(StorageAdapter).toHaveBeenCalledTimes(1);
	expect(HttpAdapter).toHaveBeenCalledTimes(1);
	expect(PhoneAdapter).toHaveBeenCalledTimes(1);
	expect(VisualAdapter).toHaveBeenCalledTimes(1);
});

describe("cuando consumimos el servicio de versiones", () => {
	const mockAccount = MockAccount;
	const mockUser = MockPerfilModel;
	const mockSystemInfo = MockSystemInfo;

	const mockVersionResponse = {
		error: 0,
		response: {}
	};

	test("si hay exito obtenemos una repuesta exitosa", async () => {
		const useCase = new SplashUseCase();

		const phoneAdapterMock = PhoneAdapter.mock.instances[0];
		const storageAdapterMock = StorageAdapter.mock.instances[0];
		const httpAdapterMock = HttpAdapter.mock.instances[0];

		storageAdapterMock.gett.mockResolvedValueOnce(mockAccount).mockResolvedValueOnce(mockUser);

		phoneAdapterMock.systemInfo.mockResolvedValueOnce(mockSystemInfo);

		httpAdapterMock.execute.mockResolvedValueOnce(mockVersionResponse);

		const result = await useCase.consumirServicioVersiones();
		expect(phoneAdapterMock.systemInfo).toHaveBeenCalledTimes(1);

		const httpModelParams = {
			account: new CuentaModel(),
			method: "GET",
			service: mck.services.versiones
		};
		const mockHttpModel = getMockHttpModel(httpModelParams);
		delete mockHttpModel.data;
		delete mockHttpModel.method;
		delete mockHttpModel.dataType;

		expect(httpAdapterMock.execute).toHaveBeenCalledTimes(1);
		expect(httpAdapterMock.execute).toHaveBeenCalledWith(mockHttpModel);
		expect(result.code).toEqual(200);
		expect(result.error).toEqual(false);
		expect(result.info).toEqual(mockVersionResponse);
	});

	test("si hay un error en la peticion http se obtiene el error", async () => {
		const useCase = new SplashUseCase();

		const phoneAdapterMock = PhoneAdapter.mock.instances[0];
		const storageAdapterMock = StorageAdapter.mock.instances[0];
		const httpAdapterMock = HttpAdapter.mock.instances[0];

		storageAdapterMock.gett.mockResolvedValueOnce(mockAccount).mockResolvedValueOnce(mockUser);

		phoneAdapterMock.systemInfo.mockResolvedValueOnce(mockSystemInfo);

		const mockError = new Error("TestError");
		httpAdapterMock.execute.mockImplementationOnce(() => {
			throw mockError;
		});

		const result = await useCase.consumirServicioVersiones();
		expect(phoneAdapterMock.systemInfo).toHaveBeenCalledTimes(1);

		const httpModelParams = {
			account: new CuentaModel(),
			method: "GET",
			service: mck.services.versiones
		};
		const mockHttpModel = getMockHttpModel(httpModelParams);
		delete mockHttpModel.data;
		delete mockHttpModel.method;
		delete mockHttpModel.dataType;

		expect(httpAdapterMock.execute).toHaveBeenCalledTimes(1);
		expect(httpAdapterMock.execute).toHaveBeenCalledWith(mockHttpModel);

		expect(result.code).toEqual(500);
		expect(result.error).toEqual(true);
		expect(result.info).toEqual(mockError);
	});
});

describe("cuando guardamos la version en el storage", () => {
	test("si hay exito se devuelve un responseModel", () => {
		const useCase = new SplashUseCase();
		const mockInfoVersiones = {
			version: "testVersion"
		};
		const storageAdapterMock = StorageAdapter.mock.instances[0];
		const result = useCase.guardarStorageVersiones(mockInfoVersiones);
		expect(storageAdapterMock.sett).toHaveBeenCalledTimes(1);
		expect(storageAdapterMock.sett).toHaveBeenCalledWith(new StorageModel(StorageKey.versiones, mockInfoVersiones));
		expect(result).toEqual({error: false, info: "ok", code: 200});
	});
});

test("si hay exito al redirigir a la pantalla de login", () => {
	const useCase = new SplashUseCase();
	const routerAdapterapterMock = RouterAdapter.mock.instances[0];
	useCase.redirectLogin();
	expect(routerAdapterapterMock.redirect).toHaveBeenCalledTimes(1);
	expect(routerAdapterapterMock.redirect).toHaveBeenCalledWith("login");
});

describe("showError", () => {
	test("debería llamar a la función alert del adaptador de visualización con los parámetros correctos", () => {
		const useCase = new SplashUseCase();
		const visualAdapterMock = VisualAdapter.mock.instances[0];

		// Llamar a la función showError con los datos de prueba
		const title = "Error";
		const msg = "Se ha producido un error.";
		useCase.showError({title, msg});

		// Verificar que la función alert haya sido llamada
		expect(visualAdapterMock.alert).toHaveBeenCalled();

		// Verificar los parámetros con los que fue llamada la función alert
		expect(visualAdapterMock.alert).toHaveBeenCalledWith({title, msg});
	});
});
