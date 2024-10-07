// Importa las dependencias necesarias para la aplicación.
const express = require('express');
const WorkshopController = require('../controllers/workshopsController.cjs');
const WorkshopValidator = require('../validator/workshopsValidator.cjs');

// Crea un enrutador de Express.
const router = express.Router();
const userController = new WorkshopController();
const userValidator = new WorkshopValidator();

//rutas de crud workshops
router.get('/products/:id',   userValidator.validateWorkshopId(), (req, res) => userController.getProductsOfWorkshop(req, res));
/**
 * Ruta para buscar talleres según criterios especificados.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get('/search', (req, res) => userController.searchWorkshops(req, res));

/**
 * Ruta para obtener todos los talleres.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get('/', (req, res) => userController.getWorkshops(req, res));

/**
 * Ruta para obtener un taller específico por su ID.
 * @param {Object} req - La solicitud HTTP, contiene el ID del taller en los parámetros.
 * @param {Object} res - La respuesta HTTP.
 */
router.get('/:id', userValidator.validateWorkshopId(), (req, res) => userController.getWorkshop(req, res));

/**
 * Ruta para crear un nuevo taller.
 * @param {Object} req - La solicitud HTTP, contiene los datos del taller en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 */
router.post('/', userValidator.validateWorkshopData(), (req, res) => userController.createWorkshop(req, res));

/**
 * Ruta para actualizar un taller específico por su ID.
 * @param {Object} req - La solicitud HTTP, contiene el ID del taller en los parámetros y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 */
router.put('/:id', userValidator.validateWorkshopData(), (req, res) => userController.updateWorkshop(req, res));

/**
 * Ruta para eliminar un taller específico por su ID.
 * @param {Object} req - La solicitud HTTP, contiene el ID del taller en los parámetros.
 * @param {Object} res - La respuesta HTTP.
 */
router.delete('/:id', userValidator.validateWorkshopId(), (req, res) => userController.deleteWorkshop(req, res));

// Exporta el enrutador para su uso en otras partes de la aplicación.
module.exports = router;
