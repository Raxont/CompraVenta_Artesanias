import { useLoaderData, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"
import Footer from '../components/Footer'
import LocationCard from '../components/locationCard'
import SeccionCategoryList from '../components/SeccionCategoryList'
import BestProduct from '../components/BestProduct'
import {ViewTitleAndDescription} from '../components/viewTitle&Description'
import {useEffect,useState } from 'react';
import {TrianguloIzquierdo} from "../assets/trianguloIzquierdo.jsx";

export const homeLoader = async () => {
  try {
    const resUser = await fetch(`/api/users/session-data`, {
      method: 'GET',
      credentials: 'include'
    });
    const dataUser = await resUser.json();

    if (!resUser.ok || !dataUser.userId) {
      // Si la respuesta no es OK o no hay ID de usuario, devolver un error
      throw new Error("No session data");
    }

    return { usuario: dataUser };
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export function Home() {
  const { usuario, error } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Usamos useEffect para verificar el estado de la sesión y redirigir si es necesario
  useEffect(() => {
    if (error || !usuario?.userId) {
      // Si hay un error o no hay datos de usuario, redirigir al login
      navigate("/login");
    }
  }, [usuario, error, navigate]);

  // Si aún no tenemos los datos del usuario, puedes mostrar un loader o algún mensaje
  if (error || !usuario?.userId) {
    return <p>Loading...</p>; // O puedes mostrar un mensaje de redirección
  }
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
