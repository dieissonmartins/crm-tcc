
const Servico = require("../../Models/Servico");
const Produto = require("../../Models/Produto");
const Contrato = require("../../Models/Contrato");

//formulario para cadastro de clientes
exports.create =  async (requisicao, resposta) => {
    var pessoaId = requisicao.params.id;
    var clienteId = requisicao.params.clienteId;

    try{
        const servicos = await Servico.findAll();
        const produtos = await Produto.findAll();    

        resposta.render('admin/contratos/create', {
            clienteId: clienteId,
            pessoaId: pessoaId,
            servicos: servicos,
            produtos: produtos,
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//salva requisicao de cadastro de pessoa no banco de dados
exports.store = async (requisicao, resposta) => {
    var {dataVenda,dataVencimento,valor,produtoId,servicoId,anexoFile,pessoaId,clienteId} = requisicao.body;
    //resposta.json(requisicao.body);

    try{
        await Contrato.create({
            dataVenda: dataVenda,
            dataVencimento: dataVencimento,
            valor: valor,
            produtoId: produtoId,
            servicoId: servicoId,
            anexoFile: anexoFile,
            pessoaId: pessoaId,
        });
        resposta.redirect('pessoas/'+pessoaId+'/'+clienteId);

    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};