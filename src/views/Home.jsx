import { useLoaderData } from "react-router-dom";
import SearchBar from "../components/SearchBar"
import Footer from '../components/Footer'
import LocationCard from '../components/locationCard'
import SeccionCategoryList from '../components/SeccionCategoryList'
import BestProduct from '../components/BestProduct'
import {ViewTitleAndDescription} from '../components/viewTitle&Description'
import { useState } from 'react';
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";

export const homeLoader = async () => {
  try {
    const resUser = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/session-data`, {
      method: 'GET',
      credentials: 'include'
    });
    const dataUser = await resUser.json();
    // Devuelve los datos del usuario al componente
    return { usuario: dataUser };
  } catch (err) {
    return { error: true, message: err.message };
  }
};

//<CategoryCard tittle="Textilería" iconPath="/Textilería.svg" />
export function Home() {
  const { usuario, error, message } = useLoaderData();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="bg-light flex flex-col">
      <SearchBar usuario={usuario.userId} setSearchQuery={setSearchQuery} />
      {!searchQuery && (
        <section className="mt-[5em] flex flex-col items-center justify-center gap-5 relative">
          <LocationCard/>
          <TrianguloIzquierdo style="h-[7%] top-11 left-0 text-primary dark:text-dark-tertiary absolute"/>
          <ViewTitleAndDescription title="Categorias"/>
          <SeccionCategoryList/>
          <BestProduct/>
        </section>
      )}
      <Footer/>
    </div>
  );
}
