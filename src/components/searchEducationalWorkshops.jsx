import { FilterIcon } from "../assets/filterIcon.jsx";
import { LupaIcon } from "../assets/magnifyingGlassIcon.jsx";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

export function SearchEducationalWorkshops ({ usuario, setSearchQuery }) {
    const [searchQueryLocal, setSearchQueryLocal] = useState('');
    const [educationalWorkshops, setEducationalWorkshops] = useState([]);

    const location = useLocation();
    const currentPath = location.pathname;

    const newPath = currentPath.split("/").slice(0, -1).join("/") ;

    const getProducts = async () => {
        const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/educationalWorkshops`);
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
        const workshopsData = await getProducts();
        setEducationalWorkshops(workshopsData);
        };
        fetchData();
    }, []);
    
    const filteredWorkshops = searchQueryLocal
        ? educationalWorkshops.filter((workshop) => 
            workshop.nombre.toLowerCase().includes(searchQueryLocal.toLowerCase())
        )
        : [];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value); // Actualizar el valor en el componente padre
        setSearchQueryLocal(value); // Actualizar el valor localmente
    };

    return (
        <>
            <div className="h-[10.2vh]">
                <div className="w-[100%] h-[47px] flex justify-center items-center">
                    <div className="h-[42px] w-[88%] p-[2.5%] bg-primary dark:bg-dark-quintier rounded-lg flex items-center">
                        <LupaIcon style="h-[120%] text-light dark:text-dark-bg" alt="lupaIcon"/>
                        <input
                            type="text"
                            className="bg-transparent text-white placeholder-quintier dark:placeholder-dark-quintier w-full border-none focus:ring-transparent"
                            placeholder="Buscar taller..."
                            value={searchQueryLocal}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {searchQueryLocal && (
                    <div className="px-[7%]">
                    <h2 className="text-lg font-semibold mt-4">Productos</h2>
                    {filteredWorkshops.length > 0 ? (
                        <ul>
                        {filteredWorkshops.map((workshop) => (
                            <li>
                            <Link to={`${newPath}/informacionTaller/${workshop._id}`} key={workshop._id} className="text-black">
                                {workshop.nombre}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-black">No hay talleres educativos disponibles.</p>
                    )}
                    </div>
                )}
            </div>
        </>
    )
}