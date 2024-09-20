// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const exampleRoutes = require('../../application/routes/exampleRoutes.cjs');


const createServer = () => {
    const app = express();
    app.use(express.json());
    


    app.use('/examples',  exampleRoutes);
    return app;
};



module.exports = createServer;