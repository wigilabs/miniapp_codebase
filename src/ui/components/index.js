import {ejecutarAccion} from "../../../core/front/botonPrueba/botonPrueba.adapter";

Component({
	data: {},
	didMount() {
		this.action();
	},
	methods: {
		action() {
			ejecutarAccion;
		}
	},
	mixins: [],
	props: {
		numeroUsuario: "",
		tipo: ""
	}
});
