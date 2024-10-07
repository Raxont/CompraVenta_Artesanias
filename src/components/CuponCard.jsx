import { useNavigate } from 'react-router-dom';


const CouponCard = ({ arrive }) => {
  const navigate = useNavigate(); // Crea la instancia del hook
  const { descuento, codigo, fechaExpiracion } = arrive;
  // Obtener el userId desde /session-data
  const fetchUserId = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/session-data', {
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
      return data.userId;
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      return null;
    }
  };
  // Convertir la fecha a formato "Año-Mes-Día"
  const formattedDate = new Date(fechaExpiracion).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Función para buscar si hay un cupón asignado para el usuario
  const fetchUserCoupon = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/coupons/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener el cupón del usuario');
      }
      const data = await response.json();
      return data.codigo || null; // Devuelve el cupón si existe
    } catch (error) {
      console.error('Error al obtener el cupón:', error);
      return null;
    }
  };

  const handledUseCupon = async (cuponCode)=>{
    navigate('/cart', { state: { cuponCode } });
  }

  // Convertir el descuento de decimal a porcentaje
  const formattedDiscount = `${(descuento * 100).toFixed(0)}%`;

  return (
    <div className="flex bg-gray-200 rounded-lg overflow-hidden shadow-md w-[100%] items-center mx-auto">
      <img src="/imagen.svg" alt="Producto" className="w-24 h-24 object-cover" />
      <div className="p-3 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {formattedDiscount} de descuento
          </p>
          <p className="text-sm text-gray-500">Codigo: {codigo}</p>
          <p className="text-sm text-gray-500">Fecha de vencimiento: {formattedDate}</p>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm mt-2" onClick={()=>handledUseCupon(codigo)}>
          Usar cupón
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
