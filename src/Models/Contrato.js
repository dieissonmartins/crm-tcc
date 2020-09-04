
//Modulos
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');
const Produto       = require('./Produto');
const Servico       = require('./Servico');

//Model
const Contrato = connection.define('contratos', {
    dataVenda:{
        type: Sequelize.DATE,
        allowNull: false
    },
    dataVencimento:{
        type: Sequelize.DATE,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    anexoFile:{
        type: Sequelize.TEXT,
        allowNull: false
    },
});

//relacionamento com contrato | MUITOS Produtos para UM Contrato
Produto.hasMany(Contrato);

//relacionamento com contrato | MUITOS Serviços para UM Contrato
Servico.hasMany(Contrato);


//atualizar tabela no banco de dados
Contrato.sync({force: true});

//exportar modulo
module.exports = Contrato;