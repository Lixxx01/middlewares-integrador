const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const { all } = require('../routes/user');
const { brotliCompress } = require('zlib');
const allUsers = require('../helpers/allUsers');
const usersId = require('../helpers/usersId');
const userSave = require('../helpers/saveUser');

module.exports = {
    showRegister: (req, res) => {
        // Do the magic
        return res.render('./user/user-register-form');
    },

    processRegister: (req, res, next) => {
        // Do the magic
        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render('./user/user-register-form', {
                errors: results.errors,
                oldInfo: req.body
            });
        };

        const newUser = {
            id: usersId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename
        };

        userSave(newUser);

        return res.redirect('/user/login');
    },

    showLogin: (req, res) => {
        // Do the magic
        return res.render('./user/user-login-form');
    },
    processLogin: (req, res) => {
        // Do the magic
        const results = validationResult(req);
        const users = allUsers();

        if(!results.isEmpty()){
            return res.render('./user/user-login-form', {
                errors: results.errors,
                oldInfo: req.body
            });
        };

        const userFound = users.find((user) => (user.email == req.body.email))

        if (req.body.email == userFound.email && bcrypt.compareSync(req.body.password, userFound.password)) {
            
            req.session.userToLog = userFound;
            res.cookie('user', userFound.id ,{ maxAge: 60000});
            return res.render('./user/profile');
        } else {
            return res.render('./user/user-login-form', {
                errors: {msg: 'Email o Contraseña invalidos'}
            });
        }

    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
        // Do the magic
        return res.redirect('/');
    }

}