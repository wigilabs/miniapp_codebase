import {PhoneAdapter} from "../infra/index";
import {ValidationsPort} from "../testing/validations.port";

export class PhonePort {
	static instance;

	constructor() {
		this.adapter = new PhoneAdapter();

		ValidationsPort.getInstance.validateModel({
			init: true,
			model: this
		});
	}

	static get getInstance() {
		if (!this.instance) {
			this.instance = new PhonePort();
		}
		return this.instance;
	}

	async systemInfo() {
		return await this.adapter.systemInfo();
	}

	async getContact() {
		const contact = await this.adapter.getContact();
		return contact;
	}

	// TODO: está función es de este puerto???
	getAppid() {
		return this.adapter.getAPPID();
	}
}
