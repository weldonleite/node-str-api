'use strict'

//importa o express que é um componente para desenvolvimento MVC
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express(); //Instancia o express

//Conexão com o MongoDB
const config = require("./config");
mongoose.connect(config.connectionString);

//Carrega os Models
const Product = require('./models/Product'); 
const Customer = require('./models/Customer');
const Order = require('./models/Order');

//Importa as rotas
const indexRoute = require('./route/index-route');
const productRoute = require('./route/product-route');
const customerRoute = require('./route/customer-route');
const orderRoute = require('./route/order-route');

//Utiliza o bodyparser para que o content type seja serializado em Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Habilita o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
});

//Aponta as rotas utilizadas no app
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

//Exporta o app
module.exports = app;