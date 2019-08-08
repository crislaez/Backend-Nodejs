'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	marca: String,
	modelo: String,
	procesador: String,
	grafica: String,
	ram: Number,
	rom: Number,
	cantidad: Number,
	color: String,
	precio: Number,
	foto: String
});

module.exports = mongoose.model('Portatil',ProjectSchema);
//Portatil ----> guarda los documentos en la coleccion de labase de datos