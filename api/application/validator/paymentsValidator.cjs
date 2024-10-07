const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class PaymentsValidator {
    validatePaymentsData = () => {
        return [
            body('usuarioId')
                .isString().withMessage('El usuarioId debe ser una cadena.')
                .isLength({ min: 1 }).withMessage('El usuarioId es requerido.'),

            body('pedidoId')
                .isString().withMessage('El pedidoId debe ser una cadena.')
                .isLength({ min: 1 }).withMessage('El pedidoId es requerido.'),

            body('monto')
                .isInt({ min: 0 }).withMessage('El monto debe ser un número entero mayor o igual a 0.'),

            body('fecha')
                .isISO8601().withMessage('La fecha debe ser una fecha válida.'),

            body('metodoPago')
                .isString().withMessage('El método de pago debe ser una cadena.')
                .isLength({ min: 1 }).withMessage('El método de pago es requerido.'),

            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            }
        ];
    };

    validatePaymentsDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validatePaymentsId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

}

module.exports = PaymentsValidator;
