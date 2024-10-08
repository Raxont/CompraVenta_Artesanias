import { useLoaderData, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";
import {LibretaIcon} from "../assets/libretaIcon.jsx";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton-chat";

export const informacionTallerLoader = async ({ params }) => {
    let res = await fetch(`/api/educationalWorkshops/${params.id}`);
    let data = await res.json();
    return data;
};

export function InformacionTaller() {
    const data = useLoaderData();
    const [userId, setUserId] = useState(null); // Almacenar el userId
    const [isInscrito, setIsInscrito] = useState(false); // Estado para manejar si el usuario ya está inscrito
    const navigate = useNavigate()

    // Obtener el userId desde /session-data
    const fetchUserId = async () => {
        try {
            const response = await fetch('/api/users/session-data', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            if (!response.ok || !data.userId) {
                // Si la respuesta no es OK o no hay ID de usuario, devolver un error
                throw new Error("No se ha iniciado sesión");
            }
            
            setUserId(data.userId); // Almacenar el userId en el estado
            await checkInscripcion(data.userId); // Verificar la inscripción
        } catch (error) {
            console.error('Error al obtener el ID del usuario:', error);
            navigate('/login'); // Redirigir al login si no hay una sesión iniciada
        }
    };

    // Verificar si el usuario ya está inscrito
    const checkInscripcion = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            const userData = await response.json();
            if (userData.talleresInscritos.includes(data._id)) {
                setIsInscrito(true); // Cambiar el estado si el usuario ya está inscrito
            }
        } catch (error) {
            console.error("Error al verificar la inscripción:", error);
        }
    };

    useEffect(() => {
        fetchUserId(); // Llamar a la función al montar el componente
    });

    const handleInscribirse = async () => {
        if (!userId) {
            console.error('User ID no disponible');
            return;
        }

        try {
            // Obtener los datos actuales del usuario, incluyendo su array de talleresInscritos
            const userResponse = await fetch(`/api/users/${userId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!userResponse.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            const userData = await userResponse.json();

            // Verificar si el taller ya está inscrito
            if (userData.talleresInscritos.includes(data._id)) {
                alert("El usuario ya está inscrito en este taller");
                return;
            }

            // Actualizar el array de talleresInscritos con el nuevo taller
            const updatedTalleresInscritos = [...userData.talleresInscritos, data._id];

            // Enviar el array actualizado al backend
            const bodyData = {
                talleresInscritos: updatedTalleresInscritos, // Enviar el array completo actualizado
            };

            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Error al inscribirse en el taller');
            }
            
            await response.json();
            setIsInscrito(true); // Cambiar el estado para reflejar la inscripción
        } catch (error) {
            console.error('Error al inscribirse en el taller:', error);
        }
    };

    const duracion = (fechaInicio, fechaFin) => {
        let mesInicio = new Date(fechaInicio).getMonth();
        let mesFin = new Date(fechaFin).getMonth();
        let diaInicio = new Date(fechaInicio).getDate();
        let diaFin = new Date(fechaFin).getDate();
        if (mesFin - mesInicio > 0) return `${mesFin - mesInicio} meses`;
        else return `${diaFin - diaInicio} dias`;
    };

    const amOrPm = (fechaInicio, fechaFin) => {
        let horaInicio = new Date(fechaInicio).getHours();
        let minutosInicio = new Date(fechaInicio).getMinutes().toString().padStart(2, '0');
        let horaFin = new Date(fechaFin).getHours();
        let minutosFin = new Date(fechaInicio).getMinutes().toString().padStart(2, '0');
        if (horaFin > 12 || horaInicio > 12)
            return `${horaInicio - 12}:${minutosInicio} a ${horaFin - 12}:${minutosFin} PM`;
        else return `${horaInicio}:${minutosInicio} a ${horaFin}:${minutosFin} AM`;
    };

    let mesesAño = {
        0: "Enero",
        1: "Febrero",
        2: "Marzo",
        3: "Abril",
        4: "Mayo",
        5: "Junio",
        6: "Julio",
        7: "Agosto",
        8: "Septiembre",
        9: "Octubre",
        10: "Noviembre",
        11: "Diciembre",
    };

    return (
        <>
            <div className="w-[100vw] z-20">
                <PurchaseHistoryButton/>
            </div>
            <div className="w-[100vw] h-[38.3vh] overflow-hidden">
                <img src={data.foto} alt="" className="w-full h-full object-cover scale-105"/>
            </div>
            <div className="w-[100vw] h-[5.8vh] bg-bg dark:bg-dark-primary flex items-center">
                <TrianguloIzquierdo style="h-[90%] text-primary dark:text-dark-tertiary" />
                <h2 className="text-lg ml-2 text-dark-light">{data.nombre}</h2>
            </div>
            <main className="w-[100vw] h-[55.7vh] px-[6%] pt-[3%] pb-[5%] flex flex-col text-[1.2rem] relative gap-3">
                <p className="font-light text-sm text-bg dark:text-dark-bg">{data.descripcion}</p>
                <div>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Para publico {data.publico}</p>
                    {data.publico == "general" ? (<p className="font-light text-sm text-[#9D1A1A] dark:text-dark-bg opacity-50">*Los niños menores de 8 años se recomienda que esten acompañados de un adulto</p>) : ("")}
                </div>
                <div className="h-[45%] flex flex-col justify-around">
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Duración: <span className="font-light text-bg dark:text-dark-bg">{duracion(data.fechaInicio, data.fechaFin)}</span></p>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Fecha de inicio: <span className="font-light text-bg dark:text-dark-bg">{new Date(data.fechaInicio).getDate()} de {mesesAño[new Date(data.fechaInicio).getMonth()]}</span></p>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Horario: <span className="font-light text-bg dark:text-dark-bg"> {amOrPm(data.fechaInicio, data.fechaFin)}</span></p>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Materiales: <span className="font-light text-bg dark:text-dark-bg">{data.materiales}</span></p>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Modalidad: <span className="font-light text-bg dark:text-dark-bg">{data.modalidad}</span></p>
                    <p className="text-[#9D1A1A] dark:text-dark-bg">Lugar: <span className="font-light text-bg dark:text-dark-bg">{data.lugar}</span></p>
                </div>
                <div className="h-[6vh] w-[100%] flex items-center mt-3">
                    {/* Cambiar el color a azul si ya está inscrito */}
                    <div
                        onClick={!isInscrito ? handleInscribirse : null}
                        className={`h-[5vh] flex items-center justify-between px-2 rounded-md ${isInscrito ? "bg-bg dark:bg-dark-bg" : "bg-primary dark:bg-dark-tertiary"} cursor-pointer`}
                    >
                        <LibretaIcon style={`h-[60%] ${isInscrito ? "text-white" : "text-light dark:text-dark-bg"}`} />
                        <p className={`font-light ml-3 ${isInscrito ? "text-white" : "text-light dark:text-dark-bg"}`}>
                            {isInscrito ? "Ya inscrito" : "Inscribirse al taller"}
                        </p>
                    </div>
                    <p className="font-light text-sm ml-3 text-[#9D1A1A] dark:text-dark-bg opacity-50">*Cupos limitados</p>
                </div>
            </main>
        </>
    )
}