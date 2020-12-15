function authentication(req, res, next){
    if(req.session.userToLog != undefined){
        next()
    } else{
        res.redirect('./login');
    }

};

module.exports = authentication;