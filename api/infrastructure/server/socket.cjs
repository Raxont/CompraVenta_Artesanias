const { Server } = require("socket.io"); // Importa el módulo Socket.IO para la comunicación en tiempo real
const Mensajes = require("../../domain/models/mensajeModel.cjs"); // Modelo para gestionar mensajes
const ConnectToRedis = require("./redis/ConnectToRedis.cjs"); // Clase para manejar la conexión a Redis

//* Configura el socket y maneja los eventos de conexión
const setupSocket = (server) => {
  //* Configuración de socket.io con soporte CORS
  const io = new Server(server, {
    cors: {
      origin: "*", // Permitir cualquier origen para las conexiones
      methods: ["GET", "POST"], // Métodos HTTP permitidos
    },
  });

  //* Conexión a Redis
  const redisClient = new ConnectToRedis(); // Crea una instancia de ConnectToRedis
  redisClient.connect().catch(console.error); // Conecta a Redis y maneja errores

  //* Mapas para gestionar usuarios y mensajes
  const userTallerMap = {}; // Mapea el socket ID con el taller al que pertenece el usuario
  const messageBuffer = {}; // Buffer para almacenar mensajes por taller
  const activeChats = {}; // Almacena los chats activos de los usuarios

  //* Evento cuando un cliente se conecta al servidor de sockets
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado"); // Log para indicar que un nuevo cliente se ha conectado

    //* Evento cuando el usuario se une a una sala/taller
    socket.on("joinRoom", async ({ user_Id, taller,receptorId }) => {
      try {
        // Obtén los últimos mensajes desde MongoDB antes de unirte a la sala
        const lastMessages = await Mensajes.getMessages(null, receptorId); // Obtener todos los mensajes para este taller
        // Verifica si el último mensaje fue "Estoy satisfecho"
        const lastMessage = lastMessages.length > 0 ? lastMessages[lastMessages.length - 1] : null;
        
        if (!lastMessage || lastMessage.contenido === "Estoy satisfecho") {
          // Permitir que el usuario ingrese con un nuevo usuarioId
          socket.join(taller); // Unirse a la sala del taller
          userTallerMap[socket.id] = taller; // Asigna el taller correspondiente al socket
          activeChats[user_Id] = taller; // Establece este chat como activo para este usuario
          console.log(`${user_Id} se ha unido al taller ${taller}`); // Log del usuario que se une al taller

        } else {
            // Obtener los dos últimos mensajes
            const lastTwoMessages = lastMessages.slice(-2);

            // Variable para almacenar los mensajes a emitir
            let messagesToEmit;

            // Verificamos si hay al menos dos mensajes
            if (lastTwoMessages.length === 2) {
              // Comparamos los remitenteId de los dos últimos mensajes
              if (lastTwoMessages[0].remitenteId === lastTwoMessages[1].remitenteId) {
                // Si son iguales, emitimos los dos mensajes
                messagesToEmit = lastTwoMessages.map(msg => ({
                  contenido: msg.contenido,
                  remitenteId: msg.remitenteId,
                  fecha: msg.fecha
                }));
              } else {
                // Si no son iguales, emitimos solo el último mensaje
                messagesToEmit = [lastTwoMessages[1]];
              }
            } else if (lastTwoMessages.length === 1) {
              // Si solo hay un mensaje, lo emitimos
              messagesToEmit = [lastTwoMessages[0]];
            }

            // Actualizar user_Id con el remitenteId del último mensaje
            if (messagesToEmit && messagesToEmit.length > 0) {
              user_Id = messagesToEmit[messagesToEmit.length - 1].remitenteId;
            }

            // Emitir los dos últimos mensajes al usuario
            socket.emit('loadPreviousMessages', messagesToEmit);

            // Unir al mismo usuario a la sala
            socket.join(taller);
            userTallerMap[socket.id] = taller;
            activeChats[user_Id] = taller;
            console.log(`${user_Id} (mismo usuario) se ha unido al taller ${taller}`);
          }
      } catch (error) {
        console.error('Error al unir al usuario a la sala:', error);
      }
    });

    //* Evento para enviar un mensaje
    socket.on("sendMessage", async (data) => {

      const { remitenteId, receptorId, contenido, fecha, taller } = data; // Desestructura la información del mensaje

      //* Validación para verificar si el remitente está en el taller correcto
      if (activeChats[remitenteId] && activeChats[remitenteId] !== taller) {
        return; // Si el remitente no está en el taller correcto, sale del evento
      }

      //* Guardar el mensaje en Redis
      await redisClient.pushMessage(`chat:${taller}`, { // Guarda el mensaje en Redis
        remitenteId,
        receptorId,
        contenido,
        fecha: fecha || new Date(), // Usar la fecha actual si no se proporciona
      });

      //* Emitir el mensaje a todos los usuarios de la sala
      io.to(taller).emit("receiveMessage", data); // Envía el mensaje a todos en la sala del taller

      //* Cerrar el chat si el contenido es "Estoy satisfecho"
      if (contenido === "Estoy satisfecho") {
        delete activeChats[remitenteId]; // Elimina el chat activo del remitente
        socket.emit("chatClosed", { message: "Tu chat ha sido cerrado." }); // Notifica al usuario que el chat se ha cerrado
      }
    });

    //* Intervalo que verifica mensajes nuevos y los guarda en MongoDB
    const intervalId = setInterval(async () => {
      const taller = userTallerMap[socket.id]; // Obtiene el taller correspondiente al socket
      if (taller) {
        let message; // Variable para almacenar el mensaje obtenido
        //* Obtener mensajes pendientes desde Redis
        while ((message = await redisClient.popMessage(`chat:${taller}`)) !== null) {
          //* Verificar si el mensaje ya existe en el buffer
          const exists = messageBuffer[taller]?.some(
            (msg) =>
              msg.remitenteId === message.remitenteId &&
              msg.receptorId === message.receptorId &&
              msg.contenido === message.contenido &&
              new Date(msg.fecha).getTime() === new Date(message.fecha).getTime()
          );

          //* Si el mensaje no existe en el buffer, agregarlo
          if (!exists) {
            if (!messageBuffer[taller]) {
              messageBuffer[taller] = []; // Inicializa el buffer si no existe
            }
            messageBuffer[taller].push(message); // Agrega el mensaje al buffer
          }
        }

        //* Si hay mensajes en el buffer, guardarlos en MongoDB
        if (messageBuffer[taller] && messageBuffer[taller].length > 0) {
          try {
            for (const msg of messageBuffer[taller]) {
              await Mensajes.saveMessage(msg); // Guarda cada mensaje en MongoDB
            }
            messageBuffer[taller] = []; // Limpiar el buffer después de guardar
          } catch (error) {
            console.error("Error al guardar los mensajes en MongoDB:", error); // Manejo de errores al guardar en MongoDB
          }
        }
      }
    }, 1 * 5 * 1000); // Intervalo de 5 segundos

    //* Evento cuando el cliente se desconecta
    socket.on("disconnect", () => {
      console.log("Cliente desconectado"); // Log de desconexión
      clearInterval(intervalId); // Limpiar el intervalo
      delete userTallerMap[socket.id]; // Elimina el socket del mapa de usuarios
    });
  });
};

module.exports = setupSocket; // Exporta la función de configuración del socket
