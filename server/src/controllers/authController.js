const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');
const User = require('../models/user');

// Helper function to get User repository safely
const getUserRepository = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error('Database not initialized');
  }
  return AppDataSource.getRepository(User);
};

const authController = {
  // Register new user
  signup: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      // Get repository
      const userRepository = getUserRepository();

      // Check if user with same username already exists
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user entity
      const newUser = userRepository.create({
        username,
        password: hashedPassword,
        role: role || 'Employee' 
      });

      // Save user
      await userRepository.save(newUser);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: 'Username and password are required',
          received: { username: !!username, password: !!password }
        });
      }

      const userRepository = getUserRepository();

      // Find user by username
      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Error logging in',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      const userRepository = getUserRepository();
      const user = await userRepository.findOne({ where: { id: req.user.userId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        username: user.username,
        role: user.role
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Error getting user information' });
    }
  }
};

module.exports = authController;
