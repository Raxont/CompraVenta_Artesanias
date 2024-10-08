import { useEffect, useState } from 'react'; // Importa useEffect y useState
import PurchaseHistoryButton from '../components/PurchaseHistoryButton';
import Tittle from '../components/Tittle';
import { ViewTitleAndDescription } from '../components/viewTitle&Description';
import CuponTicket from '../components/CuponTicket';
import CouponList from '../components/SeccionCuponList';
import { useNavigate } from "react-router-dom"


function Cupon() {
  const [cupones, setCupones] = useState([]); // Estado para almacenar los cupones
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(false); // Estado para manejar errores
  const navigate = useNavigate();


  useEffect(() => {
    // Obtener el userId desde /session-data
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/users/session-data', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok || !data.userId) {
          // Si no hay sesión o error en la respuesta, lanzar un error
          throw new Error("No session data");
        }
        // Si el usuario tiene sesión, buscar los cupones asignados
        await fetchUserCoupon(data.userId);
      } catch (error) {
        console.error('Error al obtener el ID del usuario o los cupones:', error);
        setError(true); // Marca el estado de error
        navigate("/login"); // Redirigir al login si no hay sesión
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    // Función para buscar si hay un cupón asignado para el usuario
    const fetchUserCoupon = async (userId) => {
      try {
        const response = await fetch(`/api/coupons/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el cupón del usuario');
        }
        const data = await response.json();
        
        setCupones(data);
      } catch (error) {
        console.error('Error al obtener el cupón:', error);
      } finally {
        setLoading(false); // Actualiza loading a false después de obtener los cupones
      }
    };

    fetchUserId();
  }, [navigate]);

  // Mostrar un mensaje de carga o redirigir si hay error o falta de sesión
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Redirigiendo al login...</p>;
  }

  return (
    <div className="flex flex-col">
      <section className='h-[9em]'>
        <PurchaseHistoryButton />
        <Tittle tittle="Canjear Cupon" />
      </section>
      <section className='flex flex-col items-center gap-4'>
        <ViewTitleAndDescription title="¿Cuentas con algún cupón de descuento? Canjealo aquí" className="pt-4" />
        <CuponTicket />
      </section>
      <section className="flex flex-col items-center gap-4 mt-14">
        <ViewTitleAndDescription title="Cupones vigentes" description="*Usar antes de la fecha de vencimiento" />
        {loading ? ( // Muestra un mensaje de carga mientras se obtienen los cupones
          <p>Cargando cupones...</p>
        ) : (
          <CouponList arrive={cupones} /> // Pasa los cupones al componente CouponList
        )}
      </section>
    </div>
  );
}

export default Cupon;
