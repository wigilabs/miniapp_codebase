import {AppUseCase} from "./app.useCase";
import {CuentaModel} from "../../common/domain/app/cuenta.model";
import {PerfilModel} from "../../common/domain/app/usuario.model";
import {StorageAdapter} from "../../common/infra/storage.adapter";
import {StorageKey} from "../../common/domain/core/keys";
import {StorageModel} from "../../common/domain/core/storage.model";
import {StoragePort} from "../../common/aplication/storage.port";
import {VersionesModel} from "../../common/domain/app/versiones.model";
jest.mock("../../common/infra/storage.adapter");

beforeEach(() => {
	StorageAdapter.mockClear();
	StoragePort.instance = null;
});

test("instancia correctamente", () => {
	new AppUseCase();
	expect(StorageAdapter).toHaveBeenCalledTimes(1);
});

describe("cuando limpiamos el storage", () => {
	test("se realiza el llamado a limpiar correctamente", () => {
		const useCase = new AppUseCase();
		useCase.limpiarStorage();
		const [storageAdapterMock] = StorageAdapter.mock.instances;
		expect(storageAdapterMock.clearr).toHaveBeenCalledTimes(1);
	});
});

describe("cuando iniciamos el storage", () => {
	test("si hay exito agregando una cuenta al storage", () => {
		const useCase = new AppUseCase();
		const [storageAdapterMock] = StorageAdapter.mock.instances;
		useCase.iniciarStorageCuenta();
		expect(storageAdapterMock.sett).toHaveBeenCalledTimes(1);
		expect(storageAdapterMock.sett).toHaveBeenCalledWith(new StorageModel(StorageKey.cuenta, new CuentaModel()));
	});

	test("si hay exito agregando un usuario al storage", () => {
		const useCase = new AppUseCase();
		const [storageAdapterMock] = StorageAdapter.mock.instances;
		useCase.inicializarStorageUsuario();
		expect(storageAdapterMock.sett).toHaveBeenCalledTimes(1);
		expect(storageAdapterMock.sett).toHaveBeenCalledWith(new StorageModel(StorageKey.usuario, new PerfilModel()));
	});

	test("si hay exito agregando versiones al storage", () => {
		const useCase = new AppUseCase();
		const [storageAdapterMock] = StorageAdapter.mock.instances;
		useCase.inicializarStorageVersiones();
		expect(storageAdapterMock.sett).toHaveBeenCalledTimes(1);
		expect(storageAdapterMock.sett).toHaveBeenCalledWith(new StorageModel(StorageKey.versiones, new VersionesModel()));
	});
});
