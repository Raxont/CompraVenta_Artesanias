// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const EducationalWorkshopsController = require('../controllers/educationalWorkshopsController.cjs');
const EducationalWorkshopsValidator = require('../validator/educationalWorkshopsValidator.cjs');

const router = express.Router();
const userController = new EducationalWorkshopsController();
const userValidator = new EducationalWorkshopsValidator();

//rutas de crud eEducationalWorkshopss
router.get('/search',   (req, res) => userController.searchEducationalWorkshops(req, res));
//router.get('/',   (req, res) => userController.getEducationalWorkshops(req, res));
router.get('/',   (req, res) => userController.getAllEducationalWorkshops(req, res));
router.get('/:id',   userValidator.validateEducationalWorkshopsId(), (req, res) => userController.getWorkshop(req, res));
router.post('/', userValidator.validateEducationalWorkshopsData(), (req, res) => userController.createWorkshop(req, res));
router.put('/:id',   userValidator.validateEducationalWorkshopsData(), (req, res) => userController.updateWorkshop(req, res));
router.delete('/:id',   userValidator.validateEducationalWorkshopsId(), (req, res) => userController.deleteWorkshop(req, res));

module.exports = router;