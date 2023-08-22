import {iniciar, obtener} from "../../../core/front/home/home.adapter";

function adapterResponse(called, response) {
	response.error ? console.error(response.info) : called.setData(response.info);
}

Page({
	onLoad() {
		adapterResponse(this, iniciar());
	},
	async traer() {
		adapterResponse(this, await obtener());
	}
});
