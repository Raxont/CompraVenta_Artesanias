// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const ProductsService = require('../services/productsService.cjs');
const UserService = require('../services/usuariosService.cjs');
const { ObjectId } = require('mongodb');

class ProductsController {
    constructor() {
        this.productsService = new ProductsService();
        this.userService = new UserService();
    }

    async getProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProductsById(req.params.id);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.createProducts(req.body);
            res.status(201).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.updateProducts(req.params.id, req.body);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.deleteProducts(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(products);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
        
    }
    
    async searchProducts(req, res) {
        try {
            const productss = await this.productsService.searchProductssByName(req.query.name);
            res.json(productss);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProductsByCategory(req.params.categoria);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsByCategoryForDiscounts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProductsByCategoryForDiscounts(req.params.categoria);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getFavouriteProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
            var user = await this.userService.getUserById(req.params.id);
            
            // Verificar si el usuario existe
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            // Verificar si 'favoritos' está definido y es un array
            if (!user.favoritos || !Array.isArray(user.favoritos)) {
                return res.status(400).json({ message: "El campo 'favoritos' no está definido o no es un array" });
            }
    
            let favourites = [];
            
            for (let i = 0; i < user.favoritos.length; i++) {
                let product = await this.productsService.getProductsByCategoryForFavourites(user.favoritos[i]);
                favourites.push(product);
            }
            let category = favourites.filter(p => p.categoria == req.params.categoria);
            
            if (category.length == 0) return res.status(404).json({ message: "No se encontraron productos en la categoría especificada." });
            
            return res.status(200).json(category);
        } catch (error) {
            console.error("Error en getFavouriteProducts:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

module.exports = ProductsController;