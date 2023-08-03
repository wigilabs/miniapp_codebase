#!/bin/bash

err_msg_init="vvvvvvvv \n ERROR en el review: \n"
err_msg_end="\n ^^^^^^"

warn_msg_init="!!!!!!! ALERTA en el review: \n"

##region estilos en linea
no_style() {
	inlineStyles=$(grep -R --exclude-dir={node_modules,coverage,results} --exclude=*.{md,sh} 'style="')
	cantStyle=$(wc -l <<<"$inlineStyles")

	if [ -n "$inlineStyles" ] && [ "$cantStyle" -gt 0 ]; then
		echo -e "$err_msg_init \nExisten estilos en linea: \n\n$inlineStyles\n $err_msg_end"
		exit 1
	fi
}
##endregion

##region archivos de estilos
acss() {

	permittedFile="./src/app.acss"

	files=$(find ./ -name '*.acss' -not -path './node_modules/*' -size +0)
	cantStyle=$(wc -l <<<"$files")

	if [ -n "$files" ] && [ "$cantStyle" -gt 0 ] && [ "$permittedFile" != "$files" ]; then
		echo -e "$err_msg_init \nExisten archivos de estilos \n\n$files\n $err_msg_end"
		exit 1
	fi
}
##endregion

##region saltar regla eslint
no_skip_lint() {
	disabledLints=$(grep -R --exclude-dir={node_modules,coverage,results,.git} --exclude=*.{md,sh,json} 'eslint-disable')
	cantDisable=$(wc -l <<<"$disabledLints")

	if [ -n "$disabledLints" ] && [ "$cantDisable" -gt 0 ]; then
		echo -e "$err_msg_init \nNo debes saltar los linter: \n\n$disabledLints\n $err_msg_end"
		exit 1
	fi
}
##endregion

##region dependencias
deps() {

	api="aplication"
	inf="infra"
	dom="domain"
	com="common"
	front="./src/core/front"
	common="./src/core/common"

	#region adaptadores
	#Los adapters no pueden importar nada del common

	#appAdapter=$(grep -R "$api" "$front"/**/*adapter*)
	#infAdapter=$(grep -R "$inf" "$front"/**/*adapter*)
	#domAdapter=$(grep -R "$dom" "$front"/**/*adapter*)
	comAdapter=$(grep -R "$com" "$front"/**/*adapter*)
	cantomAdapter=$(wc -l <<<"$comAdapter")

	if [ -n "$comAdapter" ] && [ "$cantomAdapter" -gt 0 ]; then
		echo -e "$err_msg_init \nAlgun adapter tiene dependencias no permitidas \n\n$comAdapter\n $err_msg_end"
		exit 1
	fi

	#endregion

	#region puertos
	#Los ports solo pueden importar del common los domain

	appPort=$(grep -R "$api" "$front"/**/*port*)
	infPort=$(grep -R "$inf" "$front"/**/*port*)
	##domPort=$(grep -R "$dom" "$front"/**/*port*)

	cantappPort=$(wc -l <<<"$appPort")
	cantinfPort=$(wc -l <<<"$infPort")

	if [ -n "$appPort" ] && [ "$cantappPort" -gt 0 ]; then
		echo -e "$err_msg_init \nAlgun port tiene dependencias no permitidas de $api \n\n$appPort\n $err_msg_end"
		exit 1
	fi

	if [ -n "$infPort" ] && [ "$cantinfPort" -gt 0 ]; then
		echo -e "$err_msg_init \nAlgun port tiene dependencias no permitidas de $inf \n\n$infPort\n $err_msg_end"
		exit 1
	fi

	#endregion

	#region casosdeuso
	#Los useCase pueden importar de commons, aplication y domain pero no infra

	infUsecase=$(grep -R "$inf" "$front"/**/*useCase.js*)
	#appUsecase=$(grep -R "$com" "$front"/**/*useCase.js*)
	#domUsecase=$(grep -R "$dom" "$front"/**/*useCase.js*)

	cantinfUsecase=$(wc -l <<<"$infUsecase")

	if [ -n "$infUsecase" ] && [ "$cantinfUsecase" -gt 0 ]; then
		echo -e "$err_msg_init \nAlgun useCase tiene dependencias no permitidas de $inf \n\n$infUsecase\n $err_msg_end"
		exit 1
	fi

	#endregion

	#region domain
	#El domain no debe depender de capas externas

	infDomain=$(grep -R "$inf" "$common"/domain/*)
	appDomain=$(grep -R "$api" "$common"/domain/*)

	cantinfDomain=$(wc -l <<<"$infDomain")
	cantappDomain=$(wc -l <<<"$appDomain")

	if [ -n "$infDomain" ] && [ "$cantinfDomain" -gt 0 ]; then
		echo -e "$err_msg_init \nEl domain no puede depender de $inf \n\n$infDomain\n $err_msg_end"
		exit 1
	fi

	if [ -n "$appDomain" ] && [ "$cantappDomain" -gt 0 ]; then
		echo -e "$err_msg_init \nEl domain no puede depender de $api \n\n$appDomain\n $err_msg_end"
		exit 1
	fi

	#endregion

	#region infra
	#La infra de salida no debe depender de capas internas

	appInfra=$(grep -R "$api" "$common"/infra/*)
	domInfra=$(grep -R "$dom" "$common"/infra/*)

	cantappInfra=$(wc -l <<<"$appInfra")
	cantdomInfra=$(wc -l <<<"$domInfra")

	if [ -n "$appInfra" ] && [ "$cantappInfra" -gt 0 ]; then
		echo -e "$err_msg_init \nLa infra de salida no puede depender de $api \n\n$appInfra\n $err_msg_end"
		exit 1
	fi

	if [ -n "$domInfra" ] && [ "$cantdomInfra" -gt 0 ]; then
		echo -e "$err_msg_init \nLa infra de salida no puede depender de $dom \n\n$domInfra\n $err_msg_end"
		exit 1
	fi

	#endregion

}
##endregion

##region todos
todos() {
	todos=$(grep -R --exclude-dir={node_modules,coverage,results,.git,.husky} --exclude=*.{md,sh} 'TODO')
	cantTodos=$(wc -l <<<"$todos")

	if [ -n "$todos" ] && [ "$cantTodos" -gt 0 ]; then
		echo -e "$warn_msg_init \nRecuerda que hay pendientes por solucionar: \n\n$todos\n $err_msg_end"
		#exit 1
	fi
}
##endregion

##region tamaño
filesize() {

	showerr=0
	errmsg=""

	#region pages
	pages_axml="./src/ui/pages/**/*.axml"
	pages_axml_limit=5000

	pages_js="./src/ui/pages/**/*.js"
	pages_js_limit=1000

	for file in $pages_axml; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $pages_axml_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $pages_axml_limit"
		fi
	done

	for file in $pages_js; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $pages_js_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $pages_js_limit"
		fi
	done
	#endregion

	#region front
	front_adapter="./src/core/front/**/*adapter.js"
	front_adapter_limit=1000

	front_port="./src/core/front/**/*port.js"
	front_port_limit=4500

	front_usecase="./src/core/front/**/*useCase.js"
	front_usecase_limit=6000

	front_test="./src/core/front/**/*test.js"
	front_test_limit=7000

	for file in $front_adapter; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $front_adapter_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $front_adapter_limit"
		fi
	done

	for file in $front_port; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $front_port_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $front_port_limit"
		fi
	done

	for file in $front_usecase; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $front_usecase_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $front_usecase_limit"
		fi
	done

	for file in $front_test; do
		filesize=$(stat -c '%s' "$file")
		if [ "$filesize" -gt $front_test_limit ]; then
			showerr=1
			errmsg+="\n$file es un poco grande ($filesize), deberías intentar optimizarlo a menos de $front_test_limit"
		fi
	done
	#endregion

	if [ "$showerr" -gt 0 ]; then
		echo -e "$warn_msg_init $errmsg \n $err_msg_end"
	fi
}
##endregion

##region llamado funciones
no_style
echo -e "Estilos en linea: OK"
acss
echo -e "Estilos en archivos acss: OK"
#no_skip_lint
echo -e "Saltar linter: OK"
deps
echo -e "Dependencias: OK"
filesize
todos
##endregion
