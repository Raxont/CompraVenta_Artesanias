import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import CardQuestions from '../components/CardQuestions';
import { StoreChatIcon } from "../components/storeChatIcon";
import { CallIcon } from "../assets/call"

function PreguntasFrecuentes() {
  return (
    <div>
        <section className='h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Ajustes"/>    
        </section>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4 text-[#9D1A1A] dark:text-dark-bg">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 gap-4"> 
            <CardQuestions info="¿Cómo compro en la app?"/>
                <CardQuestions info="¿Cómo me inscribo en un taller?"/>
                <CardQuestions info="¿Cómo escaneo el QR interactivo?"/>
                <CardQuestions info="¿Cómo cambio la moneda en la app?"/>
                <CardQuestions info="¿Cómo reporto un problema?"/>
            </div>
            <div className="mt-14 flex flex-col gap-4">
                <h3 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">¿Necesitas atención personalizada? habla <br />con nuestro equipo de soporte</h3>
                <button className="flex flex-row gap-6 text-center bg-primary dark:bg-dark-tertiary hover:bg-gray-300 py-2 px-4 rounded w-full h-[60px]">
                    <StoreChatIcon style="h-[90%] text-light"/>
                    <p className="font-light text-light dark:text-dark-bg">
                        Empieza un chat
                    </p>
                </button>
                <button className="flex flex-row gap-6 text-center bg-primary dark:bg-dark-tertiary hover:bg-gray-300 py-2 px-4 rounded w-full h-[60px]">
                    <CallIcon style="h-[90%] text-light"/>
                    <p className="font-light text-light dark:text-dark-bg">
                        Programa una llamada
                    </p>
                </button>
            </div>
        </div>
    </div>
  );
}

export default PreguntasFrecuentes;