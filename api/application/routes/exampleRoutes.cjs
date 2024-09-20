// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ExampleController = require('../controllers/exampleController.cjs');
const ExampleValidator = require('../validator/exampleValidator.cjs');

const router = express.Router();
const exampleController = new ExampleController();
const exampleValidator = new ExampleValidator();

router.get('/',  exampleValidator.validateExampleData(), (req, res) => exampleController.getExample(req, res));

// // ejemplo de rutas para un CRUD
// router.post('/', exampleValidator.validateExampleData(), (req, res) => exampleController.createExample(req, res));
// router.get('/:id', sessionAuth, auth, exampleValidator.validateExampleId(), (req, res) => exampleController.getExample(req, res));
// router.put('/:id', sessionAuth, auth, exampleValidator.validateExampleUpdateDataById(), (req, res) => exampleController.updateExample(req, res));
// router.delete('/:id', sessionAuth, auth, exampleValidator.validateExampleId(), (req, res) => exampleController.deleteExample(req, res));
// router.get('/search', sessionAuth, auth, (req, res) => exampleController.searchExamples(req, res));

module.exports = router; 