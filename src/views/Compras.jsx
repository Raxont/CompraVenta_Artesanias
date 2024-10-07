import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useState,  useEffect} from 'react';
import ProductCard from "../components/ProductCard"
const Compras = () => {
    const [product, setProduct] = useState([]); // Inicializar como null
    
    const fetchUserId = async () => {
        try {
          const response = await fetch('http://localhost:3001/users/session-data', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (!response.ok) {
            throw new Error('Error al obtener los datos de sesión');
          }
          const data = await response.json();
          return data?.userId;
        } catch (error) {
          console.error('Error al obtener el ID del usuario:', error);
          return null;
        }
      };
    
    const getProduct = async () => {
        const userId= await fetchUserId()
        const res = await fetch(`api/requests/user/${userId}`);
        console.log("res",res);
        const data = await res.json();
        return data;
    };
    


    useEffect(() => {
        const fetchData = async () => {
        const dataCard = await getProduct();
        setProduct(dataCard);
        };
        fetchData();
      }, []);

      console.log("product",product);

  return (
    <div>
        <section className='h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Compras Realizadas"/>    
        </section>
        <div className="p-4 mx-auto space-y-6">
            <ProductCard arrive={product || []}/>
        </div>
    </div>
  );
};

export default Compras;