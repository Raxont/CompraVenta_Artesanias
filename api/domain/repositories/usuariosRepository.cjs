// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const { ObjectId } = require('mongodb');
const User = require('../models/usuariosModel.cjs');
class UserRepository {

    /**
     * Obtiene todos los usuarios.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de usuarios.
     * @throws {Error} - Lanza un error si ocurre un problema al recuperar usuarios.
     */
    async getAll() {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findAll(); // Devuelve todos los usuarios encontrados
        } catch (error) {
            // Lanza un error si ocurre un problema al recuperar usuarios
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving user' }));
        }
    }

    async getByObjectId(id) {
        try {
            const user = new User();
            return await user.findByObjectId(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    /**
     * Obtiene un usuario por su ID.
     * @param {string} id - El ID del usuario a recuperar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el usuario encontrado o undefined si no existe.
     * @throws {Error} - Lanza un error si ocurre un problema al recuperar el usuario.
     */
    async getById(id) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findById(id); // Devuelve el usuario encontrado por ID
        } catch (error) {
            // Lanza un error si ocurre un problema al recuperar el usuario
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving user' }));
        }
    }

    /**
     * Obtiene un usuario por su correo electrónico.
     * @param {string} email - El correo electrónico del usuario a recuperar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el usuario encontrado o undefined si no existe.
     * @throws {Error} - Lanza un error si ocurre un problema al recuperar el usuario.
     */
    async getByEmail(email) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findByEmail(email); // Devuelve el usuario encontrado por email
        } catch (error) {
            // Lanza un error si ocurre un problema al recuperar el usuario
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving user' }));
        }
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     * @param {Object} userData - Los datos del usuario a guardar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la inserción.
     * @throws {Error} - Lanza un error si ocurre un problema al guardar el usuario.
     */
    async save(userData) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.insert(userData); // Inserta el nuevo usuario y lo devuelve
        } catch (error) {
            // Lanza un error si ocurre un problema al guardar el usuario
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving user' }));
        }
    }

    /**
     * Actualiza un usuario existente por su ID.
     * @param {string} id - El ID del usuario a actualizar.
     * @param {Object} updateData - Los datos a actualizar en el usuario.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la actualización.
     * @throws {Error} - Lanza un error si ocurre un problema al actualizar el usuario.
     */
    async updateById(id, updateData) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findByIdAndUpdate(id, updateData, { upsert: true }); // Actualiza el usuario y lo devuelve
        } catch (error) {
            // Lanza un error si ocurre un problema al actualizar el usuario
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    async updateUserIdForm(id, updateData) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findByIdAndUpdateForm(id, updateData, { upsert: true }); // Actualiza el usuario y lo devuelve
        } catch (error) {
            // Lanza un error si ocurre un problema al actualizar el usuario
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Elimina un usuario por su ID.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la eliminación.
     * @throws {Error} - Lanza un error si ocurre un problema al eliminar el usuario.
     */
    async deleteById(id) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.findByIdAndDelete(id); // Elimina el usuario y lo devuelve
        } catch (error) {
            // Lanza un error si ocurre un problema al eliminar el usuario
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting user' }));
        }
    }

    /**
     * Busca usuarios mediante una consulta personalizada.
     * @param {string} query - La consulta para buscar usuarios.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de usuarios encontrados.
     * @throws {Error} - Lanza un error si ocurre un problema al realizar la búsqueda.
     */
    async searchQuery(query) {
        try {
            const user = new User(); // Crea una nueva instancia del modelo de usuario
            return await user.searchByQuery(query); // Devuelve los usuarios que coinciden con la consulta
        } catch (error) {
            // Lanza un error si ocurre un problema al realizar la búsqueda
            throw new Error(JSON.stringify({ status: 404, message: 'Error finding query' }));
        }
    }

    // Método para agregar un producto al carrito
    async addProductToCart(usuarioId, productoId, session) {
        const user = new User();
        return await user.updateOne(
            { id:usuarioId },
            {
                $push: {
                    carritoCompras: { productoId: new ObjectId(productoId), cantidad: 1 }
                }
            },
            
        );
    }

    // Método para incrementar la cantidad de un producto en el carrito
    async incrementProductQuantity(usuarioId, productoId) {
        const user = new User();
        return await user.updateOne(
            { id: usuarioId, 'carritoCompras.productoId': new ObjectId(productoId) },
            { $inc: { 'carritoCompras.$.cantidad': 1 } },
            
        );
    }

    async decrementProductQuantity(usuarioId, productoId) {
        const user = new User();
        return await user.updateOne(
            { id: usuarioId, 'carritoCompras.productoId': new ObjectId(productoId) },
            { $inc: { 'carritoCompras.$.cantidad': -1 } }
        );
    }
    
    async removeProductFromCart(usuarioId, productoId) {
        const user = new User();
        return await user.updateOne(
            { id: usuarioId },
            { $pull: { carritoCompras: { productoId: new ObjectId(productoId) } } }
        );
    }
    
    async getCarritoData(userId){
        try {
            const user = new User();
            return await user.getCart(userId);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async pushFavouriteProduct(userId, productId) {
        try {
            const user = new User();
            return await user.pushFavourite(userId, productId);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async pullFavouriteProduct(userId, productId) {
        try {
            const user = new User();
            return await user.pullFavourite(userId, productId);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async searchByName(name) {
        try {
            return await User.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for users');
        }
    }
    // async checkProductAndStock(productId, quantity){ // sera eliminado proximamente
    //     try{
    //         const products = new Productos();
    //         return await products.checkProductandStock(productId, quantity);
    //     }
    //     catch (error) {
        
    //     }
    // }

    // Método para buscar un producto en el carrito del usuario
    async findProductInCart(usuarioId, productoId, session) {
        const user = new User();
        const result = await user.aggregate([
            { $match: { id: usuarioId } },
            {
                $project: {
                    productoEnCarrito: {
                        $filter: {
                            input: '$carritoCompras',
                            as: 'item',
                            cond: { $eq: ['$$item.productoId', new ObjectId(productoId)] }
                        }
                    }
                }
            }
        ], );
        
        return result[0]?.productoEnCarrito?.length ? result[0].productoEnCarrito[0] : null;
    }

    async addCuponToCart(usuarioId, cupon, session) {
        const user = new User();
        return await user.updateOne(
            { _id: new ObjectId(usuarioId) },
            {
                $set: {
                    carritoCompras: { descuento: new ObjectId(productoId), cantidad: 1 }
                }
            },
            
        );
    }   

}

//* Exporta el repositorio de usuarios para su uso en otros módulos.
module.exports = UserRepository;
