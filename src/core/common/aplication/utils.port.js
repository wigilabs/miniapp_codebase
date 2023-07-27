import {lobAtributtes} from "../domain/index";

export class UtilsPort {
	static dateFormated() {
		const dateObject = new Date();
		const day = dateObject.getDate().toString().padStart(2, "0");
		const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
		const hours = dateObject.getHours().toString().padStart(2, "0");
		const minutes = dateObject.getMinutes().toString().padStart(2, "0");
		const seconds = dateObject.getSeconds().toString().padStart(2, "0");
		return `${dateObject.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;
	}

	static moneyFormat(val = "0") {
		const formatOpt = {
			currency: "COP",
			maximumFractionDigits: 0,
			minimumFractionDigits: 0,
			style: "currency"
		};

		const pesos = new Intl.NumberFormat("es-CO", formatOpt);
		return pesos.format(val);
	}

	static formatLine(number = "0") {
		const digits = number.split("").map(Number);
		let newFormat = "";
		digits.forEach((element, index) => {
			if (index === 3 || index === 6) {
				newFormat += " ";
			}
			newFormat += digits[index].toString();
		});
		return newFormat;
	}

	static getInfoLob(lob) {
		const filteredObjectLob = lobAtributtes.find((obj) => obj.lob === lob);
		return filteredObjectLob ? filteredObjectLob : {};
	}
}
