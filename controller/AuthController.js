const User = require('../models/User');
const bcrypt = require('bcrypt');

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
}

module.exports = { AuthController };