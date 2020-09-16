
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Servico = connection.define('servicos', {
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
Servico.sync({force: false});

//exportar modulo
module.exports = Servico;