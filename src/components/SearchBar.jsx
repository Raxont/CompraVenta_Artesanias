import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import SideBar from './SideBar';
import { initTheme } from '../tools/theme';
import MenuImageComponent from "../../public/MenuIcon";
import LupaImageComponent from "../../public/LupaIcon";

const SearchBar = ({ usuario, setSearchQuery }) => {
  initTheme();
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [searchQueryLocal, setSearchQueryLocal] = useState('');
  const [talleres, setTalleres] = useState([]);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;

  const newPath = currentPath.includes("descuentos") ? currentPath.split("/").slice(0, -2).join("/") : currentPath.split("/").slice(0, -1).join("/") ;

  const getTalleres = async () => {
    const res = await fetch(`/api/workshops`);
    const data = await res.json();
    return data;
  };

  const getProducts = async () => {
    const res = await fetch(`/api/products`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const talleresData = await getTalleres();
      setTalleres(talleresData);
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const filteredTalleres = searchQueryLocal
    ? talleres.filter((taller) => 
        taller.nombre.toLowerCase().includes(searchQueryLocal.toLowerCase())
      )
    : [];
  
  const filteredProducts = searchQueryLocal
    ? products.filter((product) => 
        product.nombre.toLowerCase().includes(searchQueryLocal.toLowerCase())
      )
    : [];

  const sideBarRef = useRef(null);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setIsSideBarVisible(false);
    }
  };

  useEffect(() => {
    if (isSideBarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideBarVisible]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Actualizar el valor en el componente padre
    setSearchQueryLocal(value); // Actualizar el valor localmente
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-bg dark:bg-dark-bg pl-4 w-full h-[4.5em] fixed top-0 left-0">
        {/* Primer div hijo con el ícono de menú */}
        <div className="mr-4" onClick={toggleSideBar}>
          <MenuImageComponent className="w-12 h-12 cursor-pointer text-secondary dark:text-dark-light" />
        </div>

        {/* Este div representa la barra de búsqueda */}
        <div className="flex items-center bg-primary dark:bg-dark-primary p-2 rounded-md w-[75%] h-[55%]">
          <LupaImageComponent className="w-6 h-6 text-secondary dark:text-dark-light" />
          <input
            type="text"
            className="bg-transparent text-white placeholder-quintier dark:placeholder-dark-quintier w-full border-none focus:ring-transparent"
            placeholder="Buscar producto o tienda..."
            value={searchQueryLocal}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {searchQueryLocal && (
        <div className="mt-20 p-4">
          <h2 className="text-lg font-semibold">Talleres</h2>
          {filteredTalleres.length > 0 ? (
            <ul>
              {filteredTalleres.map((taller) => (
                <li>
                  <Link to={`${newPath}/tienda/${taller._id}`} key={taller._id} className="text-black">
                    {taller.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No hay talleres disponibles.</p>
          )}
          
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

      {isSideBarVisible && (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
          <div ref={sideBarRef} className="fixed inset-y-0 left-0 z-50">
            <SideBar />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
