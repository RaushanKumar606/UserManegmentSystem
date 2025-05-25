const { AppDataSource } = require('../config/database');
const Software = require('../models/software');

module.exports = {
    async createSoftware(name, description, accessLevels) {
        const softwareRepository = AppDataSource.getRepository(Software);
        const software = softwareRepository.create({ name, description, accessLevels });
        await softwareRepository.save(software);
        return software;
    },

    async getAllSoftware() {
        const softwareRepository = AppDataSource.getRepository(Software);
        return await softwareRepository.find();
    },

    async getSoftwareById(id) {
        const softwareRepository = AppDataSource.getRepository(Software);
        return await softwareRepository.findOne({ where: { id } });
    },

    async deleteSoftware(id) {
        const softwareRepository = AppDataSource.getRepository(Software);
        const software = await softwareRepository.findOne({ where: { id } });
        if (!software) {
            throw new Error('Software not found');
        }
        await softwareRepository.remove(software);
        return true;
    }
};