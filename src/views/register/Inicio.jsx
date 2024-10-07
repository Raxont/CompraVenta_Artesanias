import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTheme } from '../../tools/theme';

export function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
    // Redirigir a /register después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/register');
    }, 2000);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-screen bg-[url('../../../public/fondo1Color.png')] dark:bg-[url('../../../public/fondo1.png')] bg-cover bg-center bg-blend-overlay flex flex-col items-center justify-center p-4 text-white place-items-center">
      <div className="max-w-md w-full space-y-8 p-10 ">
        <h1 className="text-3xl text-center text-black">
        </h1>
      </div>
    </div>
  );
}
