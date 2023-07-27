# MINIAPP

## Arquitectura

El desarrollo y su estrcutura se debe manejar y pensar sobre arquitectura hexagonal (aka ports & adapter), está arquitectura maneja 3 capas (_infra_,_application_,_domain_) con 3 elementos claves (_actors_,_adapters_,_ports_).
[Más info](https://medium.com/idealo-tech-blog/hexagonal-ports-adapters-architecture-e3617bcf00a0)

![Arquitectura Hexagonal](https://vaadin.com/static/content/learning-center/learn/tutorials/ddd/03__ddd_and_hexagonal/images/hexagonal.png)

En el desarrollo de superapps debido a su naturaleza, inicialmente no se va a aplicar una arquitectura 100% cerrada, por lo que si eres algún purista arquitectoníco es probable que encuentres puntos de mejora/reforma a lo que se define en la estructura del proyecto y su manejo

## Estructura

La estructura de carpetas sugerida es la siguiente:

### Primer nivel

#### Carpeta _raiz_

Esta carpeta es la raiz del proyecto van ubicados los archivos generales de configuración del proyecto y una carpeta _src_.

```markdown
./miniapp
├── src
| ├── assets/
| ├── core/
│ ├── scripts/
│ ├── styles/
│ ├── ui/
│ ├── app.acss
│ ├── app.js
│ └── app.json
├── package.json
├── README.md
└── ... (config files)
```

### Segundo nivel

#### Carpeta _src_

Esta carpeta va contener los archivos principales de la superapp (**_app.js_**,**_app.acss_**,**_app.json_**), así como unas subcarpetas que organizan el contenido de la superapp. La carpeta _assets_ va a contener los archivos tipo assets del app, tales como imágenes, fuentes, etc. La carpeta scripts va a contener todos los archivos **_.js_** globales de la superapp. La carpeta _styles_ va a contener los archivos de estilo globales de la superapp.

> El nombre de cada archivo debe usar la convención camelCase.

```markdown
../src
├── assets
| ├── img
│ │ ├── logo.png
│ └ └── ...
├── core
| ├── common/
| | ├── application/
| | ├── domain/
| | └── infra/
| └── front/
| | ├── app/
| | ├── inicio/
| | └── .../
├── scripts
│ ├── my.js
│ └── ...
├── styles
│ ├── all.acss
│ └── ...
├── ui
│ ├── components/
│ ├── pages/
│ └── templates/
├── app.acss
├── app.js
└── app.json
```

### Tercer nivel

#### Carpeta _ui_

Esta carpeta va contener los archivos altamente acoplados al framework, como son _pages_, _components_ y _templates_, con una subcarpeta para cada tipo de elemento.

- Carpeta _components_:

En esta carpeta deben estar todos los componentes (no externos) que utilice la aplicación. Cada componente de constar de 4 (cuatro) archivos para su correcto funcionamiento, todos con el mismo nombre **_index_** pero con diferentes extensiones según su funcionalidad. (**.axml**,**.acss**,**.js**,**.json**).

> El nombre de cada componente debe usar camelCase.

- Carpeta _pages_:

En esta carpeta deben estar todas las páginas que utilice la aplicación. Cada página de constar de 4 (cuatro) archivos para su correcto funcionamiento, todos con el mismo nombre **_index_** pero con diferentes extensiones según su funcionalidad. (**.axml**,**.acss**,**.js**,**.json**).

> El nombre de cada página debe usar camelCase.

- Carpeta _templates_

En esta carpeta deben estar todos los templates que utilice la aplicación. Cada template de tener únicamente 1 archivo para su correcto funcionamiento, **_index.axml_**.

> El nombre de cada template debe usar camelCase.

```markdown
../ui
├── components
│ ├── miComponente
│ │ ├── index.acss
│ │ ├── index.axml
│ │ ├── index.js
│ │ └── index.json
│ └── ... (otro componente)
├── pages
│ ├── inicio
│ │ ├── index.acss
│ │ ├── index.axml
│ │ ├── index.js
│ │ └── index.json
│ └── ... (otra pagina)
├── templates
│ ├── miTemplate
│ │ └──index.axml
└ └── ... (otro template)
```

#### Carpeta _core_

Esta carpeta va contener los archivos totalmente desacoplados al framework, básados en arquitectura hexagonal, estructurados en 2 subcarpetas, _common_ y _front_. Dentro de la carpeta _front_ van subcarpetas relacionadas a lo que se encuentra en la carpeta _ui_. Dentro de la carpeta common van subcarpetas dependiendo la "capa" de absatracción en donde se encuentre cada archivo (_infra_,_application_,_domain_)

- Carpeta _front_

En esta carpeta van subcarpetas relacionadas a lo que se encuentra en la carpeta _ui_. Adentro de cada subcarpeta se deben encontrar 5 (cinco) archivos nombrados con el mismo nombre de la subcarpeta "front" que los contiene seguido de su funcionalidad. ej:

- **_xxx.adapter.js_**: Archivo adaptador, se encuentra en la capa de abstracción de infra es la puerta de entrada desde la carpeta _ui_
- **_xxx.port.js_**: Archivo port, se encuentra en la capa de abstracción de aplicación y es la interfaz o puerta de enlace desde la capa de aplicación hacia la capa de dominio
- **_xxx.data.js_**: Archivo data, se encuentra en la capa de abstracción de dominio y contiene la definición de textos, constantes y data propia de cada front
- **_xxx.useCase.js_**: Archivo useCase, se encuentra en la capa de abstracción de dominio y contiene la lógica principal y los casos de uso detallados del app
- **_xxx.useCase.test.js_**: Archivo test, contiene las pruebas unitarias de cada front.

> El nombre de cada front debe usar camelCase y/o llamarse igual a su homologo en la carpeta ui.

```markdown
../core
| ├── common/...
| ├── front/
| | ├── app/
| | │ ├── app.adapter.js
| | │ ├── app.data.js
| | │ ├── app.port.js
| | │ ├── app.useCase.js
| | │ └── app.useCase.test.js
| | ├── inicio/
| | │ ├── inicio.adapter.js
| | │ ├── inicio.data.js
| | │ ├── inicio.port.js
| | │ ├── inicio.useCase.js
| | │ └── inicio.useCase.test.js
| | ├── ... (otro front)
| | │ ├── ...adapter.js
| | │ ├── ...data.js
| | │ ├── ...port.js
| | │ ├── ...useCase.js
└ └ └ └── ...useCase.test.js
```

- Carpeta _common_

En esta carpeta van subcarpetas dependiendo la "capa" de absatracción en donde se encuentre cada archivo (_infra_,_application_,_domain_).

- _infra_: Es la capa más externa y permite la comunicación de entrada/salida, contiene archivos **_xxx.adapter_**
- _application_: Es la capa intermedia entre la capa de _infra_ y la capa de _domain_,permite la comunicación entre las 2 capas y maneja una pequeña lógica a nivel negocio, contiene archivos **_xxx.port_**
- _domain_: Es la capa más interna y maneja la mayoría de lógica a nivel de aplicación/negocio, contiene archivos **_xxx.model_** y **_xxx.key_**

```markdown
../core
| ├── front/...
| ├── common/
| | ├── application/
| | │ ├── index.js
| | │ ├── xx.port.js
| | │ ├── yy.port.js
| | │ └── ...port.js
| | ├── domain/
| | │ ├── index.js
| | │ ├── xx.model.js
| | │ ├── yy.model.js
| | │ ├── keys.js
| | │ └── ...model.js
| | └── infra/
| | │ ├── index.js
| | │ ├── xx.adapter.js
| | │ ├── yy.adapter.js
└ └ └ └── ...adapter.js
```

### Components vs Templates

Cuando se reutilizan elementos dentro de diferentes páginas se deben utilizar components/templates para evitar repetir código, se deben usar de la siguiente manera:

- component: Cuando se requiere re utilizar un elemento entre diferentes páginas, y este elemento requiere el uso de lógica en archivos .js
- template: Cuando se requiere re utilizar un elemento entre diferentes páginas, y este elemento solamente es visual (.axml) o su lógica no requiere de archivos .js

> Evitar el uso de estilos propios de cada component/template, para esto usar los estilos de la librería mencionada previamente

## Consideraciones

A continuación algunas consideraciones o buenas prácticas a tener en cuenta al momento de desarrollar en superapps

### Components vs Templates

Cuando se reutilizan elementos dentro de diferentes páginas se deben utilizar components/templates para evitar repetir código, se deben usar de la siguiente manera:

- component: Cuando se requiere re utilizar un elemento entre diferentes páginas, y este elemento requiere el uso de lógica en archivos .js
- template: Cuando se requiere re utilizar un elemento entre diferentes páginas, y este elemento solamente es visual (.axml) o su lógica no requiere de archivos .js

> Evitar el uso de estilos propios de cada component/template, para esto usar estilos globales/comunes

### Estilos (_.acss_)

1. No se debe usar estilos en línea dentro de los archivos .axml
2. Evitar crear estilos propios por cada página/componente/template dentro de los archivos .acss correspondientes
3. Usar los estilos globales/comunes, esto evitaría crear estilos propios para cada página/componente/template.
4. Aunque dentro de las miniapps existe la medida _rpx_ para el renderizado en los dispositivos, por retrocompatibilidad, evitar el uso de esta medida ("rpx") y en cambio usar "px","em" o "rem"
5. Para los estilos creados, No usar el nombre del tag como selector.
6. Los selectores de menor especificidad deben ubicarse antes que los selectores de mayor especificidad.
7. No deben existir propiedades duplicadas dentro de un selector
8. No tener imports duplicados
9. No usar selectores duplicados
10. No deben haber selectores vacios
11. No deben haber comentarios vacíos
12. Los colores hexadecimales deben ser correctos
13. Debe existir una línea o un espacio antes y después de una operacion dentro de la función calc
14. Cuando se usen gridareas, se debe crear almenos una celda y los token de celdas por fila debe ser equivalente
15. Los comentarios no pueden ser con doble slash
16. Los imports deben ir primero que cualquier regla de estilo
17. Las cadenas de texto deben ir en la misma linea

```html
<!--xfile.axml-->

<!--***PUNTO 1***-->
<!--NO-->
<view style="color:red;"></view>
<!--SI-->
<view class="rojo"></view>
```

```css
/*xfile.acss*/

/*******PUNTOS 2 - 3**********/
/*NO:*/
.botonPaginaInicio {
	color: red;
}
/*SI*/
/* --> usar estilos globales*/

/*******PUNTO 4**********/
/*NO:*/
.caja {
	width: 100rpx;
}
/*SI:*/
.caja {
	width: 100px;
}

/*******PUNTO 5**********/
/*NO:*/
view.miclase {
	color: red;
}
/*SI:*/
.miclase {
	color: red;
}

/*NO:*/
.miclase > image {
	width: 100%;
}
/*SI:*/
.miclase > .imagen {
	width: 100%;
}

/*******PUNTO 6**********/
/*NO:*/
b a {
}
a {
}
/*SI:*/
a {
}
b a {
}

/*NO:*/
b > a[foo] {
}
a[foo] {
}
/*SI:*/
a[foo] {
}
b > a[foo] {
}

/*NO:*/
a {
	& > b {
	}
}
b {
}
/*SI:*/
b {
}
a {
	& > b {
	}
}

/*******PUNTO 7**********/
/*NO:*/
a {
	color: pink;
	background: orange;
	color: orange;
}
/*SI:*/
a {
	color: pink;
	background: orange;
}

/*******PUNTO 8**********/
/*NO:*/
@import "a.css";
@import "b.css";
@import url(a.css);
@import "ba.css";
/*SI:*/
@import url("a.css") projection;
@import url("a.css") tv;
@import "b.css";

/*******PUNTO 9**********/
/*NO:*/
.foo,
.bar,
.foo {
}
/*SI:*/
.foo {
}
.bar {
}
.foo .bar {
}
.bar .foo {
}

/*NO:*/
@media (min-width: 10px) {
	.foo {
	}
	.foo {
	}
}
/*SI:*/
.foo {
}
@media (min-width: 10px) {
	.foo {
	}
}

/*NO:*/
a b {
}
a {
	& b {
	}
}
/*SI:*/
a b {
}
a {
	& b,
	& c {
	}
}

/*******PUNTO 10**********/

/*NO:*/
a {
}
b {
}
/*SI:*/
a {
	/* foo */
}
b {
	color: red;
}

/*******PUNTO 11**********/

/*NO:*/

/**/

/* */

/*

*/

/*SI:*/

/* comentario */

/*
 * Comentario multiple
**/

/*******PUNTO 12**********/

/*NO:*/
a {
	color: #00;
}
a {
	color: #fff1az;
}
a {
	color: #12345aa;
}

/*SI:*/
a {
	color: #000;
}
a {
	color: #000f;
}
a {
	color: #fff1a0;
}
a {
	color: #123450aa;
}

/*******PUNTO 13**********/

/*NO:*/
a {
	top: calc(1px+2px);
}
a {
	top: calc(1px+ 2px);
}

/*SI:*/
a {
	top: calc(1px + 2px);
}
a {
	top: calc(calc(1em * 2) / 3);
}
a {
	top: calc(calc(1em * 2) / 3);
}
a {
	top: calc(var(--foo) + var(--bar));
}
a {
	top: calc(var(--foo) + var(--bar));
}

/*******PUNTO 14**********/

/*NO:*/
a {
	grid-template-areas: "";
}
a {
	grid-template-areas:
		"a a a"
		"b b b b";
}
a {
	grid-template-areas:
		"a a a"
		"b b a";
}

/*SI:*/
a {
	grid-template-areas:
		"a a a"
		"b b b";
}

/*******PUNTO 15**********/

/*NO:*/
a {
	//color: pink;
}
//a { color: pink; }
// Comment {}
a {
	color: pink;
}
/*SI:*/
a {
	/* color: pink; */
}
/* a { color: pink;  } */

/*******PUNTO 16**********/

/*NO:*/
a {
}
@import "foo.css";
@media print {
}
@import "foo.css";
/*SI:*/
@import "foo.css";
a {
}
/*SI:*/
/* some comment */
@import "foo.css";
/*SI:*/
@charset 'utf-8';
@import "foo.css";
/*SI:*/
@layer default;
@import url(theme.css) layer(theme);

/*******PUNTO 17**********/

/*NO:*/
a {
	content: "first
    second";
}
[title="something
is probably wrong"] {
}
a {
	font-family: "Times
    New
    Roman";
}
/*SI:*/
a {
	content: "first\Asecond";
}
a {
	content: "first\\nsecond";
}
[title="nothing\
  is wrong"] {
}
a {
	font-family: "Times New Roman";
}
```

### Javascript

- framework:

  - Evitar el uso de la variable **my** en el archivo **index.js** dentro de las páginas/componentes.
  - Dentro de la carpeta "/scripts" debe existir un archivo "my.js" el cuál **_DEBE_** ser el único lugar del proyecto donde se utilice esta variable
  - Evitar al máximo el uso de librerías externas
  - Optimizar el uso de "_this.setData()_" para ejecutarlo la cantidad mínima de veces posible
  - Usar la información que se necesita entre pantalla con el storage, en vez de la función _getApp()_

- variables:

  - Los nombres de las clases deben ir en PascalCase y deben contener las palabras "Adapter","Port","Model","Key""UseCase". ej: "LoginAdapter"
  - Los nombres de las constantes numéricas, cuando se utilizan para corregir el error de magic numbers, pueden ir en camelCase o pueden ir en SREAMING_SNAKE_CASE y terminar con "\_NUMBER". ej: "LINE_NUMBER"
  - Los nombres del resto de variables deben estar en camelCase
  - Las variables deben ser inicializadas al momento de la declaración
  - La declaración e inicialización de variables "var" y "let" deben ir en un solo instante, en lineas diferentes
  - La declaración e inicialización de "const" deben ir máximo una por linea
  - Los nombres de las variables debe ser mínimo 3, máximo 20 caracteres

- estandar:
  - Se deben evitar los magic number
  - Se deben evitar los console.log
  - Las comparaciones se deben hacer con triple igual en vez de doble (===)
  - La definicion de variables/funciones se debe hacer antes de su uso
  - Las funciones deben tener una forma de retorno consistente
  - Los switch deben tener un case default
  - La máxima profundidad de anidación es de 3
  - Cuando se esté recorriendo un loop for-in se debe garantizar que los atributos que se van a usar existen en el objeto
  - siempre que se use await debe ir dentro de una funcion async y no puede existir una funcion async si no usa await
  - La cantidad máxima de declaraciones por función es de 15
  - Los imports deben estar ordenados alfabeticamente y primero deben estar los imports multiples sobre los sencillos
  - Las llaves de los objetos deben estar ordenadas alfabeticamente
  - No deben existir funciones vacías
  - La cantidad máxima de lineas de código por archivo, sin unlcuir comentarios ni lineas en blanco es de 300
  - La cantidad máxima de callbacks anidados es 3
  - La cantidad máxima de parámetros por función es 3
  - La longitud máxima de una línea de código es 120
  - La cantidad máxima de declaraciones por línea es 1
  - Despues de usar la palabra "new", es decir, crear una nueva instancia de un objeto el objeto a instanciar debe empezar con mayúscula
  - Las comillas deben ser dobles
  - Se debe usar punto y coma al final de las sentencias
  - La identación se debe realizar con tabs (2)

## Pendientes

Si se suben desarrollos donde aún quede trabajo por realizar pero se debe subir para pruebas, por ejemplo, Información "quemada", uso de estilos que aún no estén en la librería o funciones que aún no estén creados en los scripts correspondientes. Se debe crear el comentario TODO para poder hacer un correcto seguimiento de estas actividades:

Ej:

```javascript
/*page/x/index.js*/

//TODO: Usar la variable my desde el script my.js
my.funcionnueva({x, y});
```

## Consideraciones

### Estilos

- Aunque dentro de las miniapps existe la medida _rpx_ para el renderizado en los dispositivos, por retrocompatibilidad, evitar el uso de esta medida ("rpx") y en cambio usar "px","em" o "rem"
- No se debe usar estilos en línea dentro de los archivos .axml
- Evitar crear estilos propios por cada página/componente/template dentro de los archivos .acss correspondientes
- Usar los estilos de la librería **@clarocolombia/claro-super**, esto evitaría crear estilos propios para cada página/componente/template.

Si después de usar la librería es necesario crear estilos propios, para todos los estilos creados **_EVITAR_** usar el nombre del tag como selector. ej:

```css
/*NO:*/
view.miclase {
	color: red;
}
/*SI:*/
.miclase {
	color: red;
}
/*NO:*/
.miclase > image {
	width: 100%;
}
/*SI:*/
.miclase > .imagen {
	width: 100%;
}
```

### Javascript

- Evitar el uso de la variable **my** en el archivo **index.js** dentro de las páginas/componentes.
- Dentro de la carpeta "/scripts" existe un archivo "my.js" el cuál **_DEBE_** ser el único lugar del proyecto donde se utilice esta variable
- Para todos los popups hacer uso de la función _showAlert_
- Evitar el uso de librerías externas, si se considera necesario, ponerlo como punto de discusión con el equipo
- Los servicios se deben consumir **únicamente** a través del archivo "**scripts/request**.
- El consumo de servicios se debe hacer utlizando _async_ y _await_, NO se debe utilizar _then_/_catch_
- Optimizar el uso de "_this.setData()_" para ejecutarlo la cantidad mínima de veces posible
- Para la utilización de dataGlobal utilizar la funcion _getApp()_
- Nombres claros de variables

Ejemplo consumo servicio:

```javascript
/*page/x/index.js*/
/*component/x/index.js*/

//Importar el servicio
import {nombreServicioxxx} from "../../scripts/request";

//Si hay error retorna false
//Si es exitoso puede retornar un json o un string
const respuestaServicio = await nombreServicioxxx();

//Unicamente si en necesario hacer una lógica al fallar el servicio
if (!respuestaServicio) {
	//Lógica al fallar el servicio
}
```

## Flujo Trabajo

- Desde la rama _main_ crear una rama por desarrollador y adentro de esa rama crear una rama por funcionalidad ej: _jgaray/splash_
- Instalar las dependecias
- Los commits deben seguir el siguiente estandar: [link](https://www.conventionalcommits.org/en/v1.0.0/)
- Antes de hacer un commit ejecutar el comando '\_npm run check', si hay errores corregirlos antes de hacer el commit
- Al finalizar una funcionalidad se debe crear un PR hacia la rama _main_, si hay conflictos solucionarlos antes de solicitar el review, cada PR debe ser aprobado por minimo 3 personas

Notas en cuanto a los PRs:

- Subir PRs pequeños será más fácil y rápido para todos, hacer PRs lo más pequeños posibles
- Estar bajando constantemente de main ya que se están subiendo bastantes cambios en corto tiempo y los PRs pueden generar conflictos
- Después de hacer merge las ramas remotas se van a eliminar, deben volver a crearla o crear una nueva

## Pendientes

Si se suben desarrollos donde aún quede trabajo por realizar pero se debe subir para pruebas, por ejemplo, Información "quemada", uso de estilos que aún no estén en la librería o funciones que aún no estén creados en los scripts correspondientes. Se debe crear el comentario TODO para poder hacer un correcto seguimiento de estas actividades:

Ej:

```javascript
/*page/x/index.js*/

//TODO: Usar la variable my desde el script my.js
my.funcionnueva({x, y});
```
