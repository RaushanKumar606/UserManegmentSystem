const softwareService = require('../services/softwareService');

module.exports = {
    // Create new software
    async createSoftware(req, res) {
        try {
            const { name, description, accessLevels } = req.body;
            const software = await softwareService.createSoftware(name, description, accessLevels);
            res.status(201).json(software);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get all software
    async getAllSoftware(req, res) {
    try {
      const softwareList = await softwareService.getAllSoftware();
      res.status(200).json(softwareList);
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to fetch software list" });
    }
  },
    // Get software by ID
    async getSoftwareById(req, res) {
        try {
            const { id } = req.params;
            const software = await softwareService.getSoftwareById(id);
            if (!software) {
                return res.status(404).json({ error: 'Software not found' });
            }
            res.json(software);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update software
    async updateSoftware(req, res) {
        try {
            const { id } = req.params;
            const { name, description, accessLevels } = req.body;
            const updated = await softwareService.updateSoftware(id, { name, description, accessLevels });
            if (!updated) {
                return res.status(404).json({ error: 'Software not found or not updated' });
            }
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete software
    async deleteSoftware(req, res) {
        try {
            const { id } = req.params;
            const deleted = await softwareService.deleteSoftware(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Software not found or already deleted' });
            }
            res.json({ message: 'Software deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
