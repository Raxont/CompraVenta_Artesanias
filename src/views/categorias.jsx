import { useLoaderData,useNavigate } from "react-router-dom"
import { CategoriesCarousel } from "../components/categoriesCarousel"
import { ProductoCard } from "../components/productoCard"
import { SearchProducts } from "../components/searchProducts"
import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useState,useEffect } from 'react';

export const categoriasLoader = async ({params}) => {
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

        let res = await fetch(`/api/products/category/${encodeURIComponent(params.categoria)}`);
        if (!res.ok) {
            throw new Error('No se encontraron productos');
        }
        const data = await res.json();
        return { productos: data, usuario: dataUser };
    } catch (err) {
        return { error: true, message: err.message };
    }
}

export function Categorias () {
    const {productos, usuario, error} = useLoaderData()
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
            <section className='h-[10.2vh] w-[100vw] mb-5'>
                <PurchaseHistoryButton/>
                <Tittle tittle="Categorías"/>    
            </section>
            <CategoriesCarousel/>
            <hr className="w-[100vw] h-1 bg-bg dark:bg-dark-bg"/>
            <main className="h-[79.35vh] w-[100vw] px-[7%] pt-[5%] flex flex-col justify-between">
                <SearchProducts  usuario={usuario.userId} setSearchQuery={setSearchQuery}/>
                <div className="h-[69.15vh] px-3 pt-2 flex flex-wrap gap-y-[4%] gap-x-[8%] justify-center overflow-y-scroll">
                    {productos.map((producto) => {
                        return <ProductoCard key={producto._id} userId={usuario.userId} productId={producto._id} name={producto.nombre} workshopName={producto.taller_nombre} price={producto.precio} img={producto.fotos[0]} discount={producto.descuento} promotion={producto.promocion} shipment={producto.envio}/>
                    })}
                </div>
            </main>
        </>
    )
}