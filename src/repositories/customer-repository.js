'use strict'
const mongoose = require('mongoose'); // Importa o Mongoose para acesso aos dados no MongoDB
const Customer = mongoose.model('Customer'); // Cria a constante apontando para a entidade Customer, do Model

exports.get = async() =>{
    var data = await Customer.find();
    return data;
}

exports.getByid = async(id) =>{
    var data = await Customer.findById(id);
    return data;
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) =>{
    var data = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return data;
}