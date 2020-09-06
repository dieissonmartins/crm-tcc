//importe model Cliente
const Cliente = require("../../Models/Cliente"); 

//lista de todos os clientes
exports.index = (requisicao, resposta) => {
    
    try{
        Cliente.findAll().then((clientes) => {
            resposta.render('admin/clientes/index',{clientes: clientes});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

exports.create = (requisicao, resposta) => {
    resposta.render('admin/clientes/create');
};

exports.store = (requisicao, resposta) => {

};

exports.show = (requisicao, resposta) => {
    resposta.render('admin/clientes/show');
};

exports.edit = (requisicao, resposta) => {
    resposta.render('admin/clientes/edit');
};

exports.update = (requisicao, resposta) => {
    
};

exports.destroy = (requisicao, resposta) => {
    
};