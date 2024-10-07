const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class UserValidator {
    validateUserData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),

            body('correo')
                .notEmpty().withMessage('El correo es obligatorio')
                .isEmail().withMessage('Debe ser un correo electrónico válido'),

            body('contraseña')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

            body('fotoPerfil')
                .optional({ checkFalsy: true })
                .isString().withMessage('La ruta de la foto de perfil debe ser una cadena de texto'),

            body('direccion')
                .optional({ checkFalsy: true })
                .isString().withMessage('La dirección debe ser una cadena de texto'),

            body('telefono')
                .optional({ checkFalsy: true })
                .matches(/^[0-9]{10}$/).withMessage('El teléfono debe contener 10 dígitos'),

            body('tipo')
                .notEmpty().withMessage('El tipo de usuario es obligatorio')
                .isIn(['comprador', 'artesano']).withMessage('El tipo debe ser "comprador" o "artesano"'),

            body('favoritos.talleres')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de talleres favoritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de talleres favoritos deben ser válidos');
                    }
                    return true;
                }),

            body('favoritos.productos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de productos favoritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de productos favoritos deben ser válidos');
                    }
                    return true;
                }),

            body('compras')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de compras debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de compras deben ser válidos');
                    }
                    return true;
                }),

            body('talleresInscritos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de talleres inscritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de talleres inscritos deben ser válidos');
                    }
                    return true;
                }),

            body('cupones')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de cupones debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de cupones deben ser válidos');
                    }
                    return true;
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe nada en la URL');
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
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

    validateUserId = () => {
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
            
        ];
    };

    validateUserUpdateDataById = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser una cadena de caracteres'),

            body('correo')
                .notEmpty().withMessage('El correo es obligatorio')
                .isEmail().withMessage('Debe ser un correo electrónico válido'),

            body('contraseña')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

            body('fotoPerfil')
                .optional({ checkFalsy: true })
                .isString().withMessage('La ruta de la foto de perfil debe ser una cadena de texto'),

            body('direccion')
                .optional({ checkFalsy: true })
                .isString().withMessage('La dirección debe ser una cadena de texto'),

            body('telefono')
                .optional({ checkFalsy: true })
                .matches(/^[0-9]{10}$/).withMessage('El teléfono debe contener 10 dígitos'),

            body('tipo')
                .notEmpty().withMessage('El tipo de usuario es obligatorio')
                .isIn(['comprador', 'artesano']).withMessage('El tipo debe ser "comprador" o "artesano"'),

            body('favoritos.talleres')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de talleres favoritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de talleres favoritos deben ser válidos');
                    }
                    return true;
                }),

            body('favoritos.productos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de productos favoritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de productos favoritos deben ser válidos');
                    }
                    return true;
                }),

            body('compras')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de compras debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de compras deben ser válidos');
                    }
                    return true;
                }),

            body('talleresInscritos')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de talleres inscritos debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de talleres inscritos deben ser válidos');
                    }
                    return true;
                }),

            body('cupones')
                .optional({ checkFalsy: true })
                .isArray().withMessage('La lista de cupones debe ser un array')
                .custom((value) => {
                    if (value.some(id => !ObjectId.isValid(id))) {
                        throw new Error('Todos los identificadores de cupones deben ser válidos');
                    }
                    return true;
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíe nada en la URL');
                }
                return true;
            })
        ];
    };

    validateUpdateFavouriteProducts = () => {
        return [
            param('userId').notEmpty().withMessage('El id del usuario es obligatorio'),
            param('productId').notEmpty().isMongoId().withMessage('El id tiene que ser un hexadecimal')
        ];
    };
}

module.exports = UserValidator;
