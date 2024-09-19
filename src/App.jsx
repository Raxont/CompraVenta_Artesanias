import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'flowbite'; //Se importa la libreria de flowbite para componentes e iconos pre-diseñados con tailwind.
import { initTheme } from './tools/theme'; // Importa la lógica para inicializar el tema
import ButtonTheme from './components/ButtonTheme'; // Importa el componente ButtonTheme que permite el cambio manual entre tema claro o oscuro.

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    initTheme(); // Inicializa el tema al cargar la app
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-200 dark:bg-neutral-800 dark:text-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo hover:scale-110 transition-transform" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react hover:scale-110 transition-transform" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-100 text-black">Vite + React</h1>

        <div className="card bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Count is {count}
          </button>
          <p className="mt-2 text-gray-800 dark:text-gray-300">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        {/* Botón para cambiar el tema */}
        <div className="mt-4">
          <ButtonTheme />
        </div>

        <p className="read-the-docs mt-4 text-gray-500 dark:text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
