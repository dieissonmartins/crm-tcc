
//importe model pessoa
const Pessoa = require("../../Models/Pessoa");

//lista de todos os pessoas
exports.index = (requisicao, resposta) => {
    try{
        Pessoa.findAll().then((pessoas) => {
            resposta.json(pessoas);
            //resposta.render('admin/pessoas/index',{pessoas: pessoas});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//formulario para cadastro de pessoas
exports.create = (requisicao, resposta) => {
    const clienteId = requisicao.params.id;

    try{
        resposta.render('admin/pessoas/create', {clienteId: clienteId});
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de pessoa no banco de dados
exports.store = (requisicao, resposta) => {
    var {nome,cpf,dataNascimento,telefone,sexo,clienteId} = requisicao.body;

    try{
        Pessoa.create({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            telefone: telefone,
            sexo: sexo,
            clienteId: clienteId,
            /*enderecoId: enderecoId*/
        }).then((pessoa) => {
            resposta.redirect('clientes/'+ clienteId);
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco de um pessoa
exports.show = (requisicao, resposta) => {
    var id = requisicao.params.id;

    try{
        Pessoa.findOne({where: {id: id}}).then((pessoa) => {
            resposta.render('admin/pessoas/show', {pessoa: pessoa});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco para serem editados
exports.edit = (requisicao, resposta) => {    
    var id = requisicao.params.id;
    
    try{
        Pessoa.findOne({where: {id: id}}).then((pessoa) => {
            resposta.render('admin/pessoas/edit', {pessoa: pessoa});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar pessoa no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,telefone} = requisicao.body;

   try{
        Pessoa.update({
            nome: nome,
            telefone: telefone
        }, {where: {id: id}}).then(() => {
            resposta.redirect("/pessoas"); 
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//requisicao deleta pessoa no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;

    try{
        Pessoa.destroy({where: {id: id}}).then(() => {
            resposta.redirect("/pessoas");
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};