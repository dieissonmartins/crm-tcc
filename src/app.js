
//modulos
const express    = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/conexao');
const session    = require('express-session');
const path       = require("path");

//routes
const routes = require('./routes/routes');

//models 
const Cliente   = require('./Models/Cliente'); 
const Empresa   = require('./Models/Empresa'); 
const Pessoa    = require('./Models/Pessoa');
const Contrato  = require('./Models/Contrato');

//instância do express
const app = express();

//View engine
app.set('view engine', 'ejs');
app.set('views','./public/src/views');

//sessions active
app.use(session({
    secret: "qweasdzxcrtyfghvbnuiopjklçnm",
    cookie:{
        maxAge: 100000 //deslogar em 10 minutos
    }
}));

//EJS arquivos estaticos 
app.use(express.static('public'));
app.use(express.static('node_modules'));

//Body parser
app.use(bodyParser.urlencoded({extends: false})); // aceitar dados de formularios 
app.use(bodyParser.json()); // aceitar dados no formato JSON

//utilizar rotas
app.use('/', routes);

//Database
connection.authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!');
    }).catch((error) => {
        console.log(error);
    });

//exportar modulo
module.exports = app;