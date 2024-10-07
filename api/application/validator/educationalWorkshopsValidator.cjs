const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class EducationalWorkshopsValidator {
    validateEducationalWorkshopsData = () => {
        return [
            body('nombre')
              .isString().withMessage('El nombre debe ser una cadena.')
              .isLength({ min: 1 }).withMessage('El nombre es requerido.'),
            
            body('descripcion')
              .isString().withMessage('La descripción debe ser una cadena.')
              .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),
            
            body('modalidad')
              .isString().withMessage('La modalidad debe ser una cadena.')
              .isIn(['presencial', 'virtual']).withMessage('La modalidad debe ser "presencial" o "virtual".'),
            
            body('fechaInicio')
              .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida.'),
            
            body('fechaFin')
              .isISO8601().withMessage('La fecha de fin debe ser una fecha válida.')
              .custom((value, { req }) => {
                if (new Date(value) < new Date(req.body.fechaInicio)) {
                  throw new Error('La fecha de fin debe ser mayor o igual a la fecha de inicio.');
                }
                return true;
              }),
            
            body('duracion')
              .isString().withMessage('La duración debe ser una cadena.'),
            
            body('materialesProporcionados')
              .optional()
              .isArray().withMessage('Los materiales proporcionados deben ser un array.')
              .custom((value) => {
                value.forEach(item => {
                  if (typeof item !== 'string') {
                    throw new Error('Cada material proporcionado debe ser una cadena.');
                  }
                });
                return true;
              }),
            
            body('materialesRequeridos')
              .optional()
              .isArray().withMessage('Los materiales requeridos deben ser un array.')
              .custom((value) => {
                value.forEach(item => {
                  if (typeof item !== 'string') {
                    throw new Error('Cada material requerido debe ser una cadena.');
                  }
                });
                return true;
              }),
        
            body('documental')
              .optional()
              .isString().withMessage('La URL del documental debe ser una cadena.'),
            
            body('IdTaller')
              .isMongoId().withMessage('IdTaller debe ser un ID de MongoDB válido.'),
            
            (req, res, next) => {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }
              next();
            }
          ];
    };

    validateEducationalWorkshopsDataEmpty = () => {
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

    validateEducationalWorkshopsId = () => {
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

module.exports = EducationalWorkshopsValidator;
