//importe model Cliente
import Cliente from "../../Models/Cliente";
import Pessoa from "../../Models/Pessoa";
import Empresa from "../../Models/Empresa";
import nodemailer from "nodemailer";
//const Cliente       = require("../../Models/Cliente");
//const Pessoa        = require("../../Models/Pessoa");
//const Empresa = require("../../Models/Empresa");

let transporter = nodemailer.createTransport({
    host: "Informe servidor aqui...",
    port: 587, //porta de entrada
    secure: true, //possui SSl: TRUE : FALSE
    auth: {
        user: "", //email
        pass: "12345" //senha 
    }
});


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
    
    try{
        Cliente.create({
            nome: nome,
            telefone: telefone
        }).then((cliente) => {
            transporter.sendMail({
                from:"Dieisson Martins <>  emailAuthAqui",
                to:"dieisson.martins.santos@gmail.com",
                subject:"oi, sou o Dieisson este é um email de teste",
                text:"oi, sou o Dieisson este é o corpo do email de teste",
                html:"<p>oi, sou o Dieisson este é o corpo do email de teste</p>"
            }).then(() => {
                resposta.redirect('/clientes');
            });
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco de um cliente
exports.show = (requisicao, resposta) => {
    var id = requisicao.params.id;

    try{
        Cliente.findOne({
            where: {id: id},
            include:[{model: Pessoa},{model: Empresa}], //Join para incluir pessoas da clientes  
        }).then((cliente) => {
            //resposta.json(cliente);
            resposta.render('admin/clientes/show', {
                cliente: cliente,
                pessoas: cliente.pessoas,
                empresas: cliente.empresas
            });
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//modulo para buscar dados no banco para serem editados
exports.edit = (requisicao, resposta) => {    
    var id = requisicao.params.id;
    
    try{
        Cliente.findOne({where: {id: id}}).then((cliente) => {
            resposta.render('admin/clientes/edit', {cliente: cliente});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao para editar cliente no banco de dados
exports.update = (requisicao, resposta) => {
   var {id,nome,telefone} = requisicao.body;

   try{
        Cliente.update({
            nome: nome,
            telefone: telefone
        }, {where: {id: id}}).then(() => {
            resposta.redirect("/clientes"); 
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//requisicao deleta cliente no banco de dados
exports.destroy = (requisicao, resposta) => {
    var id = requisicao.body.id;

    try{
        Cliente.destroy({where: {id: id}}).then(() => {
            resposta.redirect("/clientes");
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};