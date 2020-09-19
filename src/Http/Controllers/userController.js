//model User
const User = require("../../Models/User");

//encriptar dados 
const bcrypt = require("bcrypt");

//rota de login
exports.login = (requisicao, resposta) => {
    
    try{
        resposta.render('login');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

exports.authenticate = (requisicao, resposta) => {
    var {email,password} = requisicao.body;

    User.findOne({
        where: {email: email}
    }).then((user)=> {
        if(user != undefined){ //Se existe Usuário com mesmo e-mail
            //validar senha com bcrypt
            var correct = bcrypt.compareSync(password,user.password);

            //Se existir senha cria sessão user
            if(correct){
                resposta.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
                //res.json({email,password});
                resposta.redirect("/admin/clientes");    
            
            }else{
                resposta.redirect("/login");    
            }
        }else{ //Se não existe, volta para login 
            resposta.redirect("/login");
        }
    });
};