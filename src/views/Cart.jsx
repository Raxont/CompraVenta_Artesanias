import  { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useLoaderData } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import Footer from '../components/Footer';
import SecccionCartCard from '../components/SeccionCartCard';
import { ViewTitleAndDescription } from '../components/viewTitle&Description';
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";

export const cartLoader = async () => {
  try {
    const resUser = await fetch(`/api/users/session-data`, {
      method: 'GET',
      credentials: 'include'
    });
    const dataUser = await resUser.json();
    // Devuelve los datos del usuario al componente
    return { usuario: dataUser };
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export function Cart() {
  const { usuario, error, message} = useLoaderData()
  const { couponCode } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null); // Inicializar como null
  const [userId, setUserId] = useState(null); // Almacena el userId
  const [coupon, setCoupon] = useState(null); // Almacena el cupón del usuario

  const location = useLocation(); // Accede a la ubicación actual
  const cuponCode = location.state?.cuponCode; // Lee el estado enviado con navigate

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
      return data.userId;
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      return null;
    }
  };

  // Función para buscar si hay un cupón asignado para el usuario
  const fetchUserCoupon = async (userId) => { //ESTA FUNCION NO SE UTILIZA AQUI. ESTA OBSOLETA
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
      return data.codigo || null; // Devuelve el cupón si existe
    } catch (error) {
      console.error('Error al obtener el cupón:', error);
      return null;
    }
  };

  // Función para obtener el carrito del usuario
  const getCart = async (userId) => {
    try {
      let res = undefined;
      if (cuponCode){
        res = await fetch(`/api/users/cart/`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            codigo: cuponCode,
            id:userId
          }),
        });
        
      }else {
        res = await fetch(`/api/users/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId
        })

      });
    }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await fetchUserId(); // Obtener el ID del usuario
      if (id) {
        setUserId(id);
        
        // Buscar si hay un cupón para el usuario
        const userCoupon = await fetchUserCoupon(id);
        setCoupon(userCoupon); // Guardar el cupón si existe

        // Obtener el carrito con el cupón
        const dataCart = await getCart(id, userCoupon); 
        setCart(dataCart);
      }
    };
    fetchData();
  }, []);

  const updateCart = async () => {
    if (userId) {
      const dataCart = await getCart(userId);
      setCart(dataCart);
    }
  };

  const handleCouponClick = () => {
    navigate('/cupon'); // Redirige a la página de agregar cupón
  };

  const handleCheckoutClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    setShowModal(false);

    // Crea el objeto a enviar
    const bodyData = {
      "usuarioId": userId, // Usar el userId obtenido de la sesión
      "carrito": cart?.carrito || [],
      "aPagar": cart?.aPagar || {},
      "cuponCode": cuponCode || undefined,
    };
    
    // Realiza la llamada a la API para procesar la compra
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) {
        throw new Error('Error al procesar la compra');
      }

      const data = await response.json();
      // Redirigir a la página de confirmación
      navigate('/confirm');
    } catch (error) {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };


  return (
    <div className="bg-light flex flex-col min-h-screen"> {/* min-h-screen para ocupar toda la altura */}
      {/* Imagen para el modo oscuro */}
      <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-1 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-1 rotate-180 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha Derecha" />
      {/* Imagen para el modo claro */}
      <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-1 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-1 rotate-180 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha Derecha" />
      <SearchBar usuario={usuario.userId} setSearchQuery={setSearchQuery} />
      {!searchQuery && (
        <section className="mt-[6em] flex flex-col items-center justify-center flex-grow overflow-y-auto pb-20 relative"> {/* Agregar padding-bottom */}
         <TrianguloIzquierdo style="h-[3.36rem] top-[9.5rem] left-0 text-primary dark:text-dark-tertiary absolute"/>
         <ViewTitleAndDescription title="Tu carrito de compras" description="Revisa aquí los productos que añadiste a tu carrito" />
          <SecccionCartCard cart={cart || { carrito: [] }} onUpdateCart={updateCart}/>
          <div className="flex flex-col items-center w-full">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded w-5/6"
              onClick={handleCouponClick}
            >
              Añadir cupón de descuento
            </button>
            <div className="mt-4">
              {/* Verificar si cart y cart.aPagar están definidos */}
              {cart && cart.aPagar ? (
                <>
                  <p>Sub total: S/${cart.aPagar.subtotal}</p>
                  <p>Descuento: ${cart.aPagar.descuentoCupon}</p>
                  <p>Gastos de envío: S/${cart.aPagar.totalEnvio}</p>
                  <p>Total: S/${cart.aPagar.total}</p>
                </>
              ) : (
                <p>Cargando información del carrito...</p>
              )}
            </div>
            <div className="mt-4"> {/* Separar el botón */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCheckoutClick}
              >
                Realizar compra
              </button>
            </div>
          </div>
        </section>
      )}
      <Footer />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div className="bg-white rounded-lg p-8">
            <p>¿Seguro de realizar la compra?</p>
            <div className="flex flex-col mt-4 gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleModalConfirm}
              >
                Sí
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleModalCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}