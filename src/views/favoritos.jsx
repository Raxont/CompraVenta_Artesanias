import { CategoriesCarousel } from "../components/categoriesCarousel"
import { ProductoCard } from "../components/productoCard"
import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useLoaderData } from "react-router-dom"

export const favoritosLoader = async ({params}) => {
    try {
        const resUser = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/session-data`, {
            method: 'GET',
            credentials: 'include'
        });
        const dataUser = await resUser.json();
        const resProducts = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/products/favourites/${dataUser.userId}/${encodeURIComponent(params.categoria)}`);
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