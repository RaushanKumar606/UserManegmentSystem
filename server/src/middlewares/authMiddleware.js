const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('Authentication required');

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.userId } });

        if (!user) throw new Error('User not found');
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};