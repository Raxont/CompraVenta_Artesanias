// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const MessagesRepository = require('../../domain/repositories/messagesRepository.cjs');

class MessagesService {
    constructor() {
        this.messagesRepository = new MessagesRepository();
    }

    async getMessages() {
        const Messages = await this.messagesRepository.getAll();
        if (!Messages) {
            throw new Error(JSON.stringify({status: 404, message: 'Messages not found'}));
        }
        return Messages;
    }

    async getMessagesById(id) {
        const Messages = await this.messagesRepository.getById(id);
        if (!Messages) {
            throw new Error(JSON.stringify({status: 404, message: 'Messages not found'}));
        }
        return Messages;
    }

    async createMessages(data) {
        return await this.messagesRepository.save(data);
    }

    async updateMessages(id, data) {
        const updatedMessages = await this.messagesRepository.updateById(id, data);
        if (!updatedMessages) {
            throw new Error(JSON.stringify({status: 404, message: 'Messages not found or could not be updated'}));
        }
        return updatedMessages;
    }

    async deleteMessages(id) {
        const deletedMessages = await this.messagesRepository.deleteById(id);
        if (!deletedMessages) {
            throw new Error(JSON.stringify({status: 404, message: 'Messages not found or could not be deleted'}));
        }        
        return deletedMessages;
    }
    
    async searchMessagessByName(name) {
        return await this.messagesRepository.searchByName(name);
    }
}

module.exports = MessagesService;