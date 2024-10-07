import { useLoaderData } from "react-router-dom";
import { LupaIcon } from "../assets/magnifyingGlassIcon.jsx";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton";
import Tittle from "../components/Tittle";
import { TallerEducativoCard } from "../components/tallerEducativoCard";
import { SearchEducationalWorkshops } from "../components/searchEducationalWorkshops"
import { useState } from 'react';

export const tallerEducativoLoader = async () => {
    const resUser = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/session-data`, {
        method: 'GET',
        credentials: 'include'
    });
    const dataUser = await resUser.json();
    let res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/educationalWorkshops/`);
    let data = await res.json();
    return { talleresEducativos: data, usuario: dataUser }
}

export function TalleresEducativos () {
    const {talleresEducativos, usuario, error, message} = useLoaderData()
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <section className='h-[10.2vh] w-[100vw] mb-5'>
                <PurchaseHistoryButton/>
                <Tittle tittle="Talleres educativos"/>    
            </section>
            <div className="h-[89.8vh] w-[100vw]">
                <SearchEducationalWorkshops usuario={usuario.userId} setSearchQuery={setSearchQuery}/>
                {!searchQuery && (
                <div className="w-[100vw] h-[79.6vh] px-[5%] overflow-y-scroll flex flex-col gap-[3%]">
                    {talleresEducativos.map((taller, index) => {
                        return (<TallerEducativoCard id={taller._id} name={taller.nombre} workshopName={taller.taller_nombre} img={taller.foto} publico={taller.publico} />)
                    })}
                </div>
                )}
            </div>
        </>
    )
}