import {appId, contactList, getSystemInfo} from "../../../scripts/my";

export class PhoneAdapter {
	constructor() {
		this.system = getSystemInfo;
		this.contactList = contactList;
		this.appID = appId;
	}

	async systemInfo() {
		return await this.system();
	}

	async getContact() {
		try {
			return await this.contactList();
		} catch (err) {
			return false;
		}
	}

	getAPPID() {
		return this.appID();
	}
}
