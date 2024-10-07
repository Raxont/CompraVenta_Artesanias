// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const e = require('express');
const Products = require('../models/productosModel.cjs')

class ProductsRepository {
    
    async getAll() {
        try {
            const products = new Products();
            return await products.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }
    
    async getById(id) {
        try {
            const products = new Products();
            return await products.findFavouriteById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }

    async save(ProductsData) {
        try {
            const products = new Products();
            return await products.insert(ProductsData);
        } catch (error) {
            
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Products'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const products = new Products();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await products.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Products'}));
        }
    }

    async deleteById(id) {
        try {
            const products = new Products();
            return await products.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Products'}));
        }
    }

    async searchByName(name) {
        try {
            const products = new Products();
            return await products.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Productss');
        }
    }

    async getByCategory(arg) {
        try {
            const products = new Products();
            return await products.findByCategory(arg);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }

    async getByCategoryForDiscounts(arg) {
        try {
            const products = new Products();
            return await products.findByCategoryForDiscounts(arg);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }

    async getByIdForFavourites(arg) {
        try {
            const products = new Products();
            return await products.findFavouriteById(arg);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }
    async decrementStock(productId, quantity, session) {
        const products = new Products();
        return await products.decrementStock(productId, quantity, session);
    }
}

module.exports = ProductsRepository;