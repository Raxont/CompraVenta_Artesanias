const ConnectToDatabase = require('./infrastructure/database/mongodb.cjs');
const createServer = require('./infrastructure/server/server.cjs');

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();
    const app = createServer();

    app.listen({port: process.env.VITE_PORT_BACKEND, host:process.env.VITE_HOST}, () => {
        console.log(`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
    });
};

startApp();