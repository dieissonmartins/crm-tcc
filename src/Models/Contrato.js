
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Produto       = require('./Produto');
const Servico       = require('./Servico');
const Pessoa        = require('./Pessoa');
const Empresa       = require('./Empresa');

//Model
const Contrato = connection.define('contratos', {
    dataVenda:{
        type: Sequelize.DATE,
        allowNull: true
    },
    dataVencimento:{
        type: Sequelize.DATE,
        allowNull: true
    },
    valor:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    codigo:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    pagador:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    anexoFile:{
        type: Sequelize.TEXT,
        allowNull: true
    },
});

//relacionamento com contrato | MUITOS Produtos para UM Contrato
Produto.hasMany(Contrato);

//relacionamento com contrato | MUITOS Serviços para UM Contrato
Servico.hasMany(Contrato);

//relacionamento com cliente | MUITAS Pessoas para UM Cliente
Pessoa.hasMany(Contrato);

//relacionamento com cliente | MUITAS Pessoas para UM Cliente
Empresa.hasMany(Contrato);

//atualizar tabela no banco de dados
Contrato.sync({force: false});

//exportar modulo
module.exports = Contrato;