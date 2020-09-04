
//modulos
const Sequelize = require('sequelize');

const host      = 'localhost';
const port      = 3308;
const db        = 'crm_tcc';
const user      = 'root';
const password  = '';
const typeDb    = 'mysql';
const timeszone = '-03:00';
 
const connection = new Sequelize(
    db, 
    user,
    password, 
    { 
        host: host,
        port: port,
        dialect: typeDb,
        timezone: timeszone
    }
);

//exporta conexão com banco de dados
module.exports = connection;