const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async signup(req, res) {
        const { email, password, role, username } = req.body;
      
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          // Create the user
          const newUser = await User.create({ email, password: hashedPassword, role, username });
          res.status(201).json({
            message: 'User registered successfully',
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              role: newUser.role
            },
          });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Failed to register user' });
        }
    }

    async login(req, res) {
        try {
            const { email, password, role } = req.body;   
            // Find the user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Check if the password is correct
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            // Check if the role is correct
            if (role !== user.role) {
                return res.status(401).json({ error: 'Invalid role' });
            }
            // create a token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'User logged in successfully',
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Failed to login user' });
            
        }
    }
}

module.exports = { AuthController };