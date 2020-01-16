'use strict'

//importa o mongoose e cria uma constante do Tipo Product 
const productRepo = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try{
        var data = await productRepo.get();
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            status: false,
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getById = async(req, res, next) => {
    try{
        var data = await productRepo.getById(req.params.id);
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            status: false,
            message: "Falha ao consultar o produto"
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try{
        var data = await productRepo.getByTag(req.params.tag);
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            status: false,
            message: "Falha ao listar os produtos"
        });
    }
}

exports.post = async(req, res, next) => {
    try{
        await productRepo.create(req.body);
        res.status(201).send({
            status: true,
            message: "Produto cadastrado com sucesso!"
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao cadastrar o produto!",
            data: e
        });
    }
}

exports.put = async(req, res, next) => {
    try{
        await productRepo.update(req.params.id, req.body);
        res.status(200).send({
            status: true,
            message: 'Produto atualzado com sucesso!'
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao atualizar o produto",
            data: e
        });
    }
}

exports.delete = async(req, res, next) => {
    try{
        await productRepo.delete(req.body.id);
        res.status(200).send({
            status: true,
            message: 'Produto removido com sucesso!'
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao remover o produto",
            data: e
        });
    }
}