const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class ProductsValidator {
    validateProductsData = () => {
        return [
            // Validación para el nombre
            body('nombre')
                .notEmpty().withMessage('El nombre del producto es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),

            // Validación para la descripción
            body('descripcion')
                .notEmpty().withMessage('La descripción del producto es obligatoria')
                .isString().withMessage('La descripción debe ser una cadena de caracteres')
                .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

            // Validación para el precio
            body('precio')
                .notEmpty().withMessage('El precio del producto es obligatorio')
                .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor que 0'),

            // Validación para la categoría
            body('categoria')
                .notEmpty().withMessage('La categoría del producto es obligatoria')
                .isString().withMessage('La categoría debe ser una cadena de caracteres'),

            // Validación para las fotos
            body('fotos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('Las fotos del producto deben ser un array')
                .custom((value) => {
                    if (value.some(url => typeof url !== 'string')) {
                        throw new Error('Cada URL de foto debe ser una cadena de texto');
                    }
                    return true;
                }),

            // Validación para el stock
            body('stock')
                .notEmpty().withMessage('El stock es obligatorio')
                .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),

            // Validación para el artesanoId
            body('artesanoId')
                .notEmpty().withMessage('El identificador del artesano es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El identificador del artesano debe ser un ID válido');
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

    validateProductsDataEmpty = () => {
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

    validateProductsId = () => {
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

    validateProductsCategory = () => {
        return [
            param('categoria').isString().isIn([
                'Textileria',
                'Ceramica',
                'Orfebreria',
                'Talla en Piedra',
                'Talla en Madera',
                'Bordado',
                'Joyeria',
                'Hojalateria',
                'Estampado',
                'Pintura Tradicional'
            ]).withMessage('Envia una categoria valida')
        ];
    };

    validateFavouriteProducts = () => {
        return [
            param('id').notEmpty().withMessage('El id del usuario es obligatorio'),
            param('categoria').isString().isIn([
                'Textileria',
                'Ceramica',
                'Orfebreria',
                'Talla en Piedra',
                'Talla en Madera',
                'Bordado',
                'Joyeria',
                'Hojalateria',
                'Estampado',
                'Pintura Tradicional'
            ]).withMessage('Envia una categoria valida')
        ];
    };

}

module.exports = ProductsValidator;
