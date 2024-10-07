// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const RequestController = require('../controllers/requestsController.cjs');
const RequestValidator = require('../validator/requestsValidator.cjs');

const router = express.Router();
const requestController = new RequestController();
const requestValidator = new RequestValidator();


//rutas de crud request
router.get('/search',   (req, res) => requestController.searchRequests(req, res));
router.get('/',   (req, res) => requestController.getRequests(req, res));
router.get('/:id',   requestValidator.validateRequestId(), (req, res) => requestController.getRequest(req, res));
router.get('/user/:id',   requestValidator.validateRequestId(), (req, res) => requestController.getRequestsByUserId(req, res));
router.post('/',  (req, res) => requestController.createRequest(req, res));
router.put('/:id',   requestValidator.validateRequestData(), (req, res) => requestController.updateRequest(req, res));
router.delete('/:id',   requestValidator.validateRequestId(), (req, res) => requestController.deleteRequest(req, res));

module.exports = router;