import { useNavigate } from 'react-router-dom';
import { initTheme } from '../../tools/theme'; // Importa la lógica para inicializar el tema.
import 'boxicons';

export function Login() {
	initTheme();
	const navigate = useNavigate();
	const handleDiscordClick = () => {
		const popup = window.open(
			'/api/users/discord', // * Ruta para autenticación con Discord
			'targetWindow',
			'width=950,height=900,menubar=no,location=no,resizable=no,scrollbars=no,status=no' // ? Configuración del popup
		);

		const allowedOrigin = import.meta.env.VITE_USE_TUNNEL === "true"
			? import.meta.env.VITE_TUNNEL_URL_BACKEND
			: import.meta.env.VITE_HTTP_BACKEND;

		const messageListener = event => {
			if (event.origin === allowedOrigin) {
				try {
					const data = JSON.parse(event.data);
					const parsedData = JSON.parse(data); // * Analiza los datos recibidos

					if (parsedData.token && parsedData.userData) {
						// ? Verifica si el token y los datos del usuario existen
						if (popup && !popup.closed) popup.close(); // * Cierra el popup si el login es exitoso
					} else {
						console.error(
							'Error en el login:',
							parsedData.message || 'Respuesta inesperada',
						);
					}
				} catch (err) {
					console.error('Error al procesar los datos:', err); // ! Muestra error si hay un problema al procesar los datos
				}
			}
		};

		window.addEventListener('message', messageListener); // * Escucha los mensajes del popup
		setTimeout(() => handlePopupTimeout(popup, messageListener), 30000); // ! Timeout de 30 segundos si no se recibe respuesta
	};


	const handleGithubClick = () => {
		const popup = window.open(
			'/api/users/github', // * Ruta para autenticación con Github
			'targetWindow',
			'width=950,height=900,menubar=no,location=no,resizable=no,scrollbars=no,status=no', // ? Configuración del popup
		);

		const messageListener = event => {
			const allowedOrigin = import.meta.env.VITE_USE_TUNNEL === "true"
				? import.meta.env.VITE_TUNNEL_URL_BACKEND
				: import.meta.env.VITE_HTTP_BACKEND;

			if (event.origin === allowedOrigin) {
				try {
					const data = JSON.parse(event.data);
					const parsedData = JSON.parse(data); // * Analiza los datos recibidos

					if (parsedData.token && parsedData.userData) {
						// ? Verifica si el token y los datos del usuario existen
						if (popup && !popup.closed) popup.close(); // * Cierra el popup si el login es exitoso
					} else {
						console.error(
							'Error en el login:',
							parsedData.message || 'Respuesta inesperada',
						);
					}
				} catch (err) {
					console.error('Error al procesar los datos:', err); // ! Muestra error si hay un problema al procesar los datos
				}
			}
		};


		window.addEventListener('message', messageListener); // * Escucha los mensajes del popup
		setTimeout(() => handlePopupTimeout(popup, messageListener), 30000); // ! Timeout de 30 segundos si no se recibe respuesta
	};

	const handleGoogleClick = () => {
		const popup = window.open(
			'/api/users/google', // * Ruta para autenticación con Gmail
			'targetWindow',
			'width=950,height=900,menubar=no,location=no,resizable=no,scrollbars=no,status=no', // ? Configuración del popup
		);

		const messageListener = event => {
			const allowedOrigin = import.meta.env.VITE_USE_TUNNEL === "true"
				? import.meta.env.VITE_TUNNEL_URL_BACKEND
				: import.meta.env.VITE_HTTP_BACKEND;

			if (event.origin === allowedOrigin) {
				try {
					const data = JSON.parse(event.data);
					const parsedData = JSON.parse(data); // * Analiza los datos recibidos

					if (parsedData.token && parsedData.userData) {
						// ? Verifica si el token y los datos del usuario existen
						if (popup && !popup.closed) popup.close(); // * Cierra el popup si el login es exitoso
					} else {
						console.error(
							'Error en el login:',
							parsedData.message || 'Respuesta inesperada',
						);
					}
				} catch (err) {
					console.error('Error al procesar los datos:', err); // ! Muestra error si hay un problema al procesar los datos
				}
			}
		};


		window.addEventListener('message', messageListener); // * Escucha los mensajes del popup
		setTimeout(() => handlePopupTimeout(popup, messageListener), 30000); // ! Timeout de 30 segundos si no se recibe respuesta
	};

	// ! Función para manejar el timeout y cerrar el popup si no hay respuesta
	const handlePopupTimeout = (popup, messageListener) => {
		console.error('Timeout: No se recibió respuesta del login'); // * Muestra mensaje de timeout
		if (popup && !popup.closed) popup.close(); // * Cierra el popup si no hay respuesta
		window.removeEventListener('message', messageListener); // * Remueve el listener de mensajes
	};
	const handleAccountClick = () => {
		navigate('/LogAccount');
	};

	return (

		<div className="h-full w-full bg-cover bg-[url('../../../public/1.png')] bg-center flex flex-col items-center justify-center text-white">
			<div className="h-full bg-[#350909d5] dark:bg-[#969292e0] bg-blend-overlay flex flex-col items-center justify-center">
				<div className="max-w-md w-full space-y-8 p-12 flex flex-col gap-4 ">
					<h1 className="text-4xl w-[100%] text-center text-white dark:text-black">
						Inicia sesión y continúa viendo{" "}
						<span className="text-secondary dark:text-black font-bold">tus artesanías favoritas</span>
					</h1>

					<div className="space-y-6 text-white dark:text-black text-xl flex flex-col gap-2">
						<button className="w-full flex items-center bg-primary dark:bg-white hover:bg-dark-bg dark:hover:bg-dark-primary gap-4" onClick={handleGoogleClick}>
							<box-icon type="logo" name="google" size="md" class="fill-current"></box-icon>
							Inicia sesión con Google
						</button>

						<button className="w-full flex items-center bg-primary dark:bg-white hover:bg-dark-bg dark:hover:bg-dark-primary gap-4" onClick={handleDiscordClick}>
							<box-icon name='discord' type='logo' size="md" class="fill-current"></box-icon>
							Inicia sesión con Discord
						</button>

						<button className="w-full flex items-center bg-primary dark:bg-white hover:bg-dark-bg dark:hover:bg-dark-primary gap-4" onClick={handleGithubClick}>
							<box-icon type='logo' name='github' size="md" class="fill-current"></box-icon>
							Inicia sesión con Github
						</button>

						<button className="w-full flex items-center bg-primary dark:bg-white hover:bg-dark-bg dark:hover:bg-dark-primary gap-4" onClick={handleAccountClick}>
							<box-icon name='user' size="md" class="fill-current"></box-icon>
							Inicia sesión con tu cuenta de Ruraq Maki
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
