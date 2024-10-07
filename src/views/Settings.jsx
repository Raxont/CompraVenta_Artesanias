import PurchaseHistoryButton from '../components/PurchaseHistoryButton'
import Tittle from '../components/Tittle'
import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    compras: false,
    descuentos: true,
    talleres: true,
    sonido: false,
  });

  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div>
        <section className='h-[9em]'>
            <PurchaseHistoryButton/>
            <Tittle tittle="Ajustes"/>    
        </section>
        <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* Global Section */}
            
            <div>
                <h2 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">Global</h2>
                <div className="bg-primary dark:bg-dark-tertiary p-4 rounded-md space-y-3">
                <div className="flex justify-between">
                    <span className="text-light dark:text-dark-bg">Cambiar país y región</span>
                    <span className="text-light dark:text-dark-bg opacity-50">Canadá, Toronto</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light dark:text-dark-bg">Cambiar idioma</span>
                    <span className="text-light dark:text-dark-bg opacity-50">Español</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light dark:text-dark-bg">Cambiar moneda</span>
                    <span className="text-light dark:text-dark-bg opacity-50">PEN</span>
                </div>
            </div>
        </div>

      {/* Notificaciones Section */}
        <div>
            <h2 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">Notificaciones</h2>
            <div className="bg-primary dark:bg-dark-tertiary p-4 rounded-md space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-light dark:text-dark-bg">Mostrar notificaciones de compras</span>
                <input
                type="checkbox"
                className="toggle-checkbox"
                checked={notifications.compras}
                onChange={() => toggleNotification('compras')}
                />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-light dark:text-dark-bg">Mostrar notificaciones de descuentos</span>
                <input
                type="checkbox"
                className="toggle-checkbox"
                checked={notifications.descuentos}
                onChange={() => toggleNotification('descuentos')}
                />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-light dark:text-dark-bg">Mostrar notificaciones de talleres</span>
                <input
                type="checkbox"
                className="toggle-checkbox"
                checked={notifications.talleres}
                onChange={() => toggleNotification('talleres')}
                />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-light dark:text-dark-bg">Sonido de notificaciones</span>
                <input
                type="checkbox"
                className="toggle-checkbox"
                checked={notifications.sonido}
                onChange={() => toggleNotification('sonido')}
                />
            </div>
            </div>
        </div>

      {/* Legal Section */}
        <div>
            <h2 className="text-xl mb-2 text-[#9D1A1A] dark:text-dark-bg">Legal</h2>
            <div className="bg-primary dark:bg-dark-tertiary p-4 rounded-md space-y-3">
            <div className="cursor-pointer text-light dark:text-dark-bg">Política de privacidad</div>
            <div className="cursor-pointer text-light dark:text-dark-bg">Información legal</div>
            <div className="cursor-pointer text-light dark:text-dark-bg">Libro de reclamaciones</div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Settings;
