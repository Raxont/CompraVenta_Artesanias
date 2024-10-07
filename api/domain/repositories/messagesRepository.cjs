
const Messages = require('../models/mensajesModel.cjs')

class MessagesRepository {
    
    async getAll() {
        try {
            const messages = new Messages();
            return await messages.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Messages'}));
        }
    }
    
    async getById(id) {
        try {
            const messages = new Messages();
            return await messages.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Messages'}));
        }
    }

    async save(MessagesData) {
        try {
            const messages = new Messages();
            return await messages.insert(MessagesData);
        } catch (error) {
            
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Messages'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const messages = new Messages();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await messages.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Messages'}));
        }
    }

    async deleteById(id) {
        try {
            const messages = new Messages();
            return await messages.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Messages'}));
        }
    }

    async searchByName(name) {
        try {
            const messages = new Messages();
            return await messages.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Messagess');
        }
    }
}

module.exports = MessagesRepository;