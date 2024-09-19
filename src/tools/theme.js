
export const setDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };
  
  export const setLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  };
  
  export const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };
  
  // Función para inicializar el tema según la preferencia del sistema o localStorage
  export const initTheme = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  