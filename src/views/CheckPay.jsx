import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Para los enlaces internos

function CheckPay() {
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* Ícono de verificación */}
        <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24">
          
          <rect
            x="15" y="15" width="70" height="70"
            stroke="black" fill="none"
            strokeWidth="2" transform="rotate(45 50 50)"
          />
          
          
          <path
            d="M35 50 L45 60 L65 40"
            stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"
          />
        </svg>

        </div>

        {/* Mensaje principal */}
        <h1 className="text-2xl font-bold mb-2">¡Compra realizada con éxito!</h1>
        <div className="flex justify-center">
          <img src="/triangulo.svg" alt="" className='w-1/2'/>
        </div>
        {/* Texto de agradecimiento */}
        <p className="text-gray-600 mb-4">
          Gracias por apoyar a los artesanos peruanos. Puedes revisar tu compra en la opción de
        </p>

        {/* Botón de compras */}
        <Link
          to="/compras"
          className="bg-gray-300 text-black py-2 px-4 rounded mb-4 inline-block"
        >
          Compras
        </Link>
        
        <div className="flex justify-center">
          <img src="/triangulo.svg" alt="" className='w-1/2'/>
        </div>
        {/* Texto adicional */}
        <p className="text-gray-600 mb-2">
          Vincula tu correo para recibir más detalles sobre tus compras realizadas
        </p>
      
        {/* Input de correo */}
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Añadir correo electrónico"
            className="w-5/6 p-2 border border-gray-400 rounded mb-4"
          />
        </div>
        

        {/* Botón de regreso */}
        <Link
          to="/home"
          className="bg-gray-800 text-white py-2 px-6 rounded"
        >
          Regresar al inicio
        </Link>
      </div>
    </div>
  );
}

export default CheckPay;
