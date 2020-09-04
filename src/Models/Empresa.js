
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Endereco      = require('./Endereco');

//Model
const Empresa = connection.define('empresas', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    razaoSocial:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    atividade:{
        type: Sequelize.TEXT,
        allowNull: false
    },
});

//relacionamento com endereços | UM Endereço para UMA Empresa
Empresa.belongsTo(Endereco);

//atualizar tabela no banco de dados
Empresa.sync({force: true});

//exportar modulo
module.exports = Empresa;