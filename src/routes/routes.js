//mudulos 
const express = require('express');

//Middleware ADMIN
const adminAuth = require('../Http/Middleware/adminAuth');

//carregar router
const router = express.Router();


//exportar rotas
module.exports = router;