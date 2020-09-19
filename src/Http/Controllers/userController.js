
//model User
const User = require("../../Models/User");

//lista de todos os servicos
exports.login = (requisicao, resposta) => {
    
    try{
        resposta.render('login');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};