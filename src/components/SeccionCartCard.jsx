import { useEffect, useState } from 'react';
import CartCard from './CartCard';

const SecccionCartCard = ({ cart, onUpdateCart }) => {
  const [datos, setDatos] = useState([]);
  const [userId, setUserId] = useState(null); // Para almacenar el userId
  
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
      return data.userId; // Asumiendo que 'userId' está en la respuesta
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      return null; // Retorna null en caso de error
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const id = await fetchUserId();
      setUserId(id); // Guarda el userId en el estado
    };

    getUserId(); // Llama a la función para obtener el userId

    if (cart && Array.isArray(cart.carrito)) {
      setDatos(cart.carrito.filter(product => product.cantidad > 0)); // Filtrar productos con cantidad mayor a 0
    } else {
      setDatos([]); // Si `cart.carrito` no es un array, inicializamos como vacío
    }
  }, [cart]);

  const handleIncrease = async (index) => {
    const newDatos = [...datos]; // Copia del array de productos
    newDatos[index].cantidad += 1; // Aumenta la cantidad del producto en el índice dado

    // Actualiza la base de datos
    const bodyData = {
      usuarioId: userId,
      productoId: newDatos[index].productoId,
      cantidad: newDatos[index].cantidad
    };

    try {
      const response = await fetch('/api/users/cart/increase', {
        method: 'PUT', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Error al aumentar la cantidad del producto');
      }

      // setDatos(newDatos); // Actualiza el estado solo si la petición es exitosa
      onUpdateCart()
    } catch (error) {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  };

  const handleDecrease = async (index) => {
    const newDatos = [...datos];
    // Disminuir la cantidad siempre
    newDatos[index].cantidad -= 1; 

    // Actualiza la base de datos
    const bodyData = {
        usuarioId: userId,
        productoId: newDatos[index].productoId,
        cantidad: newDatos[index].cantidad
    };

    try {
        // Si la cantidad es 0, eliminar el producto
        if (newDatos[index].cantidad <= 0) {
            await handleRemove(index); // Llama a la función para eliminar el producto
        } else {
            const response = await fetch('/api/users/cart/decrease', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Error al disminuir la cantidad del producto');
            }

            // setDatos(newDatos); // Actualiza el estado solo si la petición es exitosa
            onUpdateCart()
        }
    } catch (error) {
        console.error('Error:', error);
        // Puedes mostrar un mensaje de error al usuario aquí
    }
  };

  const handleRemove = async (index) => {
    if (!userId) {
      console.error('User ID no disponible');
      return; // Salir si no hay userId
    }

    const bodyData = {
      "usuarioId": userId, // Usa el userId del estado
      "productoId": datos[index].productoId, // Asegúrate de que `productoId` exista en `datos`
    };
    
    // Realiza la llamada a la API para eliminar el producto
    try {
      const response = await fetch('/api/users/cart', {
        method: 'DELETE',
        credentials: 'include', // Añade esto si necesitas enviar cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      const data = await response.json();
      console.log('Producto eliminado:', data); // Maneja la respuesta de la API

      // Actualiza la lista de productos después de la eliminación
      // setDatos((prevDatos) => prevDatos.filter((_, i) => i !== index));
      onUpdateCart()

    } catch (error) {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  };

  if (!cart || !cart.carrito) {
    return <p>Cargando o no hay productos en el carrito...</p>;
  }

  return (
    <div className="p-6">
      {datos.length > 0 ? (
        datos.map((product, index) => (
          <CartCard
            key={product.productoId} // Usar productoId como key para mayor eficiencia
            product={{
              ...product, // Pasa todo el objeto del producto
              totalPrecio: product.precio * product.cantidad, // Calculo del total para este producto
            }}
            onIncrease={() => handleIncrease(index)}
            onDecrease={() => handleDecrease(index)}
            onRemove={() => handleRemove(index)}
          />
        ))
      ) : (
        <p className='text-[#9D1A1A] dark:text-dark-bg'>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default SecccionCartCard;