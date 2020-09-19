
//importe model pessoa
const Empresa = require("../../Models/Empresa");
const Contrato = require("../../Models/Contrato");

//lista de todos os pessoas
exports.index = (requisicao, resposta) => {
    try{
        Empresa.findAll().then((pessoas) => {
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
        resposta.render('admin/empresas/create', {clienteId: clienteId});
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de pessoa no banco de dados
exports.store = (requisicao, resposta) => {
    var {nome,cnpj,atividade,razaoSocial,telefone,clienteId} = requisicao.body;

    try{
        Empresa.create({
            nome: nome,
            cnpj: cnpj,
            atividade: atividade,
            razaoSocial: razaoSocial,
            telefone: telefone,
            clienteId: clienteId,
            /*enderecoId: enderecoId*/
        }).then((empresa) => {
            //resposta.json(empresa);
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
        Empresa.findOne({
            where: {id: id},
            include:[{model: Contrato}], //Join para incluir contratos  
        }).then((empresa) => {
            resposta.render('admin/empresas/show', {
                empresa: empresa,
                clienteId: clienteId,
                contratos: empresa.contratos  
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
        Empresa.findOne({where: {id: id}}).then((empresa) => {
            //resposta.json(empresa);
            resposta.render('admin/empresas/edit', {empresa: empresa, clienteId: clienteId});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar pessoa no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,cnpj,atividade,razaoSocial,telefone,clienteId} = requisicao.body;
    
   //resposta.json(requisicao.body);
   try{
        Empresa.update({
            nome: nome,
            cnpj: cnpj,
            atividade: atividade,
            razaoSocial: razaoSocial,
            telefone: telefone,
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
        Empresa.destroy({where: {id: id}}).then(() => {
            resposta.redirect('/clientes/'+ clienteId);
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};