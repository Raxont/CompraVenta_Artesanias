//Se pasa por el atributo {tittle}
const Tittle = ({ tittle }) => {
  return (
    <div className="relative flex items-center justify-center pt-6">
      {/* Rombo de fondo */}
      <div className="absolute w-24 h-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="transform rotate-45 text-primary opacity-[38%] dark:text-dark-tertiary dark:opacity-[100%]"
        >
          <rect x="40" y="40" fill="currentColor" width="65" height="65"/>
        </svg>
      </div>
      <h1 className="w-[30vw] text-center text-xl absolute left-1/2 transform -translate-x-1/2 pt-12 text-[#9D1A1A] dark:text-dark-bg">
        {tittle}
      </h1>
    </div>
  );
};

export default Tittle;
