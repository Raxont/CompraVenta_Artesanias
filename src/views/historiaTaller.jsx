import { useLoaderData } from "react-router-dom";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton";
import { HeaderBorder } from "../components/headerBorder";
import  QRCode  from 'react-qr-code';
import { initTheme } from '../tools/theme';
import { useEffect, useState } from 'react';

export const HistoriaTallerLoader = async ({params}) => {
    let res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/workshops/${params.id}`);
    let data = await res.json();
    return data
}

export function HistoriaTaller () {
    initTheme();

    const data = useLoaderData()
    const youtubeUrl = `https://www.youtube.com/embed/${data.documental}`;

    // Estado para manejar el color del QR
    const [qrColor, setQrColor] = useState('#703a31'); // Rojo por defecto para tema claro

    // Cambiar el color del QR según el tema
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            setQrColor('#000000'); // Negro para tema oscuro
        } else {
            setQrColor('#703a31'); // Rojo para tema claro
        }
    }, []);

    return (
        <>
            <div className="w-[100vw]">
                <PurchaseHistoryButton/>
            </div>
            <div className="h-[27vh] flex flex-col items-center gap-5 p-[3.5rem] -z-10">
                <HeaderBorder/>
                <p className="font-light text-base text-center text-primary dark:text-dark-bg">{data.descripcion}</p>
                <HeaderBorder/>
            </div>
            <h2 className="w-[100vw] px-8 py-1 text-xl text-red-800 dark:text-dark-bg">{data.nombre} - Documental</h2>
            <main className="h-[30.2vh] w-[100vw] bg-primary dark:bg-dark-tertiary flex justify-center items-center">
                <iframe className="h-[90%] w-[90%] rounded-lg" src={youtubeUrl}  title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </main>
            <div className="w-[100vw] h-[40vh] pt-5 pb-10 px-[5vw] flex flex-col items-center justify-between">
                <div className="w-[100%] flex flex-col gap-3">
                    <p className="text-lg text-red-800 dark:text-dark-bg">Conoce más del taller de forma interactiva</p>
                    <p className="text-lg font-light w-[90%] leading-5 text-primary dark:text-dark-primary">Escanea el código QR con tu celular y disfruta de la experiencia</p>
                </div>
                <QRCode  
                value={youtubeUrl}
                    size={160}
                    fgColor={qrColor} // Cambiar color dinámicamente
                    style={{ fill: "currentColor" }}/>
            </div>
        </>
    )
}