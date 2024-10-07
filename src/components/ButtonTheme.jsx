import { useEffect, useState } from 'react';
import { toggleTheme } from './../tools/theme'; // Importa las funciones para manejar el tema

const ButtonTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Inicializa el tema y sincroniza el estado del botón con el almacenamiento local
  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDarkMode);

    // Escucha cambios en el modo preferido del sistema (p.ej., si el usuario lo cambia manualmente)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleToggle = () => {
    toggleTheme(); // Alterna el tema utilizando la lógica del archivo theme.js
    setDarkMode(!darkMode); // Actualiza el estado local para cambiar el ícono
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={handleToggle}
      className="bg-white dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-lg text-sm p-2 w-[15%] right-3 absolute"
    >
      {/* Icono de modo oscuro */}
      <svg
        id="theme-toggle-dark-icon"
        className={`w-[1.7rem] h-5 ${darkMode ? '' : 'hidden'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      {/* Icono de modo claro */}
      <svg
        id="theme-toggle-light-icon"
        className={`w-[1.5rem] h-5 ${darkMode ? 'hidden' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default ButtonTheme;
