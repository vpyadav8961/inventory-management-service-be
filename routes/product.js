const express = require('express');
const {ProductController}  = require('../controller/ProductController');
const {verifyToken, validate, productValidationRules} = require('../middleware/auth');

const router = express.Router();
const productController = new ProductController();

router.get('/', verifyToken, (req, res) => {
    res.send("Welcome to the products route: Inventry Management System");
});

router.post('/',verifyToken,productValidationRules(), validate, productController.createProduct);

module.exports = router;