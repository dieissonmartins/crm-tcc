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
    router.post('/destroy',  clienteController.destroy);
    router.group("/:id", function(router) {
        router.get('/',          clienteController.show);
        router.get('/edit',     clienteController.edit);
        router.post('/update',   clienteController.update);
    });
});

//exportar rotas
module.exports = router;