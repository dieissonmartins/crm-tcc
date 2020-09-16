
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Endereco      = require('./Endereco');
const Cliente       = require('./Cliente');

//Model
const Empresa = connection.define('empresas', {
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    razaoSocial:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: true
    },
    atividade:{
        type: Sequelize.TEXT,
        allowNull: true
    },
});

//relacionamento com endereços | UM Endereço para UMA Empresa
Empresa.belongsTo(Endereco);

//relacionamento com cliente | MUITAS Pessoas para UM Cliente
Cliente.hasMany(Empresa);

//atualizar tabela no banco de dados
Empresa.sync({force: false});

//exportar modulo
module.exports = Empresa;