import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CuponTicket = () => {
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();
  const handleValidate = async () => {
    if (coupon === '') {
      alert('Debes ingresar un cupón');
      return;
    }

    // Realiza la llamada a la API para procesar la compra
    try {
      const response = await fetch(`http://localhost:3001/users/cart/${"650f4c29a5f1bc1234567892"}/${coupon}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al procesar la compra');
      }
      alert(`Cupón ingresado: ${coupon}`);
      // Redirigir a la página de confirmación
      navigate('/cart', { state: { coupon } });
    } catch (error) {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }

    
  };

  return (
    <div className="flex items-center bg-gray-300 p-1 rounded-md" style={{ width: '350px', height: '40px' }}>
      <img src="/Descuento.svg" alt="Icono de descuento" className="w-6 h-6 mr-2" />
      <input
        type="text"
        placeholder="Ingresa tu cupón"
        className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        className="bg-gray-800 text-white px-3 py-1 rounded-md"
        onClick={handleValidate}
      >
        Validar
      </button>
    </div>
  );
};

export default CuponTicket;
