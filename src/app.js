
//modulos
const express    = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/conexao');
const session    = require('express-session');

//routes
const routes = require('./routes/routes');

//models
const Cliente   = require('./Models/Cliente'); 
const Contrato  = require('./Models/Contrato');  

//instância do express
const app = express();

//View engine
app.set('view engine', 'ejs');

//sessions active
app.use(session({
    secret: "qweasdzxcrtyfghvbnuiopjklçnm",
    cookie:{
        maxAge: 100000 //deslogar em 10 minutos
    }
}));

//EJS arquivos estaticos 
app.use(express.static('public'));

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