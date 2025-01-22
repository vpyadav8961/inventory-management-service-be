const express = require('express');
const {AuthController}  = require('../controller/AuthController');
const {signupValidationRules,loginValidateRules, validate, verifyToken} = require('../middleware/auth');


const router = express.Router();
const authController = new AuthController();

router.post('/signup',
    signupValidationRules(),
    validate,
    authController.signup
);

router.post('/login',
    loginValidateRules(),
    validate,
    authController.login
);

router.get('/me',verifyToken, authController.me);
module.exports = router;