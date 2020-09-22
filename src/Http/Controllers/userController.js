//model User
const User = require("../../Models/User");

//encriptar dados 
const bcrypt = require("bcrypt");


//lista de todos os users
exports.index = (requisicao, resposta) => {
    
    try{
        User.findAll().then((usuarios) => {
            resposta.render('admin/users/index',{usuarios: usuarios});
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

//formulario para cadastro
exports.create = (requisicao, resposta) => {
   
    try{
        resposta.render('admin/users/create');
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

exports.store = (requisicao, resposta) => {
    var {name,email,password} = requisicao.body;
    //resposta.json(requisicao.body);

    var salt            = bcrypt.genSaltSync(10);
    var hashPassword    = bcrypt.hashSync(password, salt);

    try{
        User.create({
            name: name,
            email: email,
            password: hashPassword
        }).then((user) => {
            resposta.json(user);
            //resposta.redirect('/clientes');
        });
    }catch(err){
        resposta.render(400).json({ error: err.message });
    }
};

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
                requisicao.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
                
                resposta.redirect("/clientes");    
            
            }else{
               resposta.redirect("/login");    
            }
        }else{ //Se não existe, volta para login 
            resposta.redirect("/login");
        }
    });
};