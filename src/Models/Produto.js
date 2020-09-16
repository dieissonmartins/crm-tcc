
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Produto = connection.define('produtos', {
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: true
    },
    valor:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
});


//atualizar tabela no banco de dados
Produto.sync({force: false});

//exportar modulo
module.exports = Produto;