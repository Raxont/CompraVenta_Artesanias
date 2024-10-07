import Tittle from '../components/Tittle'
import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
function Comments() {
  return (
    <div>
        <section className='p--4 h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Comentarios a la App"/>    
        </section>
        <div className="container mx-auto p-4">
        <h2 className="text-2xl mb-4 text-[#9D1A1A] dark:text-dark-bg">Problemas Frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 left-0">
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            La aplicación no carga de manera correcta
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            Errores al querer comprar en la aplicación
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No puedo ver las imágenes de las tiendas y/o artesanías
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No me permite usar un cupón de descuento
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg py-2 px-4 rounded">
            No me deja inscribirme a los talleres
            </button>
            <button className="text-left bg-primary dark:bg-dark-tertiary font-light hover:bg-gray-300 text-light dar:text-dark-bg font-bold py-2 px-4 rounded">
            El QR interactivo no funciona de manera correcta
            </button>
        </div>
        <div className="mt-4">
            <h3 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">Otro</h3>
            <textarea className="border bg-primary dark:bg-dark-tertiary text-light dark:text-dark-bg text-opacity-80 p-2 w-full" rows="4" placeholder="Describe aquí tu problema..."></textarea>
        </div>
        <div className="flex justify-between mt-4">
            <button className="bg-bg dark:bg-dark-primary text-light font-light py-2 px-4 rounded">
            Adjuntar captura
            </button>
            <button className="bg-bg dark:bg-dark-primary text-light font-light py-2 px-4 rounded">
            Enviar
            </button>
        </div>
        </div>
    </div>
  );
}

export default Comments;