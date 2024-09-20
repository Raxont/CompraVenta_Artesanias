const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class ExampleValidator {
    validateExampleData = () => {
        return [
            body('nombre').optional({ checkFalsy: true }).isNumeric().withMessage('The nombre is mandatory'),
        
        ];
    };
}

module.exports = ExampleValidator;
