const { AppDataSource } = require('../config/database');
const Request = require('../models/request');
const User = require('../models/user');
const Software = require('../models/software');

module.exports = {
    // Create a new request (prevent duplicates)
    async createRequest(user, software, accessType, reason) {
        const requestRepository = AppDataSource.getRepository(Request);
        const existing = await requestRepository.findOne({
            where: {
                user: { id: user.id },
                software: { id: software.id },
                status: 'Pending'
            }
        });

        if (existing) {
            throw new Error('A pending request for this software already exists.');
        }

        const request = requestRepository.create({ user, software, accessType, reason });
        await requestRepository.save(request);
        return request;
    },

    // Get all pending requests
    async getPendingRequests() {
        const requestRepository = AppDataSource.getRepository(Request);
        return await requestRepository.find({
            where: { status: 'Pending' },
            relations: ['user', 'software']
        });
    },

    // Get requests for a specific user
    async getUserRequests(userId) {
        const requestRepository = AppDataSource.getRepository(Request);
        return await requestRepository.find({
            where: { user: { id: userId } },
            relations: ['software']
        });
    },

    // Approve or reject a request
    async updateRequestStatus(id, status) {
        const requestRepository = AppDataSource.getRepository(Request);
        if (!['Approved', 'Rejected'].includes(status)) {
            throw new Error('Invalid status value');
        }

        const request = await requestRepository.findOne({ where: { id } });
        if (!request) throw new Error('Request not found');

        request.status = status;
        await requestRepository.save(request);
        return request;
    },

    // Get a specific request by its ID
    async getRequestById(id) {
        const requestRepository = AppDataSource.getRepository(Request);
        const request = await requestRepository.findOne({
            where: { id },
            relations: ['user', 'software']
        });

        if (!request) throw new Error('Request not found');
        return request;
    }
};
