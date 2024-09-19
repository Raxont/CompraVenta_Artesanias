/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Activa el modo oscuro usando clases
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Colores claros (modo light)
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        cuatertiary: 'var(--color-cuatertiary)',
        quintier: 'var(--color-quintier)',
        bg: 'var(--color-bg)',
        light: 'var(--color-light)',
        
        // Colores oscuros (modo dark)
        'dark-primary': 'var(--dark-color-primary)',
        'dark-secondary': 'var(--dark-color-secondary)',
        'dark-tertiary': 'var(--dark-color-tertiary)',
        'dark-cuatertiary': 'var(--dark-color-cuatertiary)',
        'dark-quintier': 'var(--dark-color-quintier)',
        'dark-bg': 'var(--dark-color-bg)',
        'dark-light': 'var(--dark-color-light)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

