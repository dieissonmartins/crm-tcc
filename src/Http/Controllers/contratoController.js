
const Servico = require("../../Models/Servico");
const Produto = require("../../Models/Produto");

//formulario para cadastro de clientes
exports.create =  async (requisicao, resposta) => {
    var pessoaId = requisicao.body.id;

    try{
        const servicos = await Servico.findAll();
        const produtos = await Produto.findAll();    

        resposta.render('admin/contratos/create', {
            pessoaId: pessoaId,
            servicos: servicos,
            produtos: produtos,
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de pessoa no banco de dados
exports.store = (requisicao, resposta) => {
    var {dataVenda,dataVencimento,valor,produtoId,servicoId,anexoFile,pessoaId} = requisicao.body;
    resposta.json(requisicao.body);

    try{
        Empresa.create({

        }).then((empresa) => {
            //resposta.json(empresa);
            resposta.redirect('clientes/'+ clienteId);
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};