import { Link } from "react-router-dom";

export function TallerEducativoCard ({id, name, workshopName, img, publico}) {
    return (
        <div className="w-[100%] h-[35%] bg-primary dark:bg-dark-tertiary rounded-lg flex">
            <div className="w-[35%] h-[100%] overflow-hidden rounded-lg">
                <img src={img} alt="fotoDelTaller" className="w-full h-full object-cover "/>
            </div>
            <div className="w-[65%] px-[5%] py-[4%]">
                <p className="overflow-hidden text-ellipsis w-full flex flex-wrap text-light dark:text-dark-bg">{name}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap w-full font-light flex flex-wrap underline text-light dark:text-dark-bg">Para publico {publico}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap w-full flex flex-wrap text-light dark:text-dark-bg"><span className="font-light">Taller dado por los artesanos de </span>{workshopName}</p>
                <div className="mt-4 bg-bg dark:bg-dark-primary w-[95%] pt-[1%] pb-[2%] text-center rounded-md">
                    <Link to={`/informacionTaller/${id}`} className="text-dark-light underline overflow-hidden text-ellipsis whitespace-nowrap w-full font-light text-sm">Enterate más sobre el taller aquí</Link>
                </div>
            </div>
        </div>
    )
}