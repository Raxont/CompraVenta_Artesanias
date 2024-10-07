import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FilterIcon } from "../assets/filterIcon.jsx";
import { LupaIcon } from "../assets/magnifyingGlassIcon.jsx";

export function SearchProducts ({ usuario, setSearchQuery }) {
    const [searchQueryLocal, setSearchQueryLocal] = useState('');
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const currentPath = location.pathname;

    const newPath = currentPath.split("/").slice(0, -2).join("/") ;

    const getProducts = async () => {
        const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/products`);
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
        const productsData = await getProducts();
        setProducts(productsData);
        };
        fetchData();
    }, []);
    
    const filteredProducts = searchQueryLocal
        ? products.filter((product) => 
            product.nombre.toLowerCase().includes(searchQueryLocal.toLowerCase())
        )
        : [];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value); // Actualizar el valor en el componente padre
        setSearchQueryLocal(value); // Actualizar el valor localmente
    };

    return (
        <>
            <div className="w-[100%] h-[10%] flex justify-between items-center">
                <div className="h-[42px] w-[88%] p-[2.5%] bg-primary dark:bg-dark-quintier rounded-lg flex items-center">
                    <LupaIcon style="h-[1.5rem] text-light dark:text-dark-bg" alt="lupaIcon"/>
                    <input
                        type="text"
                        className="bg-transparent text-white dark:text-dark-bg placeholder-quintier dark:placeholder-dark-quintier w-full border-none focus:ring-transparent"
                        placeholder="Buscar producto o palabra clave..."
                        value={searchQueryLocal}
                        onChange={handleInputChange}
                    />
                </div>
                <FilterIcon style={"h-[80%] text-secondary dark:text-dark-bg"}/>
            </div>

            {searchQueryLocal && (
                <div>
                <h2 className="text-lg font-semibold mt-4">Productos</h2>
                {filteredProducts.length > 0 ? (
                    <ul>
                    {filteredProducts.map((product) => (
                        <li>
                        <Link to={`${newPath}/producto/${product._id}/${usuario}`} key={product._id} className="text-black">
                            {product.nombre}
                        </Link>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-black">No hay productos disponibles.</p>
                )}
                </div>
            )}
        </>
    )
}