'use strict'

//Importa o mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define o Model
const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

//Exporta o model
module.exports = mongoose.model('Order', schema);