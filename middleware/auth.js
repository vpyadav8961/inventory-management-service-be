const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const signupValidationRules = () => [
  body('username')
    .notEmpty().withMessage('Username is required')
    .bail()
    .custom(async (username) => {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        throw new Error('Username already in use');
      }
    }),
  body('email')
    .isEmail().withMessage('Enter a valid email address')
    .bail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['staff', 'admin']).withMessage('Invalid role')
];

const loginValidateRules = () => [
  body('email')
    .isEmail().withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['staff', 'admin']).withMessage('Invalid role')
]

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const productValidationRules = () => [
  body('products').isArray().withMessage('Products must be an array'),
  body('products.*.name')
    .notEmpty().withMessage('Name is required'),
  body('products.*.sku')
    .notEmpty().withMessage('SKU is required'),
  body('products.*.price')
    .isNumeric().withMessage('Price must be a number'),
  body('products.*.quantity')
    .isNumeric().withMessage('Quantity must be a number'),
  body('products.*.category')
    .notEmpty().withMessage('Category is required')
];


const verifyToken = (req, res, next) => {

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'A token is  required for authentication' });  
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
}

module.exports = {
  signupValidationRules,
  loginValidateRules,
  validate,
  productValidationRules,
  verifyToken,
  verifyAdmin
};