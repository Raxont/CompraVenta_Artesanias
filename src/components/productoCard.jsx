import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {DeleteIcon} from "../assets/deleteIcon.jsx";
import { DescuentoComponent } from "./descuentoComponent";

export function ProductoCard ({userId, productId, name, workshopName, price, img, discount, promotion, shipment}) {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const removeFavourites = async (userId, productId) => {
        try {
            console.log(typeof(productId))
            const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/removeFavourite/${userId}/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error('No se edito el usuario');
            }
            navigate(0)
        } catch (err) {
            return { error: true, message: err.message };
        }
    }

    return (
        <Link to={`/producto/${productId}/${userId}`} className="w-[45.5%] h-[207px] bg-primary dark:bg-dark-bg rounded-lg flex flex-col relative overflow-visible">
            {discount > 0 ? (<DescuentoComponent style="absolute top-[-1.5rem] z-10 left-[-2rem] text-white text-xs font-bold px-2 py-1 h-20 text-wrap" xNumber="70" yNumber="160" gStyle="text-[#9D1A1A] dark:text-dark-primary" text={`-${discount}%`} text2=""/>) : ("")}
            {promotion !== "1x1" ? (<DescuentoComponent style="absolute top-[-1.5rem] z-10 left-[-2rem] text-white text-xs font-bold px-2 py-1 h-20 text-wrap" xNumber="100" yNumber="160" gStyle="text-[#9D1A1A] dark:text-dark-primary" text={`${promotion}`} text2=""/>) : ("")}
            {shipment == 0 ? (<DescuentoComponent style="absolute top-[-1.5rem] z-10 left-[-2rem] text-white text-xs font-bold px-2 py-1 h-20 text-wrap" xNumber="70" yNumber="130" gStyle="text-[#9D1A1A] dark:text-dark-primary" text={"Envio"} text2={"gratis"}/>) : ("")}
            {currentPath.includes("/favoritos") ? (<DeleteIcon click={() => removeFavourites(userId, productId)} style='absolute h-[10%] right-[-10px] text-secondary dark:text-dark-bg'/>) : ("") }
            <div className="w-[100%] h-[60%] flex-grow overflow-hidden rounded-t-lg">
                <img src={img} alt="fotoDelProducto" className="w-full h-full object-cover"/>
            </div>
            <div className="px-[7%] py-[4%] h-[40%] flex flex-col justify-center">
                <p className="text-dark-light overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm">{name}</p>
                <p className="text-dark-light overflow-hidden text-ellipsis whitespace-nowrap w-full font-light text-sm">$/.{price}</p>
                <p className="text-dark-light overflow-hidden text-ellipsis whitespace-nowrap w-full font-light text-sm">{workshopName}</p>
            </div>
        </Link>
    )
}

ProductoCard.propTypes = {
    userId: PropTypes.string,
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    workshopName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    promotion: PropTypes.string.isRequired,
    shipment: PropTypes.number.isRequired,
};