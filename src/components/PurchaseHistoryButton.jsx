import { Link } from "react-router-dom"
import { initTheme } from '../tools/theme'; // Importa la lógica para inicializar el tema.

const PurchaseHistoryButton = () => {
  initTheme();

  return (
    <div className="absolute top-[0%] right-100 h-[100px] w-[100px] z-10">
    <svg width="100" height="100" viewBox="70 0 136 272" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="-2" width="195.161" height="195.869" rx="7" transform="rotate(45 0.5 -2)" className="fill-current text-primary dark:text-dark-tertiary" />
    </svg>  

    <Link to={-1}>
        <svg className="absolute top-[40%] ml-[7px]" width="20" height="20" viewBox="0 0 70 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M65.6514 37.4414H3.5022" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="stroke-current text-secondary dark:text-dark-bg" />
            <path d="M30.495 4L3.5 37.4417L30.495 70.8834" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="stroke-current text-secondary dark:text-dark-bg" />
        </svg>
    </Link>
    </div>

  );
};

export default PurchaseHistoryButton;
