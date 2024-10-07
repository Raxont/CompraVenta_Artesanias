// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult, body } = require('express-validator');
const WorkshopService = require('../services/educationalWorkshopsService.cjs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class  EducationalWorkshopsController {
    constructor() {
        this.workshopService = new WorkshopService();
    }

    async getEducationalWorkshops(req, res) {
        try {
            const users = await this.workshopService.getEducationalWorkshops();
            res.status(200).json(users);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.getWorkshopById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const  {password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;

           
            const user = await this.workshopService.createWorkshop(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async updateWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.updateWorkshop(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.deleteWorkshop(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchEducationalWorkshops(req, res) {
        try {
            const users = await this.workshopService.searchEducationalWorkshopsByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllEducationalWorkshops(req, res) {
        try {
            const users = await this.workshopService.getAllEducationalWorkshops();
            res.status(200).json(users);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}

module.exports =  EducationalWorkshopsController;