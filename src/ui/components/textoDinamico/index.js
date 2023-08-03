import {textFormated} from "../../../core/front/textoDinamico/textoDinamico.adapter";

Component({
	data: {},
	didMount() {
		this.formatText();
	},
	methods: {
		formatText() {
			const {info, error} = textFormated(this.props);
			if (!error) {
				this.setData({info});
			}
		}
	},
	mixins: [],
	props: {
		tipo: ""
	}
});
