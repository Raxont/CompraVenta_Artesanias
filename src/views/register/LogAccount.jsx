import { useState } from 'react';
import PurchaseHistoryButton from '../../components/PurchaseHistoryButton';
import { initTheme } from '../../tools/theme'; 

export function LogAccount() {
	initTheme();

	// Estados para almacenar los valores de los campos del formulario
	const [user, setUser] = useState('');
	const [contrasena, setContrasena] = useState('');

	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/users/loginAccount', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					user: user,  // Enviar el nombre, teléfono o correo
					password: contrasena  // Enviar la contraseña
				}),
			});

			const data = await response.json();

			if (response.ok) {
				window.location.href = '/home'; // Redirige al usuario tras el login
			} else {
				// Capturamos los mensajes de error específicos del backend
				const backendErrors = {};
				if (data.message === 'Invalid name, email or phone') {
					backendErrors.user = 'Nombre, correo o teléfono inválido';
				} else if (data.message === 'Invalid password') {
					backendErrors.password = 'Contraseña incorrecta';
				}
				setErrors(backendErrors); // Actualizamos el estado de errores
				console.error('Errores del login:', backendErrors);
			}
		} catch (error) {
			console.error('Error en la solicitud de login:', error);
		}
	};

	return (
		<>
		<PurchaseHistoryButton/>
		<form action='/login' method='post' onSubmit={handleSubmit} className= "bg-white text-black min-h-screen min-w-fit flex flex-col justify-center pl-14 pr-12 pt-12 text-xl">
			{/* Imagen para el modo claro */}
			<img className='fixed top-0 right-0 w-[13rem] -z-1 block dark:hidden' src="../../../public/rombo-top-color.svg" alt="Background flecha izquierda" />
			<img className='fixed bottom-0 left-0 w-[13rem] -z-1 rotate-180 block dark:hidden' src="../../../public/rombo-top-color.svg" alt="Background flecha izquierda" />
			{/* Imagen para el modo oscuro */}
			<img className='fixed top-0 right-0 w-[13rem] -z-1 hidden dark:block' src="../../../public/rombo-top.svg" alt="Background flecha izquierda" />
			<img className='fixed bottom-0 left-0 w-[13rem] -z-1 rotate-180 hidden dark:block' src="../../../public/rombo-top.svg" alt="Background flecha izquierda" />
			
			{/* Campo para ingresar el nombre */}
			<div className='mb-5'>
				<label className='block mb-2 text-bg dark:text-dark-bg'>Nombre de usuario, celular o correo</label>
				<input
					type='text'
					className='w-full p-2 border border-gray-300 bg-[#d9d9d9] rounded-lg mt-1 bg-primary dark:bg-dark-tertiary'
					value={user}
					onChange={e => setUser(e.target.value)}
					required
				/>
				{errors.user && <p className='text-red-500 text-sm'>{errors.user}</p>}
			</div>

			{/* Campo para ingresar la contraseña */}	
			<div className='mb-4'>
				<label className='block mb-1 text-bg dark:text-dark-bg'>Contraseña</label>
				<input
					type='password'
					className='w-full p-2 border border-gray-300 bg-[#d9d9d9] rounded-lg mt-2 bg-primary dark:bg-dark-tertiary'
					value={contrasena}
					onChange={e => setContrasena(e.target.value)}
					required
				/>
				{errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
			</div>
            
            
            <div className='flex flex-col justify-center justify-items-center'>
                {/* Botón para iniciar sesión */}
                <button
                    type='submit'
                    className='w-full bg-inherit text-red-800 dark:text-dark-bg py-2 px-0 flex items-center justify-center rounded-none underline font-normal'>
                    Iniciar sesión
                </button>
                {/* Botón para recuperar contraseña */}
                <button
                    type='submit'
                    className='w-full bg-inherit text-red-800 dark:text-dark-bg py-2 px-0 flex items-center justify-center rounded-none underline font-normal'>
                    ¿Olvidaste tu contraseña?
                </button>
            </div>
		</form>
		</>
	);
};
