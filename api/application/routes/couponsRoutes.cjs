// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const CouponsController = require('../controllers/couponsController.cjs');
const CouponsValidator = require('../validator/couponsValidator.cjs');

const router = express.Router();
const couponsController = new CouponsController();
const couponsValidator = new CouponsValidator();

router.get('/search', (req, res) => couponsController.searchCoupons(req, res));

router.get('/user/:id', (req, res) => couponsController.getCouponsByUserId(req, res));
router.get('/:id', couponsValidator.validateCouponsId(), (req, res) => couponsController.getCouponsById(req, res));

router.get('/', (req, res) => couponsController.getCoupons(req, res));

router.post('/', couponsValidator.validateCouponsData(), (req, res) => couponsController.createCoupons(req, res));

router.put('/:id', couponsValidator.validateCouponsData(), (req, res) => couponsController.updateCoupons(req, res));

router.delete('/:id', couponsValidator.validateCouponsId(), (req, res) => couponsController.deleteCoupons(req, res));

module.exports = router;