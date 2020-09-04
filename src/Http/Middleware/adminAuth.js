

const adminAuth = (req, res, next) => { //NEXT - para dar continuidade na REQ
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect("/login");
    }
}

module.exports = adminAuth;