// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const WorkshopRepository = require('../../domain/repositories/educationalWorkshopsRepository.cjs');

class WorkshopService {
    constructor() {
        this.workshopRepository = new WorkshopRepository();
    }

    async getEducationalWorkshops() {
        const workshop = await this.workshopRepository.getAll();
        if (!workshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found'}));
        }
        return workshop;
    }

    async getWorkshopById(id) {
        const workshop = await this.workshopRepository.getById(id);
        if (!workshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found'}));
        }
        return workshop;
    }

    async createWorkshop(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.workshopRepository.save(data);
    }

    async updateWorkshop(id, data) {
        const updatedWorkshop = await this.workshopRepository.updateById(id, data);
        if (!updatedWorkshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found or could not be updated'}));
        }
        return updatedWorkshop;
    }

    async deleteWorkshop(id) {
        const deletedWorkshop = await this.workshopRepository.deleteById(id);
        if (!deletedWorkshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found or could not be deleted'}));
        }        
        return deletedWorkshop;
    }
    
    async searchEducationalWorkshopsByName(name) {
        return await this.workshopRepository.searchByName(name);
    }

    async getAllEducationalWorkshops() {
        const workshop = await this.workshopRepository.getAllEducationalWorkshops();
        if (!workshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshops not found'}));
        }
        return workshop;
    }
}

module.exports = WorkshopService;