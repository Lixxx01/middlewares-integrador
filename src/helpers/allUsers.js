const { json } = require('express');
const fs = require('fs');
const path = require('path');

function allUsers(){
    const usersReadDB = path.join(__dirname, '../database', 'users.json');
    return JSON.parse(fs.readFileSync(usersReadDB, 'utf-8'));
};

module.exports = allUsers;

