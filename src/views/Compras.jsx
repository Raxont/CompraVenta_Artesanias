import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import PurchaseHistoryButton from '../components/PurchaseHistoryButton';
import Tittle from '../components/Tittle';
import ProductCard from "../components/ProductCard";

const Compras = () => {
  const [product, setProduct] = useState([]); // Estado para almacenar productos
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

  // Función para obtener los productos de compras del usuario
  const getProduct = async () => {
    try {
      const userId = await fetchUserId();
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      const res = await fetch(`/api/requests/user/${userId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return null;
    }
  };

  // useEffect para obtener los datos y redirigir si no hay sesión
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCard = await getProduct();
        if (!dataCard) {
          setError(true); // Si no hay productos, marca error
          navigate('/login'); // Redirige al login si no hay sesión o error
        } else {
          setProduct(dataCard); // Guarda los productos si todo va bien
        }
      } catch (error) {
        setError(true); // Si ocurre algún error, marca error y redirige
        navigate('/login');
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchData();
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
            <Tittle tittle="Compras Realizadas"/>    
        </section>
        <div className="p-4 mx-auto space-y-6">
            <ProductCard arrive={product || []}/>
        </div>
    </div>
  );
};

export default Compras;