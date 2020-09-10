//importe model Produto
const Produto = require("../../Models/Produto");

//lista de todos os produtos
exports.index = (requisicao, resposta) => {
    
    try{
        Produto.findAll().then((produtos) => {
            resposta.render('admin/produtos/index',{produtos: produtos});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//formulario para cadastro de produtos
exports.create = (requisicao, resposta) => {
   
    try{
        resposta.render('admin/produtos/create');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de Produto no banco de dados
exports.store = (requisicao, resposta) => {
    var {nome,descricao,valor} = requisicao.body;
    
    try{
        Produto.create({
            nome: nome,
            descricao: descricao,
            valor: valor
        }).then((produtos) => {
            resposta.redirect('/produtos');
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco de um Produto
exports.show = (requisicao, resposta) => {
    var id = requisicao.params.id;

    try{
        Produto.findOne({where: {id: id}}).then((produto) => {
            resposta.render('admin/produtos/show', {produto: produto});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco para serem editados
exports.edit = (requisicao, resposta) => {    
    var id = requisicao.params.id;
    
    try{
        Produto.findOne({where: {id: id}}).then((produto) => {
            resposta.render('admin/produtos/edit', {produto: produto});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar Produto no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,descricao,valor} = requisicao.body;

   try{
        Produto.update({
            nome: nome,
            descricao: descricao,
            valor: valor
        }, {where: {id: id}}).then(() => {
            resposta.redirect("/produtos"); 
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//requisicao deleta Produto no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;

    try{
        Produto.destroy({where: {id: id}}).then(() => {
            resposta.redirect("/produtos");
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};