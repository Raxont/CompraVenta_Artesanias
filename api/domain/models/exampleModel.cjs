const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class Example {
    async findExample(id) {
        // let obj = ConnectToDatabase.instanceConnect;
        // const collection = obj.db.collection('example');
        // const [res] = await collection.find({ _id: new ObjectId(id) }).toArray();
        // return res;
        return {message:'hola mundo desde el modelo'};
    }
 
}

module.exports = Example;