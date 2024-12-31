const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();


// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
// Registration function
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }
  
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      return res.status(400).send('User already exists.');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered successfully.');
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