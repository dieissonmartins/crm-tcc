
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Produto = connection.define('produtos', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
});


//atualizar tabela no banco de dados
Produto.sync({force: false});

//exportar modulo
module.exports = Produto;