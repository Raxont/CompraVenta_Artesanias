import { Link } from "react-router-dom";

export function TiendaCard ({id, name, city, img}) {
    return (
        <Link to={`/tienda/${id}`} className="w-[45.5%] h-[30%] bg-primary dark:bg-dark-bg rounded-lg flex flex-col">
            <div className="px-[7%] py-[4%]">
                <p className="text-dark-light overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm">{name}</p>
                <p className="text-dark-light overflow-hidden text-ellipsis whitespace-nowrap w-full font-light text-sm">{city}</p>
            </div>
            <div className="w-[100%] flex-grow overflow-hidden rounded-b-lg">
                <img src={img} alt="fotoDelTaller" className="w-full h-full object-cover scale-[1.7]"/>
            </div>
        </Link>
    )
}