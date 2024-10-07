import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useState } from 'react';
import { ProductoCard } from "../components/productoCard";
import { ViewTitleAndDescription } from "../components/viewTitle&Description";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";

export const descuentosLoader = async ({ params }) => {
  try {
    const resUser = await fetch(`/api/users/session-data`, {
      method: 'GET',
      credentials: 'include'
  });
  const dataUser = await resUser.json();
    const res = await fetch(`/api/products/discounts/${params.categoria}`);
    if (!res.ok) {
      throw new Error("No se encontraron productos");
    }
    const data = await res.json();
    return { productos: data, usuario: dataUser };
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export function Descuentos() {
  const { productos, usuario, error, message } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const currentPath = location.pathname;

  // Modificación del path sin agregar ID del usuario
  const newPath = currentPath.split("/").slice(0, -1).join("/");

  const categories = [
    { nombre: "Textileria" },
    { nombre: "Bordado" },
    { nombre: "Ceramica" },
    { nombre: "Joyeria" },
    { nombre: "Orfebreria" },
    { nombre: "Hojalateria" },
    { nombre: "Talla en Piedra" },
    { nombre: "Estampado" },
    { nombre: "Talla en Madera" },
    { nombre: "Pintura Tradicional" },
  ];

  return (
    <>
      {/* Imagen para el modo oscuro */}
      <img
        className="fixed bottom-[5rem] left-0 w-[13rem] -z-10 hidden dark:block"
        src="../../../Rectangle 47.svg"
        alt="Background flecha izquierda"
      />
      <img
        className="fixed top-[5rem] right-0 w-[13rem] -z-10 rotate-180 hidden dark:block"
        src="../../../Rectangle 47.svg"
        alt="Background flecha Derecha"
      />
      {/* Imagen para el modo claro */}
      <img
        className="fixed bottom-[5rem] left-0 w-[13rem] -z-10 block dark:hidden"
        src="../../../Rectangle 47-color.svg"
        alt="Background flecha izquierda"
      />
      <img
        className="fixed top-[5rem] right-0 w-[13rem] -z-10 rotate-180 block dark:hidden"
        src="../../../Rectangle 47-color.svg"
        alt="Background flecha Derecha"
      />

      <div className="w-[100vw] h-[4.5em]">
        <SearchBar usuario={usuario.userId} setSearchQuery={setSearchQuery} />
      </div>
      {!searchQuery && (
        <>
          <div className="h-[12vh] px-[7%] py-[5%] w-[100vw] flex justify-start items-center relative">
            <TrianguloIzquierdo style="h-[55%] top-3 left-0 text-primary dark:text-dark-tertiary absolute"/>
            <ViewTitleAndDescription
              title="Descuentos y promociones"
              description="En cientos de artesanías"
            />
          </div>
    
          <div className="w-[100vw] h-[4.7vh] bg-primary dark:bg-dark-tertiary flex overflow-scroll border-b-4 border-bg dark:border-dark-bg">
            {categories.map((categorie, index) => {
              return (
                <Link
                  key={index}
                  to={`${newPath}/${categorie.nombre}`}
                  className={`h-[100%] flex justify-center items-center text-center px-5 whitespace-nowrap ${
                    currentPath.includes(encodeURIComponent(categorie.nombre))
                      ? "bg-bg dark:bg-dark-bg text-dark-light"
                      : "bg-transparent text-light dark:text-dark-bg"
                  }`}
                >
                  <p>{categorie.nombre}</p>
                </Link>
              );
            })}
          </div>
    
          <main className="h-[64.3vh] w-[100vw] px-[7%] pt-[3%] flex flex-col justify-between">
            <div className="h-[100%] px-3 pt-2 flex flex-wrap gap-y-[4%] gap-x-[8%] justify-center overflow-y-scroll overflow-x-visible">
              {error ? (
                <p>{message || "No hay productos con descuento"}</p>
              ) : (
                productos.map((producto, index) => {
                  return (
                    <ProductoCard
                      key={index}
                      productId={producto._id}
                      name={producto.nombre}
                      workshopName={producto.taller_nombre}
                      price={producto.precio}
                      img={producto.fotos[0]}
                      discount={producto.descuento}
                      promotion={producto.promocion}
                      shipment={producto.envio}
                    />
                  );
                })
              )}
            </div>
          </main>
    
          <Footer />
        </>
      )}
    </>
  );
}
