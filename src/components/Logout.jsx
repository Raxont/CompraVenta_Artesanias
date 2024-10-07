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
				window.location.href = 'http://localhost:3000/login';
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