'use strict'

//importa o mongoose e cria uma constante do Tipo Product 
const orderRepo = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try{
        var data = await orderRepo.get();
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            status: false,
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async(req, res, next) => {
    try{

        //Obtem o token enviado e decodifica para obter informações do customer
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        //Ao criar a ordem atribui o ID do cliente que foi utilizado na geração do token
        await orderRepo.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            status: true,
            message: "Pedido cadastrado com sucesso!"
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao cadastrar o pedido!",
            data: e
        });
    }
}