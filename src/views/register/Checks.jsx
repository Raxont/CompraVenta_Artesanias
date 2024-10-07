import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección
import PurchaseHistoryButton from '../../components/PurchaseHistoryButton';
import { initTheme } from '../../tools/theme'; // Importa la lógica para inicializar el tema.

export function Checks() {
    initTheme();
    const navigate = useNavigate();
    
    // Estado para manejar los checkboxes requeridos
    const [isPolicyChecked, setIsPolicyChecked] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    // Manejo de los cambios de los checkboxes
    const handlePolicyChange = (e) => {
        setIsPolicyChecked(e.target.checked);
    };

    const handleTermsChange = (e) => {
        setIsTermsChecked(e.target.checked);
    };

    // Función para manejar el click en Registrarse
    const handleRegisterClick = () => {
        // Si ambos checkboxes requeridos están seleccionados, redirige
        if (isPolicyChecked && isTermsChecked) {
            navigate('/login');
        } else {
            alert('Debes aceptar la Política de Privacidad y los Términos y Condiciones');
        }
    };

    return (
        <>		
            <PurchaseHistoryButton/>
            <div className="bg-white text-black h-full flex flex-col justify-between items-center pl-14 pr-10 pt-32 pb-8">
                {/* Imagen para el modo claro */}
                <img 
                    className='fixed bottom-0 left-0 w-[14rem] -z-1 block dark:hidden' 
                    src="../../../public/rombo-leftBottom-color.svg" 
                    alt="Background flecha derecha (Light)" 
                />
                <img 
                    className='fixed top-0 right-0 w-[8rem] -z-1 block dark:hidden' 
                    src="../../../public/rombo-top-color.svg" 
                    alt="Background linea derecha (Light)" 
                />
                {/* Imagen para el modo oscuro */}
                <img 
                    className='fixed bottom-0 left-0 w-[14rem] -z-1 hidden dark:block' 
                    src="../../../public/rombo-leftBottom.svg" 
                    alt="Background flecha derecha (Dark)" 
                />
                <img 
                    className='fixed top-0 right-0 w-[8rem] -z-1 hidden dark:block' 
                    src="../../../public/rombo-top.svg" 
                    alt="Background linea derecha (Dark)" 
                />

                <div className="text-[0.8rem] flex gap-5 flex-col">
                    <div className="flex gap-4">
                        <input 
                            type="checkbox" 
                            id="politica" 
                            name="politica" 
                            required 
                            className="custom-checkbox w-8 h-8 border-2 border-black rounded-md checked:bg-white dark:checked:bg-white checked:border-secondary dark:checked:border-black  checked:text-secondary dark:checked:text-black focus:ring-white appearance-none"
                            onChange={handlePolicyChange} // Añadido para manejar cambios
                        />
                        <label htmlFor="politica" className='flex items-center gap-1 text-bg dark:text-dark-bg'>
                            He leído y acepto la 
                            <a href="#" className="underline font-medium text-red-800 dark:text-dark-bg">Política de Privacidad*</a>
                        </label>
                    </div>
                    <div className="flex gap-4">
                        <input 
                            type="checkbox" 
                            id="terminos" 
                            name="terminos" 
                            required 
                            className="custom-checkbox w-8 h-8 border-2 border-black rounded-md checked:bg-white dark:checked:bg-white checked:border-secondary dark:checked:border-black  checked:text-secondary dark:checked:text-black focus:ring-white appearance-none"
                            onChange={handleTermsChange} // Añadido para manejar cambios
                        />
                        <label htmlFor="terminos" className='flex items-center gap-1 text-bg dark:text-dark-bg'>
                            He leído y acepto los 
                            <a href="#" className="underline font-medium text-red-800 dark:text-dark-bg">Términos y Condiciones*</a>
                        </label>
                    </div>
                    <div className="flex gap-4">
                        <input 
                            type="checkbox" 
                            id="promociones" 
                            name="promociones" 
                            className="custom-checkbox w-8 h-8 border-2 border-black rounded-md checked:bg-white dark:checked:bg-white checked:border-secondary dark:checked:border-black checked:text-secondary dark:checked:text-black focus:ring-white appearance-none"
                        />
                        <label htmlFor="promociones" className='flex items-center text-bg dark:text-dark-bg'>
                            Acepto que me envíen promociones y eventos a mi correo electrónico
                        </label>
                    </div>
                </div>
                
                <button
                    type='button' // Cambiado a 'button' para evitar comportamiento de submit
                    className='w-full bg-transparent text-red-800  dark:text-black py-4 px-0 flex items-center justify-end rounded-none underline z-10 relative text-xl'
                    onClick={handleRegisterClick} // Añadido para manejar el click
                >
                    <div className='text-secondary dark:text-dark-bg pt-2'>
                        <box-icon name='chevron-right' size='md' class="fill-current"></box-icon>
                    </div>
                    Registrarse
                </button>
            </div>
        </>
    );
}
