import { useEffect } from 'react';
import 'flowbite'; // Se importa la librería de Flowbite para componentes e iconos pre-diseñados con Tailwind.
import { initTheme } from '../../tools/theme'; // Importa la lógica para inicializar el tema.
import ButtonTheme from '../../components/ButtonTheme'; // Componente para cambiar entre tema claro y oscuro.

export function CambioColor() {
  useEffect(() => {
    initTheme(); // Inicializa el tema al cargar la app.
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen dark:bg-neutral-800 bg-[url('../../../public/fondo1Color.png')] dark:bg-[url('../../../public/fondo1.png')]">
      {/* Botón para cambiar el tema */}
      <ButtonTheme />
    </div>
  );
}
