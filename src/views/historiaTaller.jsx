import { useLoaderData, useNavigate } from "react-router-dom";
import PurchaseHistoryButton from "../components/PurchaseHistoryButton";
import { HeaderBorder } from "../components/headerBorder";
import QRCode from 'react-qr-code';
import { initTheme } from '../tools/theme';
import { useEffect, useState } from 'react';

// Loader para obtener datos del taller y verificar sesión
export const HistoriaTallerLoader = async ({ params }) => {
  try {
    // Obtener el ID del usuario desde /session-data
    const fetchUserId = async () => {
      const response = await fetch('/api/users/session-data', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok || !data.userId) {
        throw new Error("No session data");
      }
      return data.userId;
    };

    // Verificar si el usuario está autenticado
    const userId = await fetchUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    // Obtener datos del taller por ID
    const res = await fetch(`/api/workshops/${params.id}`);
    if (!res.ok) {
      throw new Error('Error al obtener los datos del taller');
    }
    const data = await res.json();

    return { data, userId };
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Componente HistoriaTaller
export function HistoriaTaller() {
  initTheme();
  const { data, error } = useLoaderData();
  const [qrColor, setQrColor] = useState('#703a31'); // Estado para manejar el color del QR
  const navigate = useNavigate();

  // Verificar si hay error o no hay datos de sesión y redirigir al login si es necesario
  useEffect(() => {
    if (error || !data) {
      navigate("/login"); // Redirigir al login si no hay sesión o hay error
    }
  }, [error, data, navigate]);

  // Cambiar el color del QR según el tema
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setQrColor(currentTheme === 'dark' ? '#000000' : '#703a31');
  }, []);

  // Mostrar un mensaje de carga si los datos aún no están disponibles
  if (!data || error) {
    return <p>Loading...</p>; // También podrías personalizar este loader
  }
  const youtubeUrl = `https://www.youtube.com/embed/${data.documental}`;

  
  

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