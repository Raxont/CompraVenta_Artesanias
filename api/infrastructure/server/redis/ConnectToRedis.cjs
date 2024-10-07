const { createClient } = require('redis'); // Importa la función para crear un cliente Redis

//* Clase para manejar la conexión a Redis
/**
 * Clase que gestiona la conexión y las operaciones básicas con Redis.
 */
class ConnectToRedis {
  
  /**
   * Constructor que inicializa la conexión a Redis.
   * Utiliza las variables de entorno para configurar el host y puerto de Redis.
   */
  constructor() {
    // Crea un cliente Redis utilizando las variables de entorno para el host y puerto
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`, // Configura la URL del servidor Redis
    });

    // Maneja el evento de error del cliente Redis
    this.client.on('error', (err) => {
      console.error('Redis error:', err); // Muestra el error en la consola si ocurre uno
    });
  }

  /**
   * Conecta al servidor Redis.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se ha establecido.
   */
  async connect() {
    await this.client.connect(); // Espera a que la conexión se establezca
    console.log("Conectado a Redis"); // Muestra un mensaje de éxito cuando la conexión es exitosa
  }

  /**
   * Agrega un mensaje a una lista en Redis.
   * @param {string} key - La clave de la lista en Redis.
   * @param {Object} message - El mensaje a agregar.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el mensaje se ha agregado.
   */
  async pushMessage(key, message) {
    // Verifica que el cliente Redis esté conectado
    if (!this.client.isOpen) {
        console.error('El cliente Redis no está conectado.'); // Muestra un error si el cliente no está conectado
        throw new Error('El cliente Redis no está conectado.'); // Lanza un error si no hay conexión
    }
    await this.client.rPush(key, JSON.stringify(message)); // Agrega el mensaje a la lista usando rPush (empieza por la derecha)
  }

  /**
   * Obtiene y elimina el primer mensaje de una lista en Redis.
   * @param {string} key - La clave de la lista en Redis.
   * @returns {Promise<Object|null>} - El primer mensaje de la lista, o null si no hay mensajes.
   */
  async popMessage(key) {
    const res = await this.client.lPop(key); // Obtiene y elimina el primer mensaje de la lista
    return res ? JSON.parse(res) : null; // Convierte el mensaje de JSON a objeto, o devuelve null si no hay mensajes
  }

  /**
   * Obtiene todos los mensajes de una lista en Redis.
   * @param {string} key - La clave de la lista en Redis.
   * @returns {Promise<Array<Object>>} - Una lista de todos los mensajes en la lista.
   */
  async getMessages(key) {
    const messages = await this.client.lRange(key, 0, -1); // Obtiene todos los mensajes de la lista usando lRange
    return messages.map(msg => JSON.parse(msg)); // Convierte cada mensaje de JSON a objeto
  }

  /**
   * Cierra la conexión con Redis.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se ha cerrado.
   */
  async close() {
    await this.client.quit(); // Cierra la conexión al servidor Redis
  }
}

module.exports = ConnectToRedis; // Exporta la clase para su uso en otros módulos
