//importe model Servico
const Servico = require("../../Models/Servico");

//lista de todos os servicos
exports.index = (requisicao, resposta) => {
    
    try{
        Servico.findAll().then((servicos) => {
            resposta.render('admin/servicos/index',{servicos: servicos});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//formulario para cadastro de servicos
exports.create = (requisicao, resposta) => {
   
    try{
        resposta.render('admin/servicos/create');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de servico no banco de dados
exports.store = (requisicao, resposta) => {
    var {nome,descricao,valor} = requisicao.body;
    
    try{
        Servico.create({
            nome: nome,
            descricao: descricao,
            valor: valor
        }).then((servicos) => {
            resposta.redirect('/servicos');
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco de um servico
exports.show = (requisicao, resposta) => {
    var id = requisicao.params.id;

    try{
        Servico.findOne({where: {id: id}}).then((servico) => {
            resposta.render('admin/servicos/show', {servico: servico});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco para serem editados
exports.edit = (requisicao, resposta) => {    
    var id = requisicao.params.id;
    
    try{
        Servico.findOne({where: {id: id}}).then((servico) => {
            resposta.render('admin/servicos/edit', {servico: servico});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar servico no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,descricao,valor} = requisicao.body;

   try{
        Servico.update({
            nome: nome,
            descricao: descricao,
            valor: valor
        }, {where: {id: id}}).then(() => {
            resposta.redirect("/servicos"); 
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//requisicao deleta servico no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;

    try{
        Servico.destroy({where: {id: id}}).then(() => {
            resposta.redirect("/servicos");
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};