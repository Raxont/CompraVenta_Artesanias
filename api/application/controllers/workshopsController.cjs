// Importa los módulos necesarios para la gestión de talleres.
const { validationResult } = require('express-validator');
const WorkshopService = require('../services/workshopsService.cjs');
const bcrypt = require('bcryptjs');

/**
 * Clase WorkshopsController que gestiona las peticiones HTTP relacionadas con talleres.
 */
class WorkshopsController {
    constructor() {
        this.workshopService = new WorkshopService();
    }

    /**
     * Obtiene todos los talleres.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async getWorkshops(req, res) {
        try {
            const users = await this.workshopService.getWorkshops();
            res.status(200).json(users);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message }); // Maneja errores de forma adecuada.
        }
    }

    /**
     * Obtiene un taller específico por su ID.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async getWorkshop(req, res) {
        try {
            const errors = validationResult(req); // Valida los parámetros de entrada.
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.getWorkshopById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message }); // Maneja errores de forma adecuada.
        }
    }

    /**
     * Crea un nuevo taller.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async createWorkshop(req, res) {
        try {
            const errors = validationResult(req); // Valida los parámetros de entrada.
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            // Encripta la contraseña antes de guardarla
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword; // Reemplaza la contraseña en el cuerpo de la solicitud con la encriptada.
           
            const user = await this.userService.createWorkshop(req.body);
            res.status(201).json(user); // Responde con el taller creado.
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message }); // Maneja errores de forma adecuada.
        }
    }

    /**
     * Actualiza un taller específico por su ID.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async updateWorkshop(req, res) {
        try {
            const errors = validationResult(req); // Valida los parámetros de entrada.
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.updateWorkshop(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message }); // Maneja errores de forma adecuada.
        }
    }

    /**
     * Elimina un taller específico por su ID.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async deleteWorkshop(req, res) {
        try {
            const errors = validationResult(req); // Valida los parámetros de entrada.
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.workshopService.deleteWorkshop(req.params.id);
            res.status(204).json(user);

        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message }); // Maneja errores de forma adecuada.
        }
    }
    
    /**
     * Busca talleres por nombre.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     * @returns {Promise<void>}
     */
    async searchWorkshops(req, res) {
        try {
            const users = await this.workshopService.searchWorkshopsByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message }); // Maneja errores internos del servidor.
        }
    }

    async getProductsOfWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const workshop = await this.workshopService.getWorkshopById(req.params.id);
            if(workshop.status === 404) return res.status(workshop.status).json({data: workshop});
            const products = await this.workshopService.getProductsByWorkshopId(req.params.id);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}

// Exporta la clase WorkshopsController para su uso en otras partes de la aplicación.
module.exports = WorkshopsController;
