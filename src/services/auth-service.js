'use strict'
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token){
        res.status(401).json({
            status: false,
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if (error){
                res.status(401).json({
                    status: false,
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
}

//Autoriza se o token é de um usuário admin
exports.isAdmin = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token){
        res.status(401).json({
            status: false,
            message: 'Token inváido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if (error){
                res.status(401).json({
                    status: false,
                    message: 'Token inválido'
                });
            } else {
                if(decoded.roles.includes('admin')){
                    next();
                } else {
                    res.status(403).json({
                        status: false,
                        message: "Esta funcionalidade é restrita para administradores"
                    });
                }
            }
        });
    }
}