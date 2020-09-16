
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Cliente = connection.define('clientes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: true
    },
});

//atualizar tabela no banco de dados
Cliente.sync({force: false});

//exportar modulo
module.exports = Cliente;