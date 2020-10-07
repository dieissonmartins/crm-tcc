
const Servico = require("../../Models/Servico");
const Produto = require("../../Models/Produto");
const Contrato = require("../../Models/Contrato");


import mercadoPago from "mercadopago";

mercadoPago.configure({
    sandbox: true,
    access_token: "TEST-4596512322898184-100717-3e86cbbe22624bba2e387a26a5785a49-215990228"
});

//lista de todos os pessoas
exports.index = async (requisicao, resposta) => {
    try{
        var contratos = await Contrato.findAll();

        resposta.render('admin/contratos/index',{contratos: contratos});
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//formulario para cadastro de clientes
exports.create =  async (requisicao, resposta) => {
    var {clienteId,tipo} = requisicao.params;
    var pessoaId = requisicao.params.id;
    //resposta.json(requisicao.params);

    try{
        const servicos = await Servico.findAll();
        const produtos = await Produto.findAll();    

        resposta.render('admin/contratos/create', {
            clienteId: clienteId,
            pessoaId: pessoaId,
            servicos: servicos,
            produtos: produtos,
            tipo: tipo
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de pessoa no banco de dados
exports.store = async (requisicao, resposta) => {
    var {dataVenda,dataVencimento,valor,produtoId,servicoId,anexoFile,pessoaId,clienteId,tipo} = requisicao.body;
    //resposta.json(requisicao.body);
    
    try{
        if(tipo == "empresa"){ //cadastro contrato empresa
            var empresaId = pessoaId;
            //resposta.json(empresaId);

            await Contrato.create({
                dataVenda: dataVenda,
                dataVencimento: dataVencimento,
                valor: valor,
                produtoId: produtoId,
                servicoId: servicoId,
                anexoFile: anexoFile,
                pessoaId: empresaId, 
                empresaId: empresaId 
            });

            resposta.redirect('empresas/'+empresaId+'/'+clienteId);
        }else{
            await Contrato.create({ //cadastro contrato pessoa
                dataVenda: dataVenda,
                dataVencimento: dataVencimento,
                valor: valor,
                produtoId: produtoId,
                servicoId: servicoId,
                anexoFile: anexoFile,
                pessoaId: pessoaId,
                empresaId: pessoaId
            });
            resposta.redirect('pessoas/'+pessoaId+'/'+clienteId);
        }
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};