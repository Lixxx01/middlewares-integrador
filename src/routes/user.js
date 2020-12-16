const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require('../middlewares/validator');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddlewares');

const userImageUpld = require('../helpers/multerUsers');

// Muestra la vista de registro
router.get('/register', guestMiddleware, userController.showRegister);

// Procesa la vista de registro
router.post('/register', guestMiddleware, userImageUpld.any(), validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', guestMiddleware, userController.showLogin);

// Procesa la vista de login
router.post('/login', guestMiddleware, validator.login, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', authMiddleware ,userController.showProfile);

// Cierra la sesión
router.get('/logout', authMiddleware ,userController.logout);

module.exports = router;