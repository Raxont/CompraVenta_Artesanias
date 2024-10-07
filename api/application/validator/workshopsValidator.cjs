const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class WorkshopValidator {
    validateWorkshopData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre del taller es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),

            body('descripcion')
                .notEmpty().withMessage('La descripción del taller es obligatoria')
                .isString().withMessage('La descripción debe ser una cadena de caracteres')
                .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

            body('modalidad')
                .notEmpty().withMessage('La modalidad del taller es obligatoria')
                .isIn(['presencial', 'virtual']).withMessage('La modalidad debe ser "presencial" o "virtual"'),

            body('fechaInicio')
                .notEmpty().withMessage('La fecha de inicio es obligatoria')
                .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),

            body('fechaFin')
                .notEmpty().withMessage('La fecha de fin es obligatoria')
                .isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),

            body('duracion')
                .notEmpty().withMessage('La duración del taller es obligatoria')
                .isString().withMessage('La duración debe ser una cadena de caracteres'),

            body('materialesProporcionados')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de materiales proporcionados debe ser un array')
                .custom((value) => {
                    if (value.some(material => typeof material !== 'string')) {
                        throw new Error('Todos los materiales proporcionados deben ser cadenas de texto');
                    }
                    return true;
                }),

            body('materialesRequeridos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de materiales requeridos debe ser un array')
                .custom((value) => {
                    if (value.some(material => typeof material !== 'string')) {
                        throw new Error('Todos los materiales requeridos deben ser cadenas de texto');
                    }
                    return true;
                }),

            body('documental')
                .optional({ checkFalsy: true })
                .isString().withMessage('La URL del documental debe ser una cadena de texto')
                .isURL().withMessage('Debe ser una URL válida'),

            body('artesanoId')
                .notEmpty().withMessage('El identificador del artesano es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El identificador del artesano debe ser un ID válido');
                    }
                    return true;
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateWorkshopId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envíe un ID válido para el taller');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe parámetros en la URL');
                }
                return true;
            })
        ];
    };
}

module.exports = WorkshopValidator;
