const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes, Op } = require('sequelize');
const User = require('../models/User');

const router = express.Router();


// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
// Registration function
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
  
    // Input validation (simplified for demonstration)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(409).json({ error: 'Email already in use' });
      }
  
      // Password validation (example: at least 6 characters)
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({ email, hashedPassword, role });
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  
  // Login function
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).send('Invalid username or password.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password.');
    }
  
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
  
  // Authentication middleware
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send('Invalid token.');
    }
  };
  
  // Export router and middleware
  module.exports = {
    authRouter: router,
    authenticate,
  };