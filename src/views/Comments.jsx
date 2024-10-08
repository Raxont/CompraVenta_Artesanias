import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tittle from '../components/Tittle';
import PurchaseHistoryButton from '../components/PurchaseHistoryButton';

function Comments() {
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(false); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirigir al login

  // Función para obtener el userId desde /session-data
  const fetchUserId = async () => {
    try {
      const response = await fetch('/api/users/session-data', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos de sesión');
      }
      const data = await response.json();
      return data?.userId;
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      return null;
    }
  };

  // useEffect para verificar la sesión del usuario
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userId = await fetchUserId();
        if (!userId) {
          setError(true); // Marca error si no hay sesión
          navigate('/login'); // Redirige al login si no hay sesión
        }
      } catch (error) {
        setError(true); // Si ocurre algún error, marca error
        navigate('/login'); // Redirige al login
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    checkSession();
  }, [navigate]);

  // Mostrar un mensaje de carga o redirigir si hay error o falta de sesión
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Redirigiendo al login...</p>;
  }
  return (
    <div>
        <section className='p--4 h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Comentarios a la App"/>    
        </section>
        <div className="container mx-auto p-4">
        <h2 className="text-2xl mb-4 text-[#9D1A1A] dark:text-dark-bg">Problemas Frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 left-0">
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            La aplicación no carga de manera correcta
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            Errores al querer comprar en la aplicación
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No puedo ver las imágenes de las tiendas y/o artesanías
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No me permite usar un cupón de descuento
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No me deja inscribirme a los talleres
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            El QR interactivo no funciona de manera correcta
            </button>
        </div>
        <div className="mt-4">
            <h3 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">Otro</h3>
            <textarea className="border bg-primary dark:bg-dark-tertiary text-light dark:text-dark-bg text-opacity-80 p-2 w-full" rows="4" placeholder="Describe aquí tu problema..."></textarea>
        </div>
        <div className="flex justify-between mt-4">
            <button className="bg-bg dark:bg-dark-primary text-light font-light py-2 px-4 rounded">
            Adjuntar captura
            </button>
            <button className="bg-bg dark:bg-dark-primary text-light font-light py-2 px-4 rounded">
            Enviar
            </button>
        </div>
        </div>
    </div>
  );
}

export default Comments;