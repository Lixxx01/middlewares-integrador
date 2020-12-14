const allUsers = require('./allUsers')

function usersId(){
    const users = allUsers();
    return users.pop().id + 1;
};

module.exports = usersId;

