const { ObjectId } = require("mongodb"); // Importa ObjectId para trabajar con identificadores de MongoDB
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs"); // Importa la clase para conectar a la base de datos MongoDB

class Mensajes {
    // Método para guardar un mensaje en la colección "mensajes"
    async saveMessage(message) {
        const dbInstance = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        
        // Verifica si la conexión a la base de datos está abierta
        if (!dbInstance || !dbInstance.db) {
            console.error('La conexión a la base de datos no está abierta.'); // Muestra un mensaje de error en la consola
            throw new Error('La conexión a la base de datos no está abierta.'); // Lanza un error si no hay conexión
        }

        const collection = dbInstance.db.collection('mensajes'); // Accede a la colección "mensajes"
        try {
            // Inserta el mensaje en la colección
            const resultado = await collection.insertOne({
                remitenteId: message.remitenteId, // ID del remitente
                receptorId: message.receptorId, // ID del receptor
                contenido: message.contenido, // Contenido del mensaje
                fecha: message.fecha || new Date(), // Fecha del mensaje (usa la fecha actual si no se proporciona)
            });

            // Busca el mensaje insertado usando su insertedId
            const mensajeGuardado = await collection.findOne({ _id: resultado.insertedId }); // Recupera el mensaje guardado por su ID

            return mensajeGuardado; // Devuelve el mensaje guardado
        } catch (error) {
            console.error('Error al guardar el mensaje:', error); // Muestra un mensaje de error en la consola
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }
     // Método para obtener mensajes de la colección "mensajes"
     async getMessages(remitenteId, receptorId) {
        const dbInstance = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos

        // Verifica si la conexión a la base de datos está abierta
        if (!dbInstance || !dbInstance.db) {
            console.error('La conexión a la base de datos no está abierta.'); // Muestra un mensaje de error en la consola
            throw new Error('La conexión a la base de datos no está abierta.'); // Lanza un error si no hay conexión
        }

        const collection = dbInstance.db.collection('mensajes'); // Accede a la colección "mensajes"
        try {
            // Si remitenteId y receptorId son proporcionados, filtrar por ellos
            const filter = {
                ...(remitenteId && { remitenteId }), // Añadir remitenteId al filtro si está definido
                ...(receptorId && { receptorId }) // Añadir receptorId al filtro si está definido
            };

            const mensajes = await collection.find(filter).toArray(); // Obtiene los mensajes filtrados como un array

            return mensajes; // Devuelve los mensajes obtenidos
        } catch (error) {
            console.error('Error al obtener los mensajes:', error); // Muestra un mensaje de error en la consola
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }
}

module.exports = new Mensajes(); // Exporta una instancia única de la clase Mensajes
