const express = require('express');
const authController = require('../controllers/authController');

const usersRouter = express.Router()

usersRouter
    .route('/signup')
    .post(authController.signup)

usersRouter
    .route('/login')
    .post(authController.login)
    
usersRouter
    .route('/isLogin')
    .get(authController.isLogin)

// usersRouter.post('/forgot-password',authController.forgotPassword)
// usersRouter.patch('/reset-password/:token',authController.resetPassword)

module.exports = usersRouter