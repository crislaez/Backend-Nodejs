'use strict'

var express = require('express');
var ProjectController = require('../controlador/proyecto');
var router = express.Router();

//hacer un middleware para subir imagenes
var multipart = require('connect-multiparty');  //crear la carpeta upload en el projecto------
var multipartMiddleware = multipart({uploadDir: './img'});
//creamos las 2 variables de arriva para que suba las fotos tambien en nuetro projecto---------------

router.get('/home',ProjectController.home); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.post('/projectSave',ProjectController.saveProject); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.get('/projectGetAll',ProjectController.getProjects); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.get('/projectGet/:id?',ProjectController.getProject); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.put('/projectUpdate/:id',ProjectController.updateProject); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.delete('/projectRemove/:id',ProjectController.deleteProject); //estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.post('/projectImg/:id',multipartMiddleware,ProjectController.uploadImage);//en postman damos en body a form data para escoger el tipo de archivo

module.exports = router;