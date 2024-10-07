// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const Workshop = require('../models/talleresModel.cjs');
const { ObjectId } = require("mongodb"); // Importa ObjectId para trabajar con IDs de MongoDB
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs"); // Importa la conexión a la base de datos MongoDB

/**
 * Clase que representa las operaciones relacionadas con los talleres en la base de datos.
 */
class Talleres {
    
    /**
     * Obtiene todos los talleres.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de talleres.
     */
    async findAll() {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        
        const res = await collection.find().toArray(); // Busca todos los talleres y los convierte a un array
        return res; // Devuelve el array de talleres
    }
    
    /**
     * Obtiene un taller específico por su ID.
     * @param {string} id - El ID del taller a buscar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el taller encontrado o null si no existe.
     */
    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray(); // Busca el taller por ID y toma el primer resultado
        return res; // Devuelve el taller encontrado o null si no existe
    }

    /**
     * Inserta un nuevo taller en la base de datos.
     * @param {Object} productData - Los datos del taller a insertar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la inserción.
     */
    async insert(productData) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        const res = await collection.insertMany([productData]); // Inserta el nuevo taller
        return res; // Devuelve el resultado de la inserción
    }

    /**
     * Actualiza un taller existente por su ID.
     * @param {string} id - El ID del taller a actualizar.
     * @param {Object} updateData - Los datos a actualizar en el taller.
     * @param {boolean} upsert - Si es verdadero, inserta un nuevo documento si no existe.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la actualización.
     */
    async findByIdAndUpdate(id, updateData, upsert) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert); // Actualiza el taller encontrado
        return res; // Devuelve el resultado de la actualización
    }

    /**
     * Elimina un taller por su ID.
     * @param {string} id - El ID del taller a eliminar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la eliminación.
     */
    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        const res = await collection.deleteMany({ _id: new ObjectId(id) }); // Elimina el taller encontrado por ID
        return res; // Devuelve el resultado de la eliminación
    }

    /**
     * Busca talleres que coincidan con un criterio específico.
     * @param {Object} find - Criterios de búsqueda para encontrar talleres.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de talleres que coinciden con los criterios.
     */
    async find(find) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección 'talleres'
        const res = await collection.find(find).toArray(); // Busca talleres que coincidan con los criterios y los convierte a un array
        return res; // Devuelve los talleres encontrados
    }

    async getAll() {
        try {
            const workshop = new Workshop();
            return await workshop.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving workshop'}));
        }
    }
    
    async getById(id) {
        try {
            const workshop = new Workshop();
            return await workshop.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving workshop'}));
        }
    }
    
    async save(workshopData) {
        try {
            const workshop = new Workshop();
            return await workshop.insert(workshopData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving workshop'}));
        }
    }
    
    async updateById(id, updateData) {
        try {
            const workshop = new Workshop();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await workshop.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating workshop'}));
        }
    }
    
    async deleteById(id) {
        try {
            const workshop = new Workshop();
            return await workshop.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting workshop'}));
        }
    }
    
    async searchByName(name) {
        try {
            const workshop = new Workshop();
            return await workshop.aggregateWorkshopProducts(arg);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving products of the workshop'}));
        }
    }
    
    async getProductsByWorkshop(arg) {
        try {
            const workshop = new Workshop();
            return await workshop.aggregateWorkshopProducts(arg);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving products of the workshop'}));
        }
    }
}

//* Exporta la clase Talleres para su uso en otros módulos.
module.exports = Talleres;
