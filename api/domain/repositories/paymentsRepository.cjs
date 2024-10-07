// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const e = require('express');
const Payments = require('../models/pagosModel.cjs')

class PaymentsRepository {
    
    async getAll() {
        try {
            const payments = new Payments();
            return await payments.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Payments'}));
        }
    }
    
    async getById(id) {
        try {
            const payments = new Payments();
            return await payments.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Payments'}));
        }
    }

    async save(PaymentsData) {
        try {
            const payments = new Payments();
            return await payments.insert(PaymentsData);
        } catch (error) {
            
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Payments'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const payments = new Payments();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await payments.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Payments'}));
        }
    }

    async deleteById(id) {
        try {
            const payments = new Payments();
            return await payments.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Payments'}));
        }
    }

    async searchByName(name) {
        try {
            const payments = new Payments();
            return await payments.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Paymentss');
        }
    }
}

module.exports = PaymentsRepository;