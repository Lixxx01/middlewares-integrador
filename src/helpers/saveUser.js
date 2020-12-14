const { json } = require('express');
const fs = require('fs');
const path = require('path');

const allUsers = require('./allUsers');

function userSave(newUser){
    const usersReadDB = path.join(__dirname, '../database', 'users.json');
    const newUsersArray = [...allUsers(), newUser];
    const usersJson = JSON.stringify(newUsersArray, null, " ");
  

    fs.writeFileSync(usersReadDB, usersJson);
};

module.exports = userSave;