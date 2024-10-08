import { useLoaderData,useNavigate } from "react-router-dom";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton";
import Tittle from "../components/Tittle";
import { TallerEducativoCard } from "../components/tallerEducativoCard";
import { SearchEducationalWorkshops } from "../components/searchEducationalWorkshops"
import { useState,useEffect } from 'react';

export const tallerEducativoLoader = async () => {
    const resUser = await fetch(`/api/users/session-data`, {
        method: 'GET',
        credentials: 'include'
    });
    const dataUser = await resUser.json();
    if (!resUser.ok || !dataUser.userId) {
        // Si la respuesta no es OK o no hay ID de usuario, devolver un error
        return { error: true, message: "No session data" };
    }
    let res = await fetch(`/api/educationalWorkshops/`);
    let data = await res.json();
    return { talleresEducativos: data, usuario: dataUser }
}

export function TalleresEducativos () {
    const {talleresEducativos, usuario, error} = useLoaderData()
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
                <Tittle tittle="Talleres educativos"/>    
            </section>
            <div className="h-[89.8vh] w-[100vw]">
                <SearchEducationalWorkshops usuario={usuario.userId} setSearchQuery={setSearchQuery}/>
                {!searchQuery && (
                <div className="w-[100vw] h-[79.6vh] px-[5%] overflow-y-scroll flex flex-col gap-[3%]">
                    {talleresEducativos.map((taller) => {
                        return (<TallerEducativoCard key={taller._id} id={taller._id} name={taller.nombre} workshopName={taller.taller_nombre} img={taller.foto} publico={taller.publico} />)
                    })}
                </div>
                )}
            </div>
        </>
    )
}