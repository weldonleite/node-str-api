'use strict'

//Importa o mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define o Model
const schema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório']
    },
    password:{
        type: String,
        required: [true, 'A senha é obrigatória']
    },
    roles: [{
            type: String,
            required: true,
            enum: ['user','admin'],
            default: 'user'
        }]
});

//Exporta o model
module.exports = mongoose.model('Customer', schema);