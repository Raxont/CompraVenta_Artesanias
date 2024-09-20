// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult, body } = require('express-validator');
const ExampleService = require('../services/exampleService.cjs');


class ExampleController {
    constructor() {
        this.exampleService = new ExampleService();
    }

    async getExample(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const example = await this.exampleService.getExamples();
            res.status(200).json(example);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}

module.exports = ExampleController;