// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const PaymentsController = require('../controllers/paymentsController.cjs');
const PaymentsValidator = require('../validator/paymentsValidator.cjs');

const router = express.Router();
const paymentsController = new PaymentsController();
const paymentsValidator = new PaymentsValidator();

router.get('/search', (req, res) => paymentsController.searchPayments(req, res));
router.get('/', (req, res) => paymentsController.getPayments(req, res));
router.get('/:id', paymentsValidator.validatePaymentsId(), (req, res) => paymentsController.getPaymentsById(req, res));
router.post('/', paymentsValidator.validatePaymentsData(), (req, res) => paymentsController.createPayments(req, res));
router.put('/:id', paymentsValidator.validatePaymentsData(), (req, res) => paymentsController.updatePayments(req, res));
router.delete('/:id', paymentsValidator.validatePaymentsId(), (req, res) => paymentsController.deletePayments(req, res));

module.exports = router;