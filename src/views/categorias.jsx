import { useLoaderData } from "react-router-dom"
import { CategoriesCarousel } from "../components/categoriesCarousel"
import { ProductoCard } from "../components/productoCard"
import { SearchProducts } from "../components/searchProducts"
import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useState } from 'react';

export const categoriasLoader = async ({params}) => {
    try {
        const resUser = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/session-data`, {
            method: 'GET',
            credentials: 'include'
        });
        const dataUser = await resUser.json();
        let res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/products/category/${encodeURIComponent(params.categoria)}`);
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
    const {productos, usuario, error, message} = useLoaderData()
    const [searchQuery, setSearchQuery] = useState('');
    console.log(productos)
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