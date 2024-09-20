// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const Example = require('../models/exampleModel.cjs');

class ExampleRepository {
    async getExamples() {
        try {
            const example = new Example();
            return await example.findExample();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving example'}));
        }
    }


}

module.exports = ExampleRepository;