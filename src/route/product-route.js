'use strict'

//Instancia o express que é um componente para desenvolvimento MVC
const express = require('express');
const router = express.Router();
//Instancia o product controller contendo os métodos que vão processar as requisições de acordo com o método http
const controller = require('../controllers/product-controller');
const authService =  require('../services/auth-service');

//Delega o processamento para o respectivo método no controller
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/listByTag/:tag', controller.getByTag);
//Essas rotas necessitam de autenticação/autorização apenas para usuários com a role admin
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);


module.exports = router;