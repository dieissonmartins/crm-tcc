
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Endereco = connection.define('enderecos', {
    tipo:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cep:{
        type: Sequelize.STRING,
        allowNull: true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: true
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: true
    },
    logradouro:{
        type: Sequelize.STRING,
        allowNull: true
    },
    numero:{
        type: Sequelize.STRING,
        allowNull: true
    },
    complemento:{
        type: Sequelize.TEXT,
        allowNull: true
    },
});


//atualizar tabela no banco de dados
Endereco.sync({force: false});

//exportar modulo
module.exports = Endereco;