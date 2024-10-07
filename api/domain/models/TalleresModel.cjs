const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
class Talleres{  
    
    // Método para encontrar todos los documentos en la colección "talleres"
    async findAll () {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión a la base de datos
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        
        const res = await collection.find().toArray(); // Realiza la consulta y convierte el cursor a un arreglo
        return res; // Devuelve el resultado
    }
    
    // Método para encontrar un documento por su ID
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray(); // Busca el documento con el ID especificado
        return res; // Devuelve el resultado encontrado
    }

    // Método para insertar nuevos documentos en la colección "talleres"
    async insert(productData) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. 
        // En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        const res = await collection.insertMany([productData]); // Inserta los datos del producto en la colección
        return res; // Devuelve el resultado de la inserción
    }

    // Método para encontrar un documento por su ID y actualizarlo
    async findByIdAndUpdate(id, updateData, upsert) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. 
        // En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert); // Actualiza el documento según el ID y los datos proporcionados
        return res; // Devuelve el resultado de la actualización
    }

    // Método para eliminar un documento por su ID
    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        const res = await collection.deleteMany({ _id: new ObjectId(id) }); // Elimina el documento según el ID
        return res; // Devuelve el resultado de la eliminación
    }

    // Método para realizar una búsqueda personalizada en la colección "talleres"
    async find(find) {
        let obj = ConnectToDatabase.instanceConnect; // Obtiene la instancia de conexión
        const collection = obj.db.collection('talleres'); // Accede a la colección "talleres"
        const res = await collection.find(find).toArray(); // Realiza la consulta según el criterio especificado y convierte el cursor a un arreglo
        return res; // Devuelve el resultado de la búsqueda
    }

    async aggregateWorkshopProducts(arg){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleres');
        const res = await collection.aggregate([
            {
              $match: {
                _id: new ObjectId(arg)
              }
            },
            {
              $lookup: {
                from: "productos",
                localField: "_id",
                foreignField: "tallerId",
                as: "productos"
              }
            },
            {
              $unwind: {
                path: "$productos",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $replaceRoot: {
                newRoot: {
                  _id: "$_id",
                  nombre: "$nombre",
                  descripcion: "$descripcion",
                  fotos: "$fotos",
                  documental: "$documental",
                  artesanoId: "$artesanoId",
                  "producto_id": "$productos._id",
                  "producto_nombre": "$productos.nombre",
                  "producto_descripcion": "$productos.descripcion",
                  "producto_precio": "$productos.precio",
                  "producto_categoria": "$productos.categoria",
                  "producto_fotos": "$productos.fotos",
                  "producto_stock": "$productos.stock",
                  "producto_alto": "$productos.alto",
                  "producto_ancho": "$productos.ancho",
                  "producto_descuento": "$productos.descuento",
                  "producto_envio": "$productos.envio",
                  "producto_promocion": "$productos.promocion",
                  "producto_taller": "$productos.tallerId",
                }
              }
            }
          ]).toArray();
          console.log(arg)
          return res
    }
    
}

module.exports = Talleres; // Exporta la clase Talleres para su uso en otros módulos
