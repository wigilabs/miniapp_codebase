import groovy.transform.Field

@Field def ERR_MSG="Error indefinido"

pipeline {
  agent any
	tools {
		nodejs { 'node20.x' }
	}
  environment {
    MSG_TITLE_INI = "Ha iniciado un build automatico (${env.BUILD_NUMBER})"
    MSG_COLOR_INI = "0072C6"
    MSG_TITLE_OK = "Build exitoso (${env.BUILD_NUMBER})"
    MSG_COLOR_OK = "20d50a"
    MSG_TITLE_ERR = "Build fallido (${env.BUILD_NUMBER})"
    MSG_COLOR_ERR = "e50c0c"
  }
  stages {
    stage('hello') {
      steps {
        echo 'Bienvenido al pipeline'
      }
    }
    stage('install') {
			steps {
				script {
					ERR_MSG = "Error al instalar los paquetes"
				}				
      	sh 'npm install'
			}
    }
    stage('lint') {
      steps {
				script {
					ERR_MSG = "Error al ejecutar el lint"
				}
        sh 'npm run lint-no-fix'
      }
    }
    stage('test') {
      steps {
				script {
					ERR_MSG = "Error al ejecutar los tests"
				}
        sh 'npm run test'
      }
    }
  }
	post {
		always {
			script {
        def reqbody = getMsgTemplate("INI")
        makeRequest(reqbody)
			}
		}
    success{
      script{
        def reqbody = getMsgTemplate("OK",true)
        makeRequest(reqbody)
      }
    }
    failure{
      script{
        def reqbody = getMsgTemplate("ERR",true)
				makeRequest(reqbody)
      }
    }
	}
}

def getMsgTemplate(SUFIJO,isResult=false) {

  FULL_TITLE_VAR = "MSG_TITLE_${SUFIJO}"
  FULL_COLOR_VAR = "MSG_COLOR_${SUFIJO}"

  FULL_TITLE = env."$FULL_TITLE_VAR"
  FULL_COLOR = env."$FULL_COLOR_VAR"
  
  def MSG_ACTIONS_TEMPLATE = """
    [{
			"@type": "OpenUri",
      "name": "Abrir repo",
      "targets": [{
        "os": "default",
        "uri": "${env.GIT_URL}"
      }]        
    },{
			"@type": "OpenUri",
			"name": "Ver detalle",
			"targets": [{
				"os": "default",
				"uri": "${env.JOB_DISPLAY_URL}"
			}]
		}]
  """

  def actions = isResult ? MSG_ACTIONS_TEMPLATE : "[]"

	def errMsg = SUFIJO=="ERR" ? """
	,
		{
			"name": "Motivo:",
			"value": "${ERR_MSG}"
		}
	""" : ""

  def MSG_TEMPLATE = """
  {
    "@context": "https://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "${FULL_COLOR}",
    "title": "${FULL_TITLE}",
    "summary":"Este es un mensaje automatico, no responder",	
    "sections":[{	
      "facts": [ 
        {
            "name":"# build:",
            "value": "${env.BUILD_NUMBER}"
        },
        {
          "name": "proyecto:",
          "value": "${env.JOB_NAME}"
        },
        {
            "name": "rama:",
            "value": "${env.BRANCH_NAME}"
        },				
        {
            "name": "autor:",
            "value": "${getCommitInfo('autor')}"
        },								
        {
            "name": "commiter:",
            "value": "${getCommitInfo()}"
        },								
        {
            "name": "titulo:",
            "value": "${getCommitInfo('titulo')}"
        },
        {
            "name": "commit:",
            "value": "${env.GIT_COMMIT}"
        }${errMsg}
				]
    }],
    "potentialAction":${actions}
  }
  """

  return "${MSG_TEMPLATE}"
}

def makeRequest(reqbody=""){

	def urlwebhook = 'xx'

  httpRequest httpMode: 'POST',
  acceptType: 'APPLICATION_JSON',
  contentType: 'APPLICATION_JSON',
  url: urlwebhook,
  requestBody: reqbody
}

def getCommitInfo(info=""){
	switch(info) {
		case "autor":
			format = "%an (%ae)"
			break
		case "titulo":
			format = "%s"
			break
		default:
			format = "%cn (%ce)"
			break
	}

	return sh (
    script: "git --no-pager show -s --format=\'${format}\'",
    returnStdout: true
	).trim()
}
