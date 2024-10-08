import { useLoaderData, useNavigate } from "react-router-dom";
import { FilterIcon } from "../assets/filterIcon.jsx";
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { TiendaCard } from "../components/tiendaCard";
import { ViewTitleAndDescription } from "../components/viewTitle&Description";
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";
import { useState, useEffect } from 'react';

export const tiendasLoader = async() => {
    try {
        const resUser = await fetch(`/api/users/session-data`, {
            method: 'GET',
            credentials: 'include'
        });
        const dataUser = await resUser.json();
        if (!resUser.ok || !dataUser.userId) {
            // Si la respuesta no es OK o no hay ID de usuario, devolver un error
            throw new Error("No session data");
        }
        let res = await fetch(`/api/workshops`);
        let data = await res.json();
        if (!res.ok) {
            throw new Error("No se encontraron tiendas");
        }
        return { usuario: dataUser, tiendas: data }
    } catch (err) {
      return { error: true, message: err.message };
    }
}

export function Tiendas () {
    const  { tiendas, usuario, error} = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

     // Usamos useEffect para verificar el estado de la sesión y redirigir si es necesario
    useEffect(() => {
        if (error || !usuario?.userId) {
        // Si hay un error o no hay datos de usuario, redirigir al login
        navigate("/login");
        }
    }, [usuario, error, navigate]);

    // Si aún no tenemos los datos del usuario, puedes mostrar un loader o algún mensaje
    if (error || !usuario?.userId) {
        return <p>Loading...</p>; // O puedes mostrar un mensaje de redirección
    }

    return (
        <>  
            {/* Imagen para el modo oscuro */}
            
            <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-10 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-10 rotate-180 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha Derecha" />
            {/* Imagen para el modo claro */}
            <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-10 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-10 rotate-180 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha Derecha" />
            <div className='w-[100vw] h-[4.5em]'>
                <SearchBar usuario={usuario.userId} setSearchQuery={setSearchQuery}/>
            </div>
            {!searchQuery && (
            <main className="h-[81vh] w-[100vw] px-[7%] pt-[5%] flex flex-col justify-between">
                <div className="h-[8%] flex justify-between items-center relative">
                    <TrianguloIzquierdo style="h-[100%] top-[-0.7rem] left-[-2rem] text-primary dark:text-dark-tertiary absolute"/>
                    <ViewTitleAndDescription title="Talleres y tiendas artesanales" description="Tiendas de artesanías de todas partes del Perú"/>
                    <FilterIcon style={"h-[90%] text-secondary dark:text-dark-bg"} />

                </div>
                <div className="h-[88%] flex flex-wrap gap-y-[4%] gap-x-[8%] justify-center overflow-y-scroll">
                    {tiendas.map((tienda, index) => {
                        return <TiendaCard id={tienda._id} name={tienda.nombre} city={tienda.ciudad} img={tienda.fotos[0]}/>
                    })}
                </div>
            </main>
            )}
            <Footer/>
        </>
    )
}