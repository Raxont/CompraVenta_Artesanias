import { Link, useLocation } from 'react-router-dom';

const CategoryCard = ({ tittle, iconPath }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const newPath = currentPath.split("/").slice(0, -1).join("/");

  return (
    <Link to={ currentPath.includes("home") ? `${newPath}/categorias/${tittle}` : `${newPath}/${tittle}`} className={`flex flex-col items-center mx-[10px] ${currentPath.includes(encodeURIComponent(tittle)) ? "border-b-2 border-bg dark:border-dark-bg" : "" }`}>
      {/* Ícono en círculo */}
      <div className="bg-primary dark:bg-dark-tertiary rounded-full w-12 h-12 flex items-center justify-center">
        {iconPath}
      </div>
      {/* Título */}
      <h2 className="mt-1 text-center text-xs text-[#9D1A1A] dark:text-dark-bg">{tittle}</h2>
    </Link>
  );
};

export default CategoryCard;
