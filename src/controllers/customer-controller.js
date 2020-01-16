'use strict'

//importa o mongoose e cria uma constante do Tipo Product 
const customerRepo = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService =  require('../services/auth-service');

exports.get = async(req, res, next) =>{
    try{
        var data = await customerRepo.get();
        res.status(200).send(data);
    }
    catch (e){
        res.status(400).send({
            status: false,
            message: "Erro ao listar clientes"
        });
    }
}

exports.post = async(req, res, next) => {
    try{
        await customerRepo.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: req.body.roles
        });

        emailService.send(req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            status: true,
            message: "Cliente cadastrado com sucesso!"
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao cadastrar o cliente!",
            data: e
        });
    }
}

exports.authenticate = async(req, res, next) => {
    try{
        const customer = await customerRepo.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) 
        });

        if(!customer){
            res.status(404).send({
                status: false,
                message: "Cliente não encontrado"
            });
        }

        //Gera o token passando o ID do cliente, email e nome. Esses dados mais a SALT_KEY serão usados
        //para gerar o token
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            status: true,
            message: "Token gerado com sucesso!",
            token: token,
            data:{
                email : customer.email,
                name: customer.name
            }
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao autenticar o cliente!",
            data: e
        });
    }
}

//Faz o refresh do token a partir de um token válido enviado, sem a necessidade de nova autenticação
exports.refreshToken = async(req, res, next) => {
    try{
        //Obtem o token enviado e decodifica para obter informações do customer
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await customerRepo.getByid(data.id);

        if(!customer){
            res.status(404).send({
                status: false,
                message: "Cliente não encontrado"
            });
        }

        //Gera o token passando o ID do cliente, email e nome. Esses dados mais a SALT_KEY serão usados
        //para gerar o token
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            status: true,
            message: "Token gerado com sucesso!",
            token: token,
            data:{
                email : customer.email,
                name: customer.name
            }
        });
    }
    catch(e){
        res.status(400).send({
            status: false,
            message: "Falha ao autenticar o cliente!",
            data: e
        });
    }
}
