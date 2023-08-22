import {HomePort} from "./home.port";

const homePort = new HomePort();

export const iniciar = () => homePort.getDataInicial();
export const obtener = async () => await homePort.getInfo();
