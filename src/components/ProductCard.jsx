const ProductCard = ({ arrive }) => {
  return (
    <div>
      {arrive.map((category, index) => (
        <div key={index} className="mb-8">
          {category.productos.map((product, productIndex) => (
            <div key={productIndex} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-6">
              
              <img src={product.fotos[0]} alt={product.title} className="w-32 h-auto rounded-md" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">{product.nombreProducto}</h3>
                <p className="text-gray-700">S/. {product.precio}</p> 
                <p className="text-gray-600">{product.dimensiones.ancho}cm x {product.dimensiones.largo}</p>
                <p className="text-gray-600">Cantidad {product.cantidad}</p>
                <button className="mt-2 bg-gray-800 text-white  py-1 px-3 rounded-md hover:bg-gray-700">
                  Ver seguimiento del producto
                </button>
              </div>
              <div className="ml-4 mb-22">
                <img 
                  src="/chat.svg"   
                  alt="Chat icon"
                  className="w-8 h-8 text-gray-800"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
