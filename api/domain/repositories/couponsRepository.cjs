
const Coupons = require('../models/cuponesModel.cjs')

class CouponsRepository {
    
    async getAll() {
        try {
            const coupons = new Coupons();
            return await coupons.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Coupons'}));
        }
    }
    
    async getById(id) {
        try {
            const coupons = new Coupons();
            return await coupons.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Coupons'}));
        }
    }

    async getByUserId(id) {
        try {
            const coupons = new Coupons();
            return await coupons.findByUser(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Coupons'}));
        }
    }

    async getByCode(code) {
        try {
            const coupons = new Coupons();
            return await coupons.findByCode(code);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Coupons'}));
        }
    }

    async save(CouponsData) {
        try {
            const coupons = new Coupons();
            return await coupons.insert(CouponsData);
        } catch (error) {
            
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Coupons'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const coupons = new Coupons();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await coupons.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Coupons'}));
        }
    }

    async deleteById(id) {
        try {
            const coupons = new Coupons();
            return await coupons.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Coupons'}));
        }
    }

    async searchByName(name) {
        try {
            const coupons = new Coupons();
            return await coupons.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Couponss');
        }
    }
}

module.exports = CouponsRepository;