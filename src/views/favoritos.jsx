import { CategoriesCarousel } from "../components/categoriesCarousel"
import { ProductoCard } from "../components/productoCard"
import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useLoaderData,useNavigate } from "react-router-dom"
import { useEffect } from 'react';

export const favoritosLoader = async ({params}) => {
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
        const resProducts = await fetch(`/api/products/favourites/${dataUser.userId}/${encodeURIComponent(params.categoria)}`);
        if (!resProducts.ok) {
            throw new Error('No se encontraron productos');
        }
        const dataProducts = await resProducts.json();
        return { productos: dataProducts, usuario: dataUser };
    } catch (err) {
        return { error: true, message: err.message };
    }
}

export function Favoritos () {
    const { productos, usuario, error, message } = useLoaderData()
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
                <Tittle tittle="Tus artesanías favoritas"/>    
            </section>
            <CategoriesCarousel/>
            <hr className="w-[100vw] h-1 bg-dark-bg"/>
            <main className="h-[76vh] w-[100vw] px-[7%] pt-[5%] flex flex-col justify-between overflow-x-visible ">
                <div className="h-[100%] px-3 pt-2 flex flex-wrap gap-y-[4%] gap-x-[8%] justify-center overflow-y-scroll overflow-x-visible">
                    {error ? (<p>{message || "No hay productos favoritos"}</p>) : productos.map((producto) => (
                        (<ProductoCard key={producto._id} userId={usuario.userId} productId={producto._id} name={producto.nombre} workshopName={producto.taller_nombre} price={producto.precio} img={producto.fotos[0]} discount={producto.descuento} promotion={producto.promocion} shipment={producto.envio}/>)
                    ))}
                </div>
            </main>
        </>
    )
}