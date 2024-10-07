// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const Request = require('../models/pedidosModel.cjs');

class RequestRepository {
    
    async getAll() {
        try {
            const requests = new Request();
            return await requests.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving requests'}));
        }
    }
    
    async getById(id) {
        try {
            const requests = new Request();
            return await requests.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving requests'}));
        }
    }

    async getRequestsByUserId(id) {
        try {
            const requests = new Request();
            return await requests.findByuserId(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving requests'}));
        }
    }

    async save(requestsData) {
        try {
            const requests = new Request();
            return await requests.insert(requestsData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving requests'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const requests = new Request();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await requests.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating requests'}));
        }
    }

    async deleteById(id) {
        try {
            const requests = new Request();
            return await requests.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting requests'}));
        }
    }

    async searchByName(name) {
        try {
            return await Request.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for request');
        }
    }
}

module.exports = RequestRepository;