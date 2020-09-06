
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Pessoa        = require('./Pessoa');
const Contrato      = require('./Contrato');
const Empresa       = require('./Empresa');

//Model
const Cliente = connection.define('clientes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//relacionamento com cliente | MUITAS Pessoas para UM Cliente
Pessoa.hasMany(Cliente);

//relacionamento com Empresa | MUITAS Empresas para UM Cliente
Empresa.hasMany(Cliente);

//relacionamento com contratos | MUITOS contratos para UM Cliente
Contrato.hasMany(Cliente);

//atualizar tabela no banco de dados
Cliente.sync({force: false});

//exportar modulo
module.exports = Cliente;