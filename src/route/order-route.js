'use strict'

//Instancia o express que é um componente para desenvolvimento MVC
const express = require('express');
const router = express.Router();
//Instancia o product controller contendo os métodos que vão processar as requisições de acordo com o método http
const controller = require('../controllers/order-controller');
const authService =  require('../services/auth-service');

//Delega o processamento para o respectivo método no controller
router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);


module.exports = router;