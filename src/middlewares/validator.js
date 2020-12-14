const express = require('express');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');

module.exports = {
    register:[
        body('email')
            .notEmpty()
                .withMessage('El email no puede estar vacio')
                .bail()
            .isEmail()
                .withMessage('Debe tener formato Email')
                .bail()
            .custom(function(value){
                
                const usersReadDB = path.join(__dirname, '../database', 'users.json');
                const users = JSON.parse(fs.readFileSync(usersReadDB, 'utf-8'));
                
                const emailFound = users.find(function (user){return user.email == value});

                return !emailFound;

            })
                .withMessage('El correo ya existe'),
        body('password')
            .isLength({min:6})
                .withMessage('La contraseña debe tener minimo 6 caracteres.')
                .bail()
            .custom(function(value, { req }){
                if(value == req.body.retype){
                    return true;
                } else { return false;}
                })
                .withMessage('Las passwords tiene que ser iguales'),
        body('avatar')
            .custom(function (value, { req }){
                return req.files[0];
            })
                .withMessage('Debe cargar una imagen')
                .bail()
            .custom(function(value, { req }){
            const ext = path.extname(req.files[0].originalname);
            if( ext == '.jpg' || ext == '.png' || ext == '.jpeg'){
                return true;
            }
                return false;
            })

                /* otra forma es:
                extOk =['.jpg', '.png', '.jpeg'];
                return extOk.includes(ext) */
                
                .withMessage('El archivo de imagen debe ser .jpg/.png/.jpeg')
    ],
    login: [
        body('email')
        .notEmpty()
            .withMessage('El email no puede estar vacio')
            .bail()
        .isEmail()
            .withMessage('Debe tener formato Email'),
        body('password')
        .notEmpty()
            .withMessage('La contraseña no puede estar vacia')
    ]    
}