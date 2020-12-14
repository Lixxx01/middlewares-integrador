const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const userController = require('../controllers/userController');
const validator = require('../middlewares/validator');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

// Muestra la vista de registro
router.get('/register', userController.showRegister);

// Procesa la vista de registro
router.post('/register', upload.any(), validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', userController.showLogin);

// Procesa la vista de login
router.post('/login', validator.login, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', userController.showProfile);

// Cierra la sesión
router.get('/logout', userController.logout);

module.exports = router;