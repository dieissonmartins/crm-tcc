
//Modulos
//import Sequelize from "sequelize";
//import connection from "../database/conexao";
const Sequelize     = require('sequelize');
const connection    = require('../database/conexao');

//Model
const Mailer = connection.define('mailer', {
    host:{
        type: Sequelize.STRING,
        allowNull: true
    },
    port:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    secure:{
        type: Sequelize.STRING,
        allowNull: true
    },
    auth_user:{
        type: Sequelize.STRING,
        allowNull: true
    },
    auth_pass:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

//atualizar tabela no banco de dados
Mailer.sync({force: false});

//exportar modulo
module.exports = Mailer;
//export default Mailer;