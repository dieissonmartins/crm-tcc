//modulos 
const express = require('express');
    require('express-group-routes');//modulo para agrupamento de rotas  

//import controllers 
const clienteController = require('../Http/Controllers/clienteController');
const produtoController = require('../Http/Controllers/produtoController');
const servicoController = require('../Http/Controllers/servicoController');
const pessoaController  = require('../Http/Controllers/pessoaController');
const empresaController = require('../Http/Controllers/empresaController');
const contratoController = require('../Http/Controllers/contratoController');
const userController     = require('../Http/Controllers/userController');

//Middleware ADMIN
const adminAuth = require("../Http/Middleware/adminAuth");


//upload de arquivos
const multer = require("multer");


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
module.exports = router;