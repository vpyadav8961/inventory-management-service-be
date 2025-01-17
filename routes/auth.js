const express = require('express');
const {AuthController}  = require('../controller/AuthController');
const {signupValidationRules, validate} = require('../middleware/auth');


const router = express.Router();
const authController = new AuthController();

router.post('/signup',
    signupValidationRules(),
    validate,
    authController.signup
);
module.exports = router;