const allUsers = require('../helpers/allUsers');

function rememberSession(req, res, next){

    if(req.cookies.remember_session != undefined && req.session.userToLog == undefined){
    
    const users = allUsers();
    const userFound = users.find((user) => (user.id == req.cookies.id));

    userFound = userToLog;

    }   
    
    next();
}

module.exports = rememberSession;