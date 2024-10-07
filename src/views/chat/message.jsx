import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import io from 'socket.io-client';
import { initTheme } from '../../tools/theme'; 
import PurchaseHistoryButtonChat from "../../components/PurchaseHistoryButton-chat";

const socket = io('http://localhost:3001');

export function Chat() {
  initTheme();
  const { receptorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId] = useState(`user_${Math.floor(Math.random() * 10000)}`); // Generar un nuevo userId cada vez
  const [taller, setTaller] = useState('');

  useEffect(() => {
    const fetchTaller = async () => {
      try {
        const response = await fetch(`/api/workshops/${receptorId}`);
        if (!response.ok) throw new Error('Error al obtener el taller');
        const data = await response.json();
        setTaller(data.nombre);
      } catch (error) {
        console.error('Error al obtener el nombre del taller:', error);
      }
    };

    if (receptorId) {
      fetchTaller();
    }
  }, [receptorId]);

  useEffect(() => {
    // Emitir joinRoom cuando userId y taller estén disponibles
    if (userId && taller) {
      socket.emit('joinRoom', { userId, taller });

      socket.on('loadPreviousMessages', (previousMessages) => {
        setMessages(previousMessages);
      });

      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);

        // Cerrar la sesión si se recibe el mensaje "Estoy satisfecho"
        if (message.contenido === "Estoy satisfecho" && message.remitenteId !== userId) {
          socket.emit('leaveRoom', { userId, taller });
        }
      });

      return () => {
        socket.off('loadPreviousMessages');
        socket.off('receiveMessage');
        socket.emit('leaveRoom', { userId, taller });
      };
    }
  }, [userId, taller]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        remitenteId: userId,
        receptorId: receptorId,
        contenido: newMessage,
        fecha: new Date(),
        taller: taller,
      };

      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container flex flex-col min-h-screen bg-dark-secondary text-black">
      {/* Header */}
      <PurchaseHistoryButtonChat />
      <header className="bg-primary dark:bg-dark-quintier text-light dark:text-dark-bg pl-[4rem] flex items-center justify-center gap-4 h-[11vh] text-xl">
        <box-icon name="chat" className="fill-current" size="lg"></box-icon>
        <span className='w-[70%]'>Chat con {taller}</span>
      </header>

      {/* Main: Mensajes */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 rounded-md w-[70%] max-w-md ${
              msg.remitenteId === userId 
                ? 'bg-primary dark:bg-dark-quintier dark:text-dark-bg bg-light-bg text-dark-bg self-end ml-auto'
                : 'bg-red-800 dark:bg-dark-primary dark:text-dark-light text-cuatertiary self-start mr-auto'
            }`}
          >
            <p>{msg.contenido}</p>
            <span className={`text-xs ${
              msg.remitenteId === userId 
                ? 'dark:text-bg'
                : 'dark:text-light'
            }`}>
              {new Date(msg.fecha).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </main>

      {/* Footer: Input para escribir mensaje */}
      <footer className="p-4 flex items-center h-full">
        <div className="relative w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Mandar mensaje a ${taller}`}
            className="w-full border-0 rounded-md py-2 px-4 pr-12 text-black bg-primary dark:bg-dark-quintier h-12"
          />
          <button
            onClick={sendMessage}
            className="absolute -right-3 top-[57%] transform -translate-y-1/2 bg-transparent rounded-full border-0 text-white dark:text-dark-bg"
          >
            <box-icon name="send" className="fill-current" size="md"></box-icon>
          </button>
        </div>
      </footer>
    </div>
  );
}
