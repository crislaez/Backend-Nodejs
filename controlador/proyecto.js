'use strict'

var Project = require('../modelo/proyecto');
var fs = require('fs');

var controlador = {

	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	home: function(req, res){
		return res.status(200).send({
			mesage: 'Soy la home'
		});
	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	//crear y guardar projectos en mongodb
	saveProject: function(req, res){
		var portatil = new Project();
		var params = req.body;

		portatil.marca = params.marca;
		portatil.modelo = params.modelo;
		portatil.procesador = params.procesador;
		portatil.grafica = params.grafica;
		portatil.ram = params.ram;
		portatil.rom = params.rom;
		portatil.cantidad = params.cantidad;
		portatil.color = params.color;
		portatil.precio = params.precio;
		portatil.foto = null//params.marca;

		portatil.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar'});
			if(!projectStored) return res.status(404).send({message: 'No se a podido guardar'});

			return res.status(200).send({portatil: projectStored});
		});

	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	//mostrar todos los projectos
	getProjects: function(req, res){
		Project.find({}).exec((err, projects) => {
			if(err) return res.status(500).send({message: 'Error al devolver portatiles'});
			if(!projects) return res.status(404).send({message: 'No existen'});

			return res.status(200).send({projects});
		});
	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	//mostrar projecto por id
	getProject: function(req, res){
		var projecId = req.params.id;

		if(projecId == null){
			return res.status(404).send({message: 'El portatil no existe'});

		}
		Project.findById(projecId, (err, project) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos'});
			if(!project) return res.status(404).send({message: 'El proyecto no existe'});

			return res.status(200).send({
				project
			})
		});

	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	//modificar projecto
	updateProject: function(req, res){
		var projecId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projecId, update, {new: true}, (err, projectUpdate) =>{
			if(err) return res.status(500).send({message: 'Error al actualizar'});
			if(!projectUpdate) return res.status(404).send({message: 'No existe el portatil'});

			return res.status(200).send({project: projectUpdate});
		});
	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------
	//borrar projecto	
	deleteProject: function(req, res){
		var projecId = req.params.id;
		Project.findByIdAndRemove(projecId, (err, projectRemove) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar'});
			if(!projectRemove) return res.status(404).send({message: 'No se puede eliminar'});

			return res.status(200).send({project: projectRemove});
		});
	},
	//estos metodos se ponen en el archivo project de la carpeta rutes------	
	//modificar y subir imagen
	uploadImage: function(req, res){
		var projecId = req.params.id;
		var fileName = 'Imagen no subida..';
		
		if(req.files){
			var filePath = req.files.foto.path;
 			var fileSplit = filePath.split('\\');
 			var fileName = fileSplit[1];
 			var exSplit = fileName.split('\.');
 			var fileExt = exSplit[1];
 			// var fileName = req.files.foto.originalFilename;
 			// var fileSplit = fileName.split('.');
 			// var fileExt = fileSplit[1];

 			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
 			Project.findByIdAndUpdate(projecId, {foto: fileName}, {new: true}, (err, projectUpdate) => {
 				if(err) return res.status(500).send({message: 'La imagen no se a subido'});
 				if(!projectUpdate) return res.status(404).send({message: 'El portatil no existe'});

 				return res.status(200).send({project: projectUpdate});
 				// return res.status(200).send({project: projectUpdate, message: req.files});
 			});	

 			}
 			else{
 				fs.unlink(filePath, (err) => {
 					return res.status(200).send({message: 'la extension no es valida'});
 				})
 			}
		}
		else{
			return res.status(200).send({message: fileName});
		}
	}



};

module.exports = controlador;