const requestService = require('../services/resuestService');
const softwareService = require('../services/softwareService');

module.exports = {
    async createRequest(req, res) {
        try {
            const user = req.user;
            const { softwareId, accessType, reason } = req.body;
            
            if (!softwareId || !accessType || !reason) {
                return res.status(400).json({ 
                    message: 'Missing required fields',
                    required: ['softwareId', 'accessType', 'reason']
                });
            }
            
            const software = await softwareService.getSoftwareById(softwareId);
            if (!software) {
                return res.status(404).json({ message: 'Software not found' });
            }
            
            if (!software.accessLevels.includes(accessType)) {
                return res.status(400).json({ 
                    message: 'Invalid access type for this software',
                    availableLevels: software.accessLevels
                });
            }

            const request = await requestService.createRequest(user, software, accessType, reason);
            res.status(201).json(request);
        } catch (error) {
            console.error('Create request error:', error);
            res.status(error.status || 500).json({ 
                message: error.message || 'Failed to create request'
            });
        }
    },

    async getPendingRequests(req, res) {
        try {
            const requests = await requestService.getPendingRequests();
            res.json(requests);
        } catch (error) {
            console.error('Get pending requests error:', error);
            res.status(error.status || 500).json({ 
                message: error.message || 'Failed to fetch pending requests'
            });
        }
    },

    async updateRequestStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ message: 'Status is required' });
            }

            const request = await requestService.updateRequestStatus(parseInt(id), status);
            res.json(request);
        } catch (error) {
            console.error('Update request status error:', error);
            res.status(error.status || 500).json({ 
                message: error.message || 'Failed to update request status'
            });
        }
    },

    async getUserRequests(req, res) {
        try {
            const user = req.user;
            const requests = await requestService.getUserRequests(user.id);
            res.json(requests);
        } catch (error) {
            console.error('Get user requests error:', error);
            res.status(error.status || 500).json({ 
                message: error.message || 'Failed to fetch user requests'
            });
        }
    }
};