// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ExampleRepository = require('../../domain/repositories/exampleRepository.cjs');

class ExampleService {
    constructor() {
        this.exampleRepository = new ExampleRepository();
    }

    async getExamples() {
        const example = await this.exampleRepository.getExamples();
        if (!example) {
            throw new Error(JSON.stringify({status: 404, message: 'Example not found'}));
        }
        return example;
    }

    
}

module.exports = ExampleService;