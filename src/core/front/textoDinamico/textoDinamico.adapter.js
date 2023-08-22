import {TextoDinamicoPort} from "./textoDinamico.port";

const textoDinamicoPort = new TextoDinamicoPort();

export const textFormated = (props) => textoDinamicoPort.textFormated(props);
