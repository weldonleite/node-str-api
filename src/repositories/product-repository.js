'use strict'
const mongoose = require('mongoose'); // Importa o Mongoose para acesso aos dados no MongoDB
const Product = mongoose.model('Product'); // Cria a constante apontando para a entidade Product, do Model

exports.get = async() => {
    const ret = await Product
    .find({
        active: true
    }, 'title price slug');
    return ret;
}

exports.getById = async(id) => {
    const data = await Product.findById(id);
    return data;
}

exports.getByTag = async(tag) => {
    const data = await Product.find({
        tags: tag,
        active : true
       }, 'title price slug tags'
   );
   return data;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = async(id) => {
    await Product.findByIdAndRemove(id);
}