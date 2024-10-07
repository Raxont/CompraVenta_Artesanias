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
import CategoriaCard from "./CategoryCard"

export function CategoriesCarousel () {

    const categories = [
        {
            icono: <TextileriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Textileria",
        },
        {
            icono: <BordadoIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Bordado",
        },
        {
            icono: <CeramicaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Ceramica",
        },
        {
            icono: <JoyeriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Joyeria",
        },
        {
            icono: <OrfebreriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Orfebreria",
        },
        {
            icono: <HojalateriaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Hojalateria",
        },
        {
            icono: <TallaPiedraIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Talla en Piedra",
        },
        {
            icono: <EstampadoIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Estampado",
        },
        {
            icono: <TallaMaderaIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Talla en Madera",
        },
        {
            icono: <PinturaTradicionalIcon style="w-6 h-6 text-light dark:text-dark-bg"/>,
            nombre: "Pintura Tradicional",
        },
    ]

    return (
        <div className="w-[100vw] h-[10.2vh] flex overflow-scroll">
            {categories.map((categoria, index) => {
                return (<CategoriaCard key={index} iconPath={categoria.icono} tittle={categoria.nombre}/>)
            })}
        </div>
    )
}