//importe model Cliente
const Cliente = require("../../Models/Cliente");
const bodyParser = require('body-parser'); 

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

//formulario para cadastro de clientes
exports.create = (requisicao, resposta) => {
    try{
        resposta.render('admin/clientes/create');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de cliente no banco de dados
exports.store = (requisicao, resposta) => {
    var {nome,telefone} = requisicao.body;
    
    Cliente.create({
        nome: nome,
        telefone: telefone
    }).then((cliente) => {
        resposta.redirect('/clientes');
    });
};

exports.show = (requisicao, resposta) => {
    resposta.render('admin/clientes/show');
};

exports.edit = (requisicao, resposta) => {
    resposta.render('admin/clientes/edit');
};

exports.update = (requisicao, resposta) => {
    
};

//requisicao deleta cliente no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;

    Cliente.destroy({where: {id: id}}).then(() => {
        resposta.redirect("/clientes");
    });
};