// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const PaymentsRepository = require('../../domain/repositories/paymentsRepository.cjs');

class PaymentsService {
    constructor() {
        this.paymentsRepository = new PaymentsRepository();
    }

    async getPayments() {
        const Payments = await this.paymentsRepository.getAll();
        if (!Payments) {
            throw new Error(JSON.stringify({status: 404, message: 'Payments not found'}));
        }
        return Payments;
    }

    async getPaymentsById(id) {
        const Payments = await this.paymentsRepository.getById(id);
        if (!Payments) {
            throw new Error(JSON.stringify({status: 404, message: 'Payments not found'}));
        }
        return Payments;
    }

    async createPayments(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.paymentsRepository.save(data);
    }

    async updatePayments(id, data) {
        const updatedPayments = await this.paymentsRepository.updateById(id, data);
        if (!updatedPayments) {
            throw new Error(JSON.stringify({status: 404, message: 'Payments not found or could not be updated'}));
        }
        return updatedPayments;
    }

    async deletePayments(id) {
        const deletedPayments = await this.paymentsRepository.deleteById(id);
        if (!deletedPayments) {
            throw new Error(JSON.stringify({status: 404, message: 'Payments not found or could not be deleted'}));
        }        
        return deletedPayments;
    }
    
    async searchPaymentssByName(name) {
        return await this.paymentsRepository.searchByName(name);
    }
}

module.exports = PaymentsService;