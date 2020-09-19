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

//Middleware ADMIN
//const adminAuth = require('../Http/Middleware/adminAuth');

//carregar router
const router = express.Router();

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
    router.get('/',             contratoController.index);
    router.post('/',            contratoController.store);
    router.get('/:id/:clienteId/:tipo/create',   contratoController.create);
    //router.post('/destroy',     contratoController.destroy);
    //router.get('/:id/edit/:clienteId',     contratoController.edit);
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

//exportar rotas
module.exports = router;