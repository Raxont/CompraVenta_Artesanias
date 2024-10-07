import { useLoaderData } from "react-router-dom";
import { TrianguloIzquierdo } from "../assets/trianguloIzquierdo";
import { CheckIcon } from "../assets/checkIcon"
import { CartIcon } from "../assets/cart.jsx";
import { FavIcon } from "../components/favIcon";
import { useEffect, useState } from "react";
import { DescuentoComponent } from "../components/descuentoComponent";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton";

// Loader para obtener datos del producto y usuario
export const productoLoader = async ({ params }) => {
    try {
      // Obtener el ID del usuario desde /session-data
      const fetchUserId = async () => {
        try {
          const response = await fetch('http://localhost:3001/users/session-data', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (response.ok) {
            const data = await response.json();
            return data.userId; // Retorna el userId desde la sesión
          } else {
            console.error('No estás autenticado');
            return null;
          }
        } catch (error) {
          console.error('Error al obtener el ID del usuario:', error);
          return null;
        }
      };
  
      // Obtener los datos completos del usuario
      const fetchUserData = async (userId) => {
        try {
          const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            return data; // Retorna los datos completos del usuario
          } else {
            console.error('Error al obtener la información del usuario');
            return null;
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
          return null;
        }
      };
  
      // Llamada a la API para obtener el ID del usuario
      const userId = await fetchUserId();
  
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }
  
      // Obtener los datos completos del usuario
      const userData = await fetchUserData(userId);
  
      // Llamada para obtener los detalles del producto
      const resProduct = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/products/${params.productId}`);
      const dataProduct = await resProduct.json();
  
      // Devuelve los datos del producto y del usuario al componente
      return { producto: dataProduct, usuario: userData };
    } catch (err) {
      return { error: true, message: err.message };
    }
  };

export function Producto() {
  const { producto, usuario, error, message } = useLoaderData();

  const [isFav, setIsFav] = useState(usuario?.favoritos?.length > 0 ? usuario.favoritos.includes(producto._id) : false);
  const [change, setChange] = useState("Favourite");

  useEffect(() => {
    if (isFav) setChange("removeFavourite");
    else setChange("addFavourite");
  }, [isFav]);
  console.log(isFav)

  const editFavourites = async (userId, productId) => {
    try {
      const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/${change}/${userId}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error('No se editó el usuario');
      }
      let data = res.json();
      setIsFav(!isFav);
      return data;
    } catch (err) {
      return { error: true, message: err.message };
    }
  };

  const addToCart = async (userId, productId) => {
    try {
      const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/addToCart/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId })
      });
  
      if (!res.ok) {
        throw new Error('Error al agregar al carrito');
      }
  
      const data = await res.json();
      alert(data.message);
      return data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (error) {
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <PurchaseHistoryButton client="load"/>
      <div className="w-[100vw] h-[42.5vh] relative">
        <img src={producto.fotos[0]} alt="" className="w-full h-full object-cover" />
        {producto.descuento > 0 ? (
          <DescuentoComponent
            style="absolute bottom-0 z-10 left-0 text-white text-xs font-bold px-2 py-1 h-[12vh] text-wrap"
            xNumber="70"
            yNumber="160"
            gStyle="text-[#9D1A1A] dark:text-dark-primary"
            text={`-${producto.descuento}%`}
            text2=""
          />
        ) : ("")}
        {producto.promocion !== "1x1" ? (
          <DescuentoComponent
            style="absolute bottom-0 z-10 left-0 text-white text-xs font-bold px-2 py-1 h-[12vh] text-wrap"
            xNumber="100"
            yNumber="160"
            gStyle="text-[#9D1A1A] dark:text-dark-primary"
            text={`${producto.promocion}`}
            text2=""
          />
        ) : ("")}
        {producto.envio == 0 ? (
          <DescuentoComponent
            style="absolute bottom-0 z-10 left-0 text-white text-xs font-bold px-2 py-1 h-[12vh] text-wrap"
            xNumber="70"
            yNumber="130"
            gStyle="text-[#9D1A1A] dark:text-dark-primary"
            text={"Envío"}
            text2={"gratis"}
          />
        ) : ("")}
      </div>
      <div className="w-[100vw] h-[5.8vh] bg-bg dark:bg-dark-primary flex items-center">
        <TrianguloIzquierdo style="h-[100%] text-primary dark:text-dark-tertiary" />
        <h2 className="text-lg ml-2 text-dark-light">{producto.nombre}</h2>
      </div>
      <main className="w-[100vw] h-[51.7vh] px-[6%] py-[3%] flex flex-col text-[1.2rem] relative">
        <FavIcon color={isFav} setColor={() => editFavourites(usuario.id, producto._id)} />
        <div className="h-[55%] flex flex-col justify-around">
          <p className="text-[#9D1A1A] dark:text-dark-bg">
            {producto.descuento === 0 ? (`$/.${producto.precio}`) : (
              <>
                <del>$/.{producto.precio}</del> $/.{(producto.precio - (producto.precio * producto.descuento) / 100).toFixed(2)}
              </>
            )}
          </p>
          <p className="text-[#9D1A1A] dark:text-dark-bg">{producto.taller_nombre}</p>
          <p className="text-[#9D1A1A] dark:text-dark-bg">Dimensiones: <span className="font-light text-dark-bg">{`${producto.largo} x ${producto.ancho} cm`}</span></p>
          <p className="text-[#9D1A1A] dark:text-dark-bg">Descripción: <span className="font-light text-dark-bg">{producto.descripcion}</span></p>
        </div>
        <div className="h-[15vh] mt-3 flex flex-col justify-evenly">
          <div className="h-[5vh] flex items-center">
            <CheckIcon style="h-[60%] text-secondary dark:text-dark-bg" />
            <p className="font-light ml-2">Cuenta con envío hacia tu ubicación</p>
          </div>
          <div 
            className="w-[79%] bg-primary dark:bg-dark-tertiary rounded-md mt-2 h-[5vh] flex items-center justify-between px-2 cursor-pointer"
            onClick={() => addToCart(usuario.id, producto._id)} // Llama a la función al hacer clic
          >
            <CartIcon style="h-[70%] text-light dark:text-dark-bg" />
            <p className="font-light text-light dark:text-dark-bg">Añadir a mi carrito de compras</p>
          </div>
        </div>
      </main>
    </>
  );
}
