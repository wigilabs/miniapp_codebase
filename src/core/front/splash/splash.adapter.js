import {SplashPort} from "./splash.port";

const splashPort = new SplashPort();

export const iniciar = async () => await splashPort.setDataInicial();
