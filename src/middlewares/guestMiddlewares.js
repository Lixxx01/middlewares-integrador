function guest(req, res, next){
    if(req.session.userToLog == undefined){
        next()
    } else{
        res.redirect('./');
    }

};

module.exports = guest;