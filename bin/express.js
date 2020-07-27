const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configurations/variables');

//routers
const indexRouter = require('../routes/index-router');
const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');
const usuarioRouter = require('../routes/usuario-router');

//criando/exportando a api do express
const app = express();

//configuração de parse Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//configuração da conexão com o banco de dados
mongoose.connect(variables.Database.connection, {useNewUrlParser: true});

//configuração de rotas
app.use('/', indexRouter);
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/usuario', usuarioRouter);

//exportação da api
module.exports = app;
