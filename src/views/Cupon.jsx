import { useEffect, useState } from 'react'; // Importa useEffect y useState
import PurchaseHistoryButton from '../components/PurchaseHistoryButton';
import Tittle from '../components/Tittle';
import { ViewTitleAndDescription } from '../components/viewTitle&Description';
import CuponTicket from '../components/CuponTicket';
import CouponList from '../components/SeccionCuponList';

function Cupon() {
  const [cupones, setCupones] = useState([]); // Estado para almacenar los cupones
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Obtener el userId desde /session-data
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
        await fetchUserCoupon(data.userId);
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
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
  }, []);


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
