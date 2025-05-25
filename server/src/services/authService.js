const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppDataSource = require('../config/database');
const User = require('../models/user');

const userRepository = AppDataSource.getRepository(User);

module.exports = {
    async signup(username, password, role = 'Employee') {
        const existingUser = await userRepository.findOne({ where: { username } });
        if (existingUser) throw new Error('Username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ username, password: hashedPassword, role });
        await userRepository.save(user);
        return user;
    },

    async login(username, password) {
        const user = await userRepository.findOne({ where: { username } });
        if (!user) throw new Error('User not found');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid password');

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        return { token, role: user.role };
    },

    async getUserById(id) {
        return await userRepository.findOne({ where: { id } });
    }
};