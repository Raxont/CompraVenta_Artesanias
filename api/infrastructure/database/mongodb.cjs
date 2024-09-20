// Configuración y conexión a MongoDB.
const { MongoClient } = require("mongodb");
class ConnectToDatabase{
    static instanceConnect;
    db;
    connection;
    user;
    #password;
    constructor({user, pwd} = {user: process.env.VITE_MONGO_USER, pwd: process.env.VITE_MONGO_PWD}){
        if(ConnectToDatabase.instanceConnect && this.connection){
            return ConnectToDatabase.instanceConnect;
        }
        this.user = user;
        this.setPassword = pwd;
        // this.open();
        ConnectToDatabase.instanceConnect = this;
    }
    async connectOpen(){
        this.connection = new MongoClient(`${process.env.VITE_MONGO_ACCESS}${this.user}:${this.getPassword}@${process.env.VITE_MONGO_HOST}:${process.env.VITE_MONGO_PORT}`, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await this.connection.connect();
            this.db = this.connection.db(process.env.VITE_MONGO_DB_NAME);
        } catch (error) {
            this.connection = undefined;
            throw new Error('Error connecting');
        }
    }
    async connectClose(){
        this.connection.close();
    }
    get getPassword(){
        return this.#password;
    }
    set setPassword(pwd){
        this.#password = pwd;
    }
}
module.exports = ConnectToDatabase;