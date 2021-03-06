
//importe model pessoa
const Pessoa = require("../../Models/Pessoa");
const Contrato = require("../../Models/Contrato");

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
    var {id,clienteId} = requisicao.params;

    try{
        Pessoa.findOne({
            where: {id: id},
            include:[{model: Contrato}], //Join para incluir contratos  
        }).then((pessoa) => {
            resposta.render('admin/pessoas/show', {
                pessoa: pessoa,
                clienteId: clienteId,
                contratos: pessoa.contratos
            });
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco para serem editados
exports.edit = (requisicao, resposta) => {    
    var {id,clienteId} = requisicao.params;
    
    try{
        Pessoa.findOne({where: {id: id}}).then((pessoa) => {
            resposta.render('admin/pessoas/edit', {pessoa: pessoa, clienteId: clienteId});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar pessoa no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,cpf,dataNascimento,telefone,sexo,clienteId} = requisicao.body;

   try{
        Pessoa.update({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            telefone: telefone,
            sexo: sexo,
            clienteId: clienteId,
        }, {where: {id: id}}).then(() => {
            resposta.redirect('/clientes/'+ clienteId);
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//requisicao deleta pessoa no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;
    var clienteId = requisicao.body.clienteId;

    try{
        Pessoa.destroy({where: {id: id}}).then(() => {
            resposta.redirect('/clientes/'+ clienteId);
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};