#!/bin/bash

err_msg_init="vvvvvvvv \n ERROR en el review: \n"
err_msg_end="\n ^^^^^^"

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

##region llamado funciones
no_style
echo -e "Estilos en linea: OK"
acss
echo -e "Estilos en archivos acss: OK"
deps
echo -e "Dependencias: OK"
##endregion
