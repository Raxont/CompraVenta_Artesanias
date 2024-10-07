const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class MessagesValidator {
    validateMessagesData = () => {
        return [
            // Validación para remitenteId
            body('remitenteId')
                .notEmpty().withMessage('El identificador del remitente es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El identificador del remitente debe ser un ID válido');
                    }
                    return true;
                }),

            // Validación para receptorId
            body('receptorId')
                .notEmpty().withMessage('El identificador del receptor es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El identificador del receptor debe ser un ID válido');
                    }
                    return true;
                }),

            // Validación para contenido
            body('contenido')
                .notEmpty().withMessage('El contenido del mensaje es obligatorio')
                .isString().withMessage('El contenido debe ser un texto')
                .isLength({ min: 1 }).withMessage('El contenido del mensaje no puede estar vacío'),

            // Validación para fecha
            body('fecha')
                .notEmpty().withMessage('La fecha del mensaje es obligatoria')
                .isISO8601().withMessage('La fecha debe tener un formato válido'),

            // Verificar que no se envíen parámetros adicionales en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateMessagesDataEmpty = () => {
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

    validateMessagesId = () => {
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

module.exports = MessagesValidator;
