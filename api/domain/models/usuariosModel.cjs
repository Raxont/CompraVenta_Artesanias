const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
class Usuarios {

    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');

        const res = await collection.find().toArray();
        return res;
    }

    async findByObjectId(id) {
        console.log("Entra a buscar le usuario en el modelo")
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({ _id: id }).toArray();
        return res;
    }

    async findById(id) {
        console.log("Entra a buscar le usuario en el modelo")
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({ id: id }).toArray();
        return res;
    }

    async findByEmail(email) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({ corrreo: email }).toArray();
        return res;
    }

    async insert(userData) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.insertMany([userData]);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }

    async findByIdAndUpdateForm(id, updateData, upsert) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.updateOne({ id: id }, { $set: updateData }, upsert);
        return res;
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async aggregate(dataUser) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.aggregate(dataUser).toArray();
        return res;
    }

    /**
     * Busca usuarios utilizando una consulta específica.
     * @param {string} query - La consulta para buscar usuarios.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de usuarios encontrados.
     */
    async searchByQuery(query) {
        const regexQuery = new RegExp(query, 'i'); // Crea una expresión regular para la búsqueda
        // Si el query es un número de teléfono, elimina el prefijo de país
        const isPhoneNumber = /^\d+$/.test(query); // Verifica si la búsqueda es un número
        const phoneQuery = isPhoneNumber ? new RegExp(`\\+\\d{1,3} ${query}$`, 'i') : regexQuery; // Crea la expresión para números de teléfono
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('usuarios'); // Accede a la colección 'usuarios'
        const info = await collection.find({ // Busca usuarios que coincidan con el nombre, teléfono o correo
            $or: [
                { nombre: regexQuery },
                { telefono: phoneQuery },
                { correo: regexQuery }
            ]
        }).toArray(); // Convierte los resultados a un array
        return info; // Devuelve los usuarios encontrados
    }

    async updateOne(query, updateData, options = {}) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        try {
            const res = await collection.updateOne(query, updateData, options);
            return res;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    async getCart(userId) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.aggregate(
            [
                {
                    $match: {
                        id: userId
                    }
                },
                {
                    $unwind: "$carritoCompras"
                },
                {
                    $lookup: {
                        from: "productos",
                        localField: "carritoCompras.productoId",
                        foreignField: "_id",
                        as: "productoDetalle"
                    }
                },
                {
                    $unwind: "$productoDetalle"
                },
                {
                    $project: {
                        _id:0,
                        productoId: "$productoDetalle._id",
                        nombreProducto: "$productoDetalle.nombre",
                        dimensiones: {
                            largo: "$productoDetalle.largo",
                            ancho: "$productoDetalle.ancho"
                        },
                        precio: "$productoDetalle.precio",
                        descripcion: "$productoDetalle.descripcion",
                        cantidad: "$carritoCompras.cantidad",
                        envio: "$productoDetalle.envio",
                        promocion: "$productoDetalle.promocion",
                        fotos: { $arrayElemAt: ["$productoDetalle.fotos", 0] } 
                    }
                }
            ]
        ).toArray();
        
        return res;
    }

    async pushFavourite(userId, productId) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const idUser = userId.toString();
        const idProduct = productId.toString();
        const res = await collection.updateOne(
            { id: idUser},
            { $push: { favoritos: new ObjectId(idProduct) } }
        )
        return res
    }

    async pullFavourite(userId, productId) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.updateOne(
            { id: userId},
            { $pull: { favoritos: new ObjectId(productId) } }
        )
        return res
    }

}

module.exports = Usuarios;