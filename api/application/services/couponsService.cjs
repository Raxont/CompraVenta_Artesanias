// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const CouponsRepository = require('../../domain/repositories/couponsRepository.cjs');

class CouponsService {
    constructor() {
        this.couponsRepository = new CouponsRepository();
    }

    async getCoupons() {
        const Coupons = await this.couponsRepository.getAll();
        if (!Coupons) {
            throw new Error(JSON.stringify({status: 404, message: 'Coupons not found'}));
        }
        return Coupons;
    }

    async getCouponsById(id) {
        const Coupons = await this.couponsRepository.getById(id);
        if (!Coupons) {
            throw new Error(JSON.stringify({status: 404, message: 'Coupons not found'}));
        }
        return Coupons;
    }

    async getCouponsByUser(id) {
        const Coupons = await this.couponsRepository.getByUserId(id);
        if (!Coupons) {
            throw new Error(JSON.stringify({status: 404, message: 'Coupons not found'}));
        }
        return Coupons;
    }

    async createCoupons(data) {
        return await this.couponsRepository.save(data);
    }

    async updateCoupons(id, data) {
        const updatedCoupons = await this.couponsRepository.updateById(id, data);
        if (!updatedCoupons) {
            throw new Error(JSON.stringify({status: 404, message: 'Coupons not found or could not be updated'}));
        }
        return updatedCoupons;
    }

    async deleteCoupons(id) {
        const deletedCoupons = await this.couponsRepository.deleteById(id);
        if (!deletedCoupons) {
            throw new Error(JSON.stringify({status: 404, message: 'Coupons not found or could not be deleted'}));
        }        
        return deletedCoupons;
    }
    
    async searchCouponssByName(name) {
        return await this.couponsRepository.searchByName(name);
    }

}

module.exports = CouponsService;