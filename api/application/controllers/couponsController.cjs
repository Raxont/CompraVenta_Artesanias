// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult, body } = require('express-validator');
const CouponsService = require('../services/couponsService.cjs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CouponsController {
    constructor() {
        this.requestService = new CouponsService();
    }

    async getCoupons(req, res) {
        try {
            const coupons = await this.requestService.getCoupons();
            res.status(200).json(coupons);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getCouponsById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const userId=req.params.id.toSring()
            const request = await this.requestService.getCouponsById(userId);
            res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getCouponsByUserId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.getCouponsByUser(req.params.id);
            res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createCoupons(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const  {password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;

         
            const request = await this.requestService.createCoupons(req.body);
            res.status(201).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateCoupons(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.updateCoupons(req.params.id, req.body);
            res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteCoupons(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.deleteCoupons(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(request);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchCoupons(req, res) {
        try {
            const coupons = await this.requestService.searchCouponssByName(req.query.name);
            res.json(coupons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = CouponsController;