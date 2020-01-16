'use strict'
const mongoose = require('mongoose'); // Importa o Mongoose para acesso aos dados no MongoDB
const Order = mongoose.model('Order'); // Cria a constante apontando para a entidade Order, do Model

exports.get = async() => {
    const ret = await Order.find({}, 'number status')
    .populate('customer', 'name email')
    .populate('items.product', 'title price'); //Obtém os dados da ordem populando os dados do customer e produtos associados ao pedido
    return ret;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}