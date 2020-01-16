'use strict'

//Importa o mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define o Model
const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trin: true,
        index: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

//Exporta o model
module.exports = mongoose.model('Product', schema);