import TrashImageComponent from "../../public/TrashIcon"; // Asegúrate de que la ruta sea correcta

const CardCart = ({ product, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex flex-col bg-primary dark:bg-dark-tertiary p-4 rounded-lg shadow-md mb-4 relative w-full max-w-md -z-1">
      {/* Botón de eliminar en la esquina superior derecha */}
      <button
        onClick={onRemove}
        className="absolute top-4 right-2 text-light dark:text-dark-bg hover:text-gray-900"
        aria-label="Eliminar producto"
      >
        <TrashImageComponent className="w-6 h-6" />
      </button>

      <div className="flex items-center w-3/4">
        {/* Imagen del producto */}
        <img
          src={product.fotos || '/default-image.jpg'} // Maneja el caso de que no haya fotos
          alt={product.nombreProducto}
          className="size-32 object-contain rounded-md mr-4"
        />

        {/* Información del producto */}
        <div className="flex-1">
          <h3 className="text-xs font-semibold text-light dark:text-dark-bg">{product.nombreProducto}</h3>
          <p className="text-xs text-light dark:text-dark-bg">S/. {product.precio}</p>
          <p className="text-xs text-light dark:text-dark-bg">{product.dimensiones.largo} cm x {product.dimensiones.ancho} cm</p>
          <p className="text-xs text-light dark:text-dark-bg">{product.descripcion}</p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={onDecrease}
              className="bg-bg dark:bg-dark-primary text-light w-8 h-8 flex justify-center items-center rounded-md"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="bg-bg dark:bg-dark-primary text-light px-4 py-1">{product.cantidad}</span>
            <button
              onClick={onIncrease}
              className="bg-bg dark:bg-dark-primary text-light w-8 h-8 flex justify-center items-center rounded-md"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
