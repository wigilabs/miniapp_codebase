const data = {
	expresionesRegulares: {
		formatNumber: /^(\d{3})(\d{3})(\d{4})$/,
		searchMatches: /\b3\d{9}\b/g
	},
	textos: {
		numeroUsuarioFormateado: "",
		onePopUp: {
			firstText: "Vas a cambiar tu linea"
		},
		secondPopUp: {
			firstText: "Vas a desactivar tu linea"
		},
		secondText: "¿Estás seguro?"
	},
	validaciones: {
		replacePositionFormated: "$1 $2 $3",
		typeChange: "cambiar",
		typeDesactive: "desactivar"
	}
};

export default {
	data
};
