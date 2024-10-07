const cors = require("cors"); // Importa el middleware CORS para gestionar las solicitudes de origen cruzado

//* Configuración de CORS (Cross-Origin Resource Sharing)
/**
 * Configuración del middleware CORS para permitir solicitudes desde un origen específico.
 * @type {Object} corsConfig - Configuración de CORS.
 * @property {string} origin - Especifica el origen permitido para las solicitudes.
 * @property {Array<string>} methods - Métodos HTTP permitidos para las solicitudes.
 * @property {Array<string>} allowedHeaders - Cabeceras permitidas en las solicitudes.
 * @property {boolean} credentials - Permitir el envío de cookies y credenciales con solicitudes CORS.
 */
const corsConfig = cors({
  origin: "http://localhost:3000", // Permitir solicitudes solo desde este origen específico
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos para las solicitudes
  allowedHeaders: ["Content-Type", "Authorization", "x-version"], // Cabeceras permitidas en las solicitudes
  credentials: true, // Permitir el envío de cookies y credenciales con solicitudes CORS
});

module.exports = corsConfig; // Exporta la configuración de CORS para su uso en otros módulos
