const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class RequestValidator {
    validateRequestData = () => {
        return [
            // Validación para usuarioId
            body('usuarioId')
                .notEmpty().withMessage('El identificador del usuario es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El identificador del usuario debe ser un ID válido');
                    }
                    return true;
                }),

            // Validación para productos
            body('productos')
                .notEmpty().withMessage('La lista de productos es obligatoria')
                .isArray({ min: 1 }).withMessage('Debe haber al menos un producto en el pedido')
                .custom((value) => {
                    value.forEach(producto => {
                        if (!ObjectId.isValid(producto.productoId)) {
                            throw new Error('El identificador del producto debe ser un ID válido');
                        }
                        if (!Number.isInteger(producto.cantidad) || producto.cantidad < 1) {
                            throw new Error('La cantidad del producto debe ser un entero mayor o igual a 1');
                        }
                        if (typeof producto.precio !== 'number' || producto.precio < 0.01) {
                            throw new Error('El precio del producto debe ser un número mayor que 0');
                        }
                    });
                    return true;
                }),

            // Validación para total
            body('total')
                .notEmpty().withMessage('El total del pedido es obligatorio')
                .isFloat({ min: 0.01 }).withMessage('El total del pedido debe ser mayor que 0'),

            // Validación para fecha
            body('fecha')
                .notEmpty().withMessage('La fecha del pedido es obligatoria')
                .isISO8601().withMessage('La fecha debe estar en un formato válido'),

            // Validación para estado
            body('estado')
                .notEmpty().withMessage('El estado del pedido es obligatorio')
                .isIn(['pendiente', 'enviado', 'entregado']).withMessage('El estado debe ser "pendiente", "enviado" o "entregado"'),

            // Verificar que no se envíen parámetros adicionales en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateRequestDataEmpty = () => {
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

    validateRequestId = () => {
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

    //Necesita ser actualizado ya que fue creado por un arreglo rapido
    validateRequestUpdateDataById = () => {
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

module.exports = RequestValidator;
