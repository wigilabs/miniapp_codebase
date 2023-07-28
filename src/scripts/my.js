import {pages} from "../app.data";

export function showAlert({title = "Upps!!", msg = ""}) {
	my.alert({
		buttonText: "Aceptar",
		content: msg,
		title
	});
}

export function showInfo(msg = "") {
	my.showToast({
		content: msg,
		duration: 2500,
		type: "exception"
	});
}

export function navigate(url = "", query = "") {
	if (url) {
		url = `/${url}/`;
		const page = pages.filter((myPage) => myPage.includes(url));
		if (page.length === 1) {
			query = query ? `?${query}` : query;
			url = `/${page[0]}${query}`;
			my.navigateTo({
				url
			});
		} else {
			throw new Error(`${url} no es una ruta valida`);
		}
	} else {
		throw new Error("debe ser una ruta valida");
	}
}

export function redirect(url = "") {
	if (url) {
		url = `/${url}/`;
		const page = pages.filter((myPage) => myPage.includes(url));
		if (page.length === 1) {
			my.redirectTo({
				url: `/${page[0]}`
			});
		} else {
			throw new Error(`${url} no es una ruta valida`);
		}
	} else {
		throw new Error("debe ser una ruta valida");
	}
}

export function select({infoSelect = {}}) {
	my.multiLevelSelect({
		list: infoSelect.items,
		title: infoSelect.title
	});
}

export async function contactList() {
	try {
		return await my.choosePhoneContact();
	} catch (err) {
		return false;
	}
}

export function createWebViewContext(identifier) {
	return my.createWebViewContext(identifier);
}

export function navigateBack() {
	my.navigateBack();
}

export function showLoading(props = {content: "... por favor espera ..."}) {
	my.showLoading(props);
}

export function hideLoading() {
	my.hideLoading();
}

export function myrequest(requestConfig) {
	return new Promise((resolve, reject) => {
		my.request({
			...requestConfig,
			complete() {
				// My.hideLoading();
			},
			fail(res) {
				if (res.error && res.errorMessage) {
					reject(res);
				} else {
					reject(res.data ? res.data : res);
				}
			},
			success(res) {
				if (res.data) {
					if (parseInt(res.data.error) === 0 && res.data.response) {
						resolve(res.data.response);
					} else {
						reject(res.data.response ? res.data.response : res.data);
					}
				} else {
					console.error(res);
					reject();
				}
			}
		});
	});
}

export async function getSystemInfo() {
	return await my.getSystemInfo();
}

export async function setStorage(key, data) {
	return await my.setStorage({data, key});
}

export async function getStorage(key) {
	const result = await my.getStorage({key});
	if (result !== null) {
		return result.data;
	}
	return null;
}

export async function removeStorage(key) {
	return await my.removeStorage({key});
}

export async function clearStorage() {
	return await my.clearStorage();
}

export function confirm(msg) {
	return new Promise((resolve, reject) => {
		my.confirm({
			cancelButtonText: "Cancelar",
			confirmButtonText: "Aceptar",
			content: msg,
			fail: (error) => {
				reject(error);
			},
			success: (result) => {
				resolve(result.confirm);
			},
			title: "Claro"
		});
	});
}

export function appId() {
	return my.getAppIdSync().appId;
}
