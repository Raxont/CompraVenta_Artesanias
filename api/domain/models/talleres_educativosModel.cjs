const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
class Talleres{
    
    async findAll () {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        
        const res = await collection.find().toArray();
        return res;
    }
    
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }
    async insert(productData){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const res = await collection.insertMany([productData]);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async find(find){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const res = await collection.find(find).toArray();
        return res;
    }

    async aggregateEducationalWorkshops() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('talleresEducativos');
        const res = await collection.aggregate([
            {
              $lookup: {
                from: "talleres",
                localField: "tallerId",
                foreignField: "_id",
                as: "talleres"
              }
            },
            {
              $unwind: {
                path: "$talleres",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $replaceRoot: {
                newRoot: {
                  _id: "$_id",
                  nombre: "$nombre",
                  descripcion: "$descripcion",
                  modalidad: "$modalidad",
                  fechaInicio: "$fechaInicio",
                  fechaFin: "$fechaFin",
                  materiales: "$materiales",
                  documental: "$documental",
                  foto: "$foto",
                  lugar: "$lugar",
                  tallerId: "$tallerId",
                  publico: "$publico",
                  "taller_nombre": "$talleres.nombre",
                  "taller_descripcion": "$talleres.descripcion",
                  "taller_ciudad": "$talleres.ciudad",
                  "taller_documental": "$talleres.documental",
                  "taller_artesanoId": "$talleres.artesanoId",
                  "taller_fotos": "$talleres.fotos",
                }
              }
            }
          ]).toArray();
          return res;
    }
    
}

module.exports = Talleres;