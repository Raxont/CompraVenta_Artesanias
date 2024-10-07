const LocationCard = () => {
  return (
    <div className="flex items-center bg-primary dark:bg-dark-quintier rounded-lg p-2 w-5/6">
      {/* Ícono de ubicación */}
      <img src="/location.svg" alt="Location Icon" className="w-5 h-5 mr-2" />
      {/* Texto */}
      <span className="text-sm text-light dark:text-dark-bg opacity-50">Ubicación de entrega actual</span>
    </div>
  );
};

export default LocationCard;