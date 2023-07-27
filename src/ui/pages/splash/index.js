import {iniciar} from "../../../core/front/splash/splash.adapter";

function adapterResponse(called, response) {
	response.error ? console.error(response.info) : called.setData(response.info);
}

Page({
	async onLoad() {
		adapterResponse(this, await iniciar());
	}
});
