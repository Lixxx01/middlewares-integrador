const { localsName } = require("ejs")

function localsMiddleware (req, res, next){

    if (req.session.userToLog){
        res.locals.userSession = req.session.userToLog;
    } else {
        res.locals.userSession = false;
    }

    next();
}

module.exports = localsMiddleware;