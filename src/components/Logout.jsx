import { useState } from 'react';
import { initTheme } from '../tools/theme';


const Logout = () => {
	initTheme();

	const [error, setError] = useState(null);

	const handleLogout = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/users/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (response.ok) {
				// Redirige al usuario a la página de login después de cerrar sesión
				const loginUrl = import.meta.env.VITE_USE_TUNNEL === "true"
					? import.meta.env.VITE_TUNNEL_URL_FRONEND
					: import.meta.env.VITE_HTTP_FRONTEND; // Utiliza la URL de backend según la variable de entorno

				window.location.href = `${loginUrl}/login`;
			} else {
				setError('Error en el logout. Intenta nuevamente.');
			}
		} catch (error) {
			console.error('Error en el logout:', error);
			setError('Error en la solicitud. Intenta nuevamente.');
		}
	};


	return (
		<>
			<button
				onClick={handleLogout}
				className='w-full bg-primary dark:bg-dark-primary text-white py-2 rounded hover:bg-red-600'
			>
				Cerrar sesión
			</button>
			{error && <p className='text-red-500 mt-4'>{error}</p>}
		</>
	);
};

export default Logout;