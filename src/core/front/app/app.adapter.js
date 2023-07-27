import {AppPort} from "./app.port";

const appPort = new AppPort();

export const iniciarStorage = () => {
	appPort.clearStorage();
	appPort.initStorage();
};
