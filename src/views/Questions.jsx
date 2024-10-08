import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import CardQuestions from '../components/CardQuestions';
import { StoreChatIcon } from "../components/storeChatIcon";
import { CallIcon } from "../assets/call"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PreguntasFrecuentes() {
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
      console.log("🚀 ~ fetchUserId ~ data:", data)
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
        console.log("🚀 ~ checkSession ~ userId:", userId)
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
        <section className='h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Ajustes"/>    
        </section>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4 text-[#9D1A1A] dark:text-dark-bg">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 gap-4"> 
            <CardQuestions info="¿Cómo compro en la app?"/>
                <CardQuestions info="¿Cómo me inscribo en un taller?"/>
                <CardQuestions info="¿Cómo escaneo el QR interactivo?"/>
                <CardQuestions info="¿Cómo cambio la moneda en la app?"/>
                <CardQuestions info="¿Cómo reporto un problema?"/>
            </div>
            <div className="mt-14 flex flex-col gap-4">
                <h3 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">¿Necesitas atención personalizada? habla <br />con nuestro equipo de soporte</h3>
                <button className="flex flex-row gap-6 text-center bg-primary dark:bg-dark-tertiary hover:bg-gray-300 py-2 px-4 rounded w-full h-[60px]">
                    <StoreChatIcon style="h-[90%] text-light"/>
                    <p className="font-light text-light dark:text-dark-bg">
                        Empieza un chat
                    </p>
                </button>
                <button className="flex flex-row gap-6 text-center bg-primary dark:bg-dark-tertiary hover:bg-gray-300 py-2 px-4 rounded w-full h-[60px]">
                    <CallIcon style="h-[90%] text-light"/>
                    <p className="font-light text-light dark:text-dark-bg">
                        Programa una llamada
                    </p>
                </button>
            </div>
        </div>
    </div>
  );
}

export default PreguntasFrecuentes;