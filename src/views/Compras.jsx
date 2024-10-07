import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useState,  useEffect} from 'react';
import ProductCard from "../components/ProductCard"
const Compras = () => {
    const [product, setProduct] = useState([]); // Inicializar como null
    const getProduct = async () => {
        const res = await fetch(`api/requests/user/${"650f4c29a5f1bc1234567892"}`);
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
