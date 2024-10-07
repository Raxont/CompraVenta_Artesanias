// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const EducationalWorkshop = require('../models/talleres_educativosModel.cjs');

class EducationalWorkshopRepository {
    
    async getAll() {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            return await educationalWorkshop.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving educationalWorkshop'}));
        }
    }
    
    async getById(id) {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            return await educationalWorkshop.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving educationalWorkshop'}));
        }
    }

    async save(educationalWorkshopData) {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            return await educationalWorkshop.insert(educationalWorkshopData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving educationalWorkshop'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await educationalWorkshop.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating educationalWorkshop'}));
        }
    }

    async deleteById(id) {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            return await educationalWorkshop.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting educationalWorkshop'}));
        }
    }

    async searchByName(name) {
        try {
            return await EducationalWorkshop.find({ nombre: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for educationalWorkshops');
        }
    }

    async getAllEducationalWorkshops() {
        try {
            const educationalWorkshop = new EducationalWorkshop();
            return await educationalWorkshop.aggregateEducationalWorkshops();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving educationalWorkshops'}));
        }
    }
}

module.exports = EducationalWorkshopRepository;