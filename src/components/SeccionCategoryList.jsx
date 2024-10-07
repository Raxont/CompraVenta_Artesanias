import { BordadoIcon } from "../assets/bordadoIcon.jsx"
import { CeramicaIcon } from "../assets/ceramicaIcon.jsx"
import { EstampadoIcon } from "../assets/estampadoIcon.jsx"
import { HojalateriaIcon } from "../assets/hojalateriaIcon.jsx"
import { JoyeriaIcon } from "../assets/joveriaIcon.jsx"
import { OrfebreriaIcon } from "../assets/orfebreriaIcon.jsx"
import { PinturaTradicionalIcon } from "../assets/pinturaTradicionalIcon.jsx"
import { TallaMaderaIcon } from "../assets/tallaMaderaIcon.jsx"
import { TallaPiedraIcon } from "../assets/tallaPiedraIcon.jsx"
import { TextileriaIcon } from "../assets/textileriaIcon.jsx"
import CategoryList from "./CategoryList"
const SeccionCategoryList = () => {
    const datos = [
        { title: "Textileria", iconPath: <TextileriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Bordado", iconPath: <BordadoIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Ceramica", iconPath: <CeramicaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Joyeria", iconPath: <JoyeriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Orfebreria", iconPath: <OrfebreriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Hojalateria", iconPath: <HojalateriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Talla en Piedra", iconPath: <TallaPiedraIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Estampado", iconPath: <EstampadoIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Talla en Madera", iconPath: <TallaMaderaIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        { title: "Pintura Tradicional", iconPath: <PinturaTradicionalIcon style="w-6 h-6 text-light dark:text-dark-bg"/> },
        
      ];
  return (
    <CategoryList categories={datos}/>
  );
};

export default SeccionCategoryList;
