//modulos 
const express = require('express');
    require('express-group-routes');//modulo para agrupamento de rotas  

//import controllers 
const clienteController = require('../Http/Controllers/clienteController');

//Middleware ADMIN
const adminAuth = require('../Http/Middleware/adminAuth');

//carregar router
const router = express.Router();

router.group("/clientes", function(router) {
    router.get('/',             clienteController.index);
    router.get('/create',       clienteController.create);
    router.post('/',            clienteController.store);
    router.get('/:id',          clienteController.show);
    router.get('/:id/edit',     clienteController.edit);
    router.get('/:id/update',   clienteController.update);
    router.get('/:id/destroy',  clienteController.destroy);
});

//exportar rotas
module.exports = router;