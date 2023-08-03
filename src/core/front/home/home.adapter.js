import {HomePort} from "./home.port";

const homePort = new HomePort();

export const iniciar = async () => await homePort.setDataInicial();
