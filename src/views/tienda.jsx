import { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { TrianguloDerecho } from "../assets/trianguloDerecho.jsx";
import { TrianguloIzquierdo } from "../assets/trianguloIzquierdo.jsx";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton-chat";
import Tittle from "../components/Tittle";
import { ProductoCard } from "../components/productoCard";
import { SearchProducts } from "../components/searchProducts";
import { StoreChatIcon } from "../components/storeChatIcon";

export const tiendaLoader = async ({params}) => {
    try {
        const resUser = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/session-data`, {
            method: 'GET',
            credentials: 'include'
        });
        const dataUser = await resUser.json();
        let resProducts = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/workshops/products/${params.id}`);
        let dataProducts = await resProducts.json();
        return {productos: dataProducts, usuario: dataUser}
    } catch(err) {
        return { error: true, message: err.message };
    }
}
export function Tienda () {
    const {productos, usuario, error, message} = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div className="w-[100vw]">
                <PurchaseHistoryButton/>
            </div>
            <div className="w-[100%] h-[4%] top-0 absolute flex justify-center">
                <div className="w-[45%] h-[100%] bg-primary dark:bg-dark-primary rounded-b-lg text-dark-light text-base flex items-center justify-center">
                    {productos[0].nombre}
                </div>
                </div>
            <div className="w-[100vw] h-[31.7vh] overflow-hidden">
                <img src={productos[0].fotos[0]} alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="w-[100vw] h-[7.8vh] bg-bg dark:bg-dark-primary flex items-center">
                <TrianguloIzquierdo style="h-[60%] text-primary dark:text-dark-tertiary" />
                <Link to={`/historiaTaller/${productos[0]._id}`} className="text-lg flex-grow text-dark-light underline text-center">Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles</Link>
                <TrianguloDerecho style="h-[60%] text-primary dark:text-dark-tertiary" />
            </div>
            <div className="w-[100vw] h-[10.2vh] mb-5 relative">
                <Tittle tittle="Artesanías"/>
                {productos.map((producto, index) => {
                    return<Link to={`/chat/${producto.producto_taller}`} >
                    <StoreChatIcon style="h-[55%] absolute right-2 bottom-2.5 text-secondary dark:text-dark-bg"/>
                    </Link>
                })} 
            </div>
            <main className="h-[50.3vh] w-[100vw] px-[7%] flex flex-col justify-between gap-5">
                <SearchProducts  usuario={usuario.userId} setSearchQuery={setSearchQuery}/>
                <div className="h-[69.15vh] px-3 pt-2 flex flex-wrap gap-y-[4%] gap-x-[8%] justify-center overflow-y-scroll">
                    {productos.map((producto, index) => {
                        return <ProductoCard key={index} userId={usuario.userId} productId={producto.producto_id} name={producto.producto_nombre} workshopName={producto.nombre} price={producto.producto_precio} img={producto.producto_fotos[0]} discount={producto.producto_descuento} promotion={producto.producto_promocion} shipment={producto.producto_envio}/>
                    })}
                </div>
            </main>
        </>
    )
}