import { Link, useLocation } from "react-router-dom";
import { initTheme } from "../tools/theme";
import TiendaImageComponent from "../../public/TiendaIcon";
import PorcentajeImageComponent from "../../public/PorcentajeIcon";
import CasaImageComponent from "../../public/CasaIcon";
import CarritoImageComponent from "../../public/CarritoIcon";
import UserImageComponent from "../../public/UsuarioIcon";

const Footer = () => {
  initTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const icons = [
    { id: 1, component: <TiendaImageComponent />, alt: "tiendas", link: "/tiendas" },
    { id: 2, component: <PorcentajeImageComponent />, alt: "descuentos", link: "/descuentos/Textileria" },
    { id: 3, component: <CasaImageComponent />, alt: "home", link: "/home" },
    { id: 4, component: <CarritoImageComponent />, alt: "cart", link: "/cart" },
    { id: 5, component: <UserImageComponent />, alt: "useraccount", link: "/useraccount" },
  ];

  return (
    <div className="flex justify-center gap-8 items-center bg-bg dark:bg-dark-bg w-[100%] h-[4.5em] fixed bottom-0 z-20">
      {icons.map((icon) => (
        <Link
          to={icon.link}
          key={icon.id}
          className={`relative w-12 h-12 rounded-full bg-primary dark:bg-dark-primary cursor-pointer ${
            currentPath.includes(icon.alt) ? "scale-[1.60]" : ""
          }`}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-secondary dark:text-white">
            {icon.component}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
