import { useEffect, useState } from 'react';
import AjustesImageComponent from "../../public/AjustesIcon";
import AtencionImageComponent from "../../public/AtencionIcon";
import CanjearImageComponent from "../../public/CanjearIcon";
import ComentariosImageComponent from "../../public/ComentariosIcon";
import ComprasImageComponent from "../../public/ComprasIcon";
import ListaImageComponent from "../../public/ListaIcon";
import TalleresImageComponent from "../../public/TalleresIcon";
import { initTheme } from '../tools/theme';
import ButtonTheme from './ButtonTheme';
import Logout from "./Logout";

// eslint-disable-next-line react/prop-types
const MenuItem = ({ text, IconComponent, link }) => {
  return (
    <li className="flex items-center py-2">
      {/* Icono dentro de un círculo */}
      <div className="w-10 h-10 rounded-full bg-primary dark:bg-dark-primary flex justify-center items-center mr-4 text-secondary dark:text-dark-secondary ">
        <IconComponent className="w-6 h-6 text-secondary dark:text-dark-secondary" /> {/* Usando el componente de ícono */}
      </div>
      <a href={link} className="text-white hover:underline text-lg no-underline">{text}</a>
    </li>
  );
};

// eslint-disable-next-line react/prop-types
function SideBar({ user, iconUser }) {
  initTheme();

  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    nombre: '',
    fotoPerfil: ''
  });

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/session-data', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
          fetchUserData(data.userId);
        } else {
          console.error('No estás autenticado');
        }
      } catch (error) {
        console.error('Error al obtener el id del usuario:', error);
      }
    };
  
    const fetchUserData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };
  
    fetchUserId();
  }, []);
  
  const menuItems = [
    { text: 'Lista de favoritos', IconComponent: ListaImageComponent, link: '/favoritos/Textileria' },
    { text: 'Compras', IconComponent: ComprasImageComponent, link: '/compras' },
    { text: 'Talleres', IconComponent: TalleresImageComponent, link: '/talleresEducativos' },
    { text: 'Canjear cupón', IconComponent: CanjearImageComponent, link: '/cupon' }
  ];

  const otherMenuItems = [
    { text: 'Ajustes', IconComponent: AjustesImageComponent, link: '/settings' },
    { text: 'Comentarios', IconComponent: ComentariosImageComponent, link: '/comments' },
    { text: 'Atención al cliente', IconComponent: AtencionImageComponent, link: '/pqr' }
  ];

  return (
    <nav className="bg-bg dark:bg-dark-bg h-full w-72 p-6 flex flex-col">
      <ButtonTheme />
      {/* Sección de la imagen del perfil y nombre */}
      <div className="flex flex-row gap-5 items-center mb-8">
        <img
          src={`http://localhost:3001/fotos-de-perfil/${userData.fotoPerfil}`}
          alt="User Profile"
          className="w-[6rem] h-[6rem] rounded-full border-2 border-red-800 dark:border-0"
        />
        <span className="text-dark-quintier text-lg font-semibold">{userData.nombre}</span>
      </div>

      {/* Lista de menús */}
      <ul className="w-full list-none space-y-4">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}

        {/* Separador de diamantes */}
        <div className="w-full flex justify-center my-6">
          <span className="text-primary dark:text-white text-4xl">⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄</span>
        </div>

        {/* Restantes elementos del menú */}
        {otherMenuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
        <Logout/>
      </ul>
      <footer className="pt-10">
        <div className="flex text-white text-sm">
          Aplicación potenciada por:
        </div>
        <img src="../public/campuslands.png" alt="Campusland Logo" />
      </footer>
    </nav>
  );
}

export default SideBar;