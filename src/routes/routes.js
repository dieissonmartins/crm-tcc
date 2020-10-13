//modulos 
const express = require('express');
    require('express-group-routes');//modulo para agrupamento de rotas  

//teste socket.io
var app  = express();
var http = require("http").createServer(app);
var io   = require("socket.io")(http);

io.on("connection",(socket) => {
    console.log(socket.id);
});
/////////////////

//import controllers 
import clienteController from "../Http/Controllers/clienteController";
import produtoController from "../Http/Controllers/produtoController";
import servicoController from "../Http/Controllers/servicoController";
import pessoaController from "../Http/Controllers/pessoaController";
import empresaController from "../Http/Controllers/empresaController";
import contratoController from "../Http/Controllers/contratoController";
import userController from "../Http/Controllers/userController";

//teste gerar PDF
import pdf from "html-pdf";

//const clienteController = require('../Http/Controllers/clienteController');
//const produtoController = require('../Http/Controllers/produtoController');
//const servicoController = require('../Http/Controllers/servicoController');
//const pessoaController  = require('../Http/Controllers/pessoaController');
//const empresaController = require('../Http/Controllers/empresaController');
//const contratoController = require('../Http/Controllers/contratoController');
//const userController     = require('../Http/Controllers/userController');

//Middleware ADMIN
import adminAuth from "../Http/Middleware/adminAuth";
//const adminAuth = require("../Http/Middleware/adminAuth");



//teste mercado pado
import MercadoPago from "mercadopago";

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-4596512322898184-100717-3e86cbbe22624bba2e387a26a5785a49-215990228"
});

//upload de arquivos
const multer = require("multer");
const { Socket } = require('dgram');


const storage = multer.diskStorage({
    destination: function(requisicao,anexoFile, cb){
        cb(null,"upload/contratos/");
    },
    filename: function(requisicao,anexoFile, cb){
        cb(null, anexoFile.originalname);
    }
});

//deretorios dos contratos
const uploadContrato = multer({storage});

//carregar router
const router = express.Router();

router.group('/login', function(router){
    router.get('/', userController.login);
    router.post("/authenticate", userController.authenticate);
});

//Middleware authentication
router.use(adminAuth);


router.get("/pagar", async (req, res) => {

    var id                 = "" + Date.now();
    var emailPagador       = "dev.martins.santos@gmail.com";
    var descricao          = "descrição da venda aqui...";
    var valor              = 100;

    var dados = {
        items: [
            {
                id: id,
                title: descricao, 
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(valor)
            }
        ],
        payer:{
            email: emailPagador
        },
        external_reference: id,
    };

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);

    } catch (error) {
        console.log(error);
    }
});

router.get("/gerarpdf", (req, res) => {
    pdf.create("Olá, teste gerar pdf com node.js",{}).toFile("./arquivogerado.pdf",(err,res) => {
        res.send("PDF criado...");
    });
});

router.group('/clientes', function(router) {
    router.get('/',             clienteController.index);
    router.get('/create',       clienteController.create);
    router.post('/',            clienteController.store);
    router.post('/destroy',     clienteController.destroy);
    router.get('/:id/edit',     clienteController.edit);
    router.get('/:id/',         clienteController.show);
    router.post('/update',      clienteController.update);
});

router.group('/pessoas', function(router) {
    router.get('/',             pessoaController.index);
    router.post('/',            pessoaController.store);
    router.get('/:id/create',   pessoaController.create);
    router.post('/destroy',     pessoaController.destroy);
    router.get('/:id/edit/:clienteId',     pessoaController.edit);
    router.get('/:id/:clienteId',         pessoaController.show);
    router.post('/update',      pessoaController.update);
});

router.group('/empresas', function(router) {
    router.get('/',             empresaController.index);
    router.post('/',            empresaController.store);
    router.get('/:id/create',   empresaController.create);
    router.post('/destroy',     empresaController.destroy);
    router.get('/:id/edit/:clienteId',     empresaController.edit);
    router.get('/:id/:clienteId',         empresaController.show);
    router.post('/update',      empresaController.update);
});

router.group('/contratos', function(router) {
    router.get('/',                              contratoController.index);
    router.post('/', uploadContrato.single("anexoFile"),   contratoController.store);
    router.get('/:id/:clienteId/:tipo/create',   contratoController.create);
    //router.post('/destroy',     contratoController.destroy);
    //router.get('/:id/edit/:cuploadContratoslienteId',     contratoController.edit);
    //router.get('/:id/',         contratoController.show);
    //router.post('/update',      contratoController.update);
});

router.group('/servicos', function(router) {
    router.get('/',             servicoController.index);
    router.get('/create',       servicoController.create);
    router.post('/',            servicoController.store);
    router.post('/destroy',     servicoController.destroy);
    router.get('/:id/edit',     servicoController.edit);
    router.get('/:id/',         servicoController.show);
    router.post('/update',      servicoController.update);
});

router.group('/produtos', function(router) {
    router.get('/',             produtoController.index);
    router.get('/create',       produtoController.create);
    router.post('/',            produtoController.store);
    router.post('/destroy',     produtoController.destroy);
    router.get('/:id/edit',     produtoController.edit);
    router.get('/:id/',         produtoController.show);
    router.post('/update',      produtoController.update);
});

router.group('/users', function(router) {
    router.get('/',             userController.index);
    router.get('/create',       userController.create);
    router.post('/',            userController.store);
    router.post('/destroy',     userController.destroy);
    router.get('/logout',       userController.logout);
    //router.get('/:id/edit',     userController.edit);
    //router.get('/:id/',         userController.show);
    //router.post('/update',      userController.update);
});

//exportar rotas
export default router;
//module.exports = router;