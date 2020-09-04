
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Endereco      = require('./Endereco');

//Model
const Pessoa = connection.define('pessoas', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//relacionamento com endereços | UM Endereço para UMA Pessoa
Pessoa.belongsTo(Endereco);

//atualizar tabela no banco de dados
Pessoa.sync({force: true});

//exportar modulo
module.exports = Pessoa;