'use strict';

var path = require('path');
var fs = require('fs');
var nconf = require('nconf');

var root = './configuration/environment' ;
var env = process.env.NODE_ENV || 'development';
var rootEnv = path.join(root, env.toString().trim());


/**
 * Cargar las configuraciones en el siguiente orden
 * 
 * 1. Sobre escribimos variables de entorno
 * 2. Analizar desde "process.argv" => objeto que contiene los argumentos de linea de comando
 * 3. Analizar desde "process.env" => objeto que contiene las variables de entorno del sistema
 * 4. Analizar desde un archivo json
 */

//
// 1. Sobre escribimos(si existe) o creamos(de no existir), la variable de entorno "process.env.NODE_ENV"
//
nconf.overrides({
  NODE_ENV: env
});

//
// 2. Agregamos argumentos de linea de comandos, desde "process.argv"
//
nconf.argv();

//
// 3. Agrega variables de entornos, desde "process.env". Difinimos en el arreglo que solo utilizaremos "NODE_ENV"
//
nconf.env(['NODE_ENV']);

//
// 4. Cargamos los archivos de la ruta configurada en la variable "rootEnv"
//

// readdirSync => Lee el directorio de forma sincrona y retorna un arreglo con los nombres de los archivos encontrados
// forEach => Recorremos el arreglo de nombres de archivos
fs.readdirSync(rootEnv).forEach(function(name){
	var filename = path.join(rootEnv, name);
	var custom = name + '-' + env;

	nconf.file(custom, { file: filename });
})

module.exports = nconf;