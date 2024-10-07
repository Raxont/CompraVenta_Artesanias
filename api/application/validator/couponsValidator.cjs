const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class CouponsValidator {
    validateCouponsData = () => {
        return [
            // Validación para codigo
            body('codigo')
                .notEmpty().withMessage('El código del cupón es obligatorio')
                .isString().withMessage('El código debe ser una cadena de caracteres')
                .isLength({ min: 1 }).withMessage('El código del cupón no puede estar vacío'),

            // Validación para descuento
            body('descuento')
                .notEmpty().withMessage('El valor del descuento es obligatorio')
                .isDecimal({ decimal_digits: '0,2' }).withMessage('El descuento debe ser un número decimal')
                .custom((value) => {
                    if (parseFloat(value) <= 0) {
                        throw new Error('El valor del descuento debe ser mayor que 0');
                    }
                    return true;
                }),

            // Validación para tipo
            body('tipo')
                .notEmpty().withMessage('El tipo de cupón es obligatorio')
                .isIn(['general', 'asignado']).withMessage('El tipo de cupón debe ser "general" o "asignado"'),

            // Validación para fechaExpiracion
            body('fechaExpiracion')
                .notEmpty().withMessage('La fecha de expiración es obligatoria')
                .isISO8601().withMessage('La fecha de expiración debe tener un formato válido'),

            // Validación para usuarioId (opcional)
            body('usuarioId')
                .optional({ checkFalsy: true })
                .custom((value) => {
                    if (value && !ObjectId.isValid(value)) {
                        throw new Error('El identificador del usuario debe ser un ID válido');
                    }
                    return true;
                }),

            // Verificar que no se envíen parámetros adicionales en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateCouponsDataEmpty = () => {
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

    validateCouponsId = () => {
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

module.exports = CouponsValidator;
