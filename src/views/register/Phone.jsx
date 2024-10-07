import { useState } from 'react';
import PurchaseHistoryButton from '../../components/PurchaseHistoryButton'
import { initTheme } from '../../tools/theme'; // Importa la lógica para inicializar el tema.

export function Phoneform() {
	initTheme();

	// Estados para almacenar los valores de los campos del formulario
	const [nombre, setNombre] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [phone3, setPhone3] = useState('+51'); // Código de país por defecto
	const [contrasena1, setContrasena1] = useState('');
	const [contrasena2, setContrasena2] = useState('');
	const [genero, setGenero] = useState('');
	const [dia, setDia] = useState('');
	const [mes, setMes] = useState('');
	const [ano, setAno] = useState('');
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};

		if (!nombre) newErrors.nombre = 'El nombre de usuario es obligatorio';
		if (!phone1) newErrors.phone1 = 'El número de celular es obligatorio';
		if (!phone2) newErrors.phone2 = 'Confirma tu número de celular';
		if (phone1 !== phone2) newErrors.phone2 = 'Los números de celular no coinciden';
		if (!contrasena1) newErrors.contrasena1 = 'La contraseña es obligatoria';
		if (!contrasena2) newErrors.contrasena2 = 'Debes confirmar tu contraseña';
		if (contrasena1 !== contrasena2) newErrors.contrasena2 = 'Las contraseñas no coinciden';

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		// Generar un número aleatorio de 10 dígitos
		const randomId = Math.floor(1000000000 + Math.random() * 9000000000);


		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id:randomId.toString(),
					nombre,
					correo:"",
					password: contrasena1,
					tipo: 'comprador',
					fotoPerfil:"",
					genero,
					fechaNacimiento: `${ano}-${mes}-${dia}`,
					direccion: '',
                    telefono: `${phone3} ${phone1}`,
                    favoritos: [],
                    compras: [],
                    talleresInscritos: [],
                    cupones: [],
                    provider:"phone",
					carritoCompras:[]
				}),
			});

			const data = await response.json();

			if (response.ok) {
				window.location.href = '/checks'; // Redirige al usuario a la página de login después del registro
			} else {
				const backendErrors = {};

				if (data.errors) {
					data.errors.forEach(error => {
						backendErrors[error.path] = error.msg;
					});
				} else {
					backendErrors.general = 'Error en el registro';
				}

				setErrors(backendErrors);
				console.error('Errores del registro:', backendErrors);
			}
		} catch (error) {
			console.error('Error en la solicitud de registro:', error);
		}
	};

	return (
		<>
		<PurchaseHistoryButton/>
		<form action='/checks' method='post' onSubmit={handleSubmit} className= "bg-white text-black min-h-screen min-w-fit flex-col justify-center pl-14 pr-12 pt-12 text-xl">
			{/* Imagen para el modo claro */}
			<img 
				className='fixed bottom-0 right-0 w-[14rem] z-0 block dark:hidden' 
				src="../../../public/rombo-bottom-color.svg" 
				alt="Background flecha izquierda (Light)" 
			/>
			{/* Imagen para el modo oscuro */}
			<img 
				className='fixed bottom-0 right-0 w-[13rem] z-0 hidden dark:block' 
				src="../../../public/rombo-bottom.svg" 
				alt="Background flecha izquierda (Dark)" 
			/>

			{/* Campo para ingresar el nombre */}
			<div className='mb-5'>
				<label className='block mb-2 text-primary dark:text-dark-bg'>Nombre de usuario*</label>
				<small className='text-gray-500 text-sm block'>*Crea un nombre de usuario de mínimo 5 y máximo de 12 caracteres</small>
				<input
					type='text'
					className='w-full p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-4 z-10 relative'
					value={nombre}
					onChange={e => setNombre(e.target.value)}
					required
				/>
				{errors.nombre && (
					<p className='text-red-500 text-sm'>{errors.nombre}</p>
				)}
			</div>

			{/* Campo para ingresar el telefono */}
            <label className='block mb-2 text-primary dark:text-dark-bg'>Número de celular*</label>
			<div className='mb-4 flex gap-4'>
				<div className='relative'>
					<select
						className="p-3 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg appearance-none"
						style={{ backgroundImage: "none", color: phone3 ? "black" : "grey"}} 
						value={phone3}
						onChange={(e) => setPhone3(e.target.value)}
						>
						<option value="+51" className="text-black">+51</option>
						<option value="+1" className="text-black">+1</option>
						<option value="+34" className="text-black">+34</option>
						<option value="+57" className="text-black">+57</option>
					</select>

					{/* Flecha SVG personalizada */}
					<div className="w-[30px] pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-secondary dark:text-dark-bg">
					<box-icon
							name="chevron-down"
							class="fill-current"
							size="md"
					></box-icon>
					</div>
				</div>
                    <input
                        type='phone'
                        className='w-auto p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg z-10 relative'
                        value={phone1}
                        onChange={e => setPhone1(e.target.value)}
                        required
                    />
				{errors.phone1 && <p className='text-red-500 text-sm'>{errors.phone1}</p>}
			</div>
            
            <label className='block mb-2 text-primary dark:text-dark-bg'>Confirma tu celular*</label>
			{errors.phone2 && <p className='text-red-500 text-sm'>{errors.phone2}</p>}
			{/* Campo validar el telefono */}
			<div className='mb-4 flex gap-4'>
				<div className='relative'>
					<select
						className="p-3 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg appearance-none"
						style={{ backgroundImage: "none", color: phone3 ? "black" : "grey"}} 
						value={phone3}
						onChange={(e) => setPhone3(e.target.value)}
						>
						<option value="+51" className="text-black">+51</option>
						<option value="+1" className="text-black">+1</option>
						<option value="+34" className="text-black">+34</option>
						<option value="+57" className="text-black">+57</option>
					</select>

					{/* Flecha SVG personalizada */}
					<div className="w-[30px] pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0 text-secondary dark:text-dark-bg">
					<box-icon
							name="chevron-down"
							class="fill-current"
							size="md"
					></box-icon>
					</div>
				</div>
				<input
					type='phone'
					className='w-auto p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg z-10 relative'
					value={phone2}
					onChange={e => setPhone2(e.target.value)}
					required
				/>
				
			</div>
			{/* Campo para ingresar la contraseña */}	
			<div className='mb-4'>
				<label className='block mb-1 text-primary dark:text-dark-bg'>Contraseña*</label>
				<small className='text-gray-500 text-sm block mb-2'>Recuerda crear una contraseña difícil de adivinar</small>
				<input
					type='password'
					className='w-full p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-2 z-10 relative'
					value={contrasena1}
					onChange={e => setContrasena1(e.target.value)}
					required
					minLength="6"
				/>
				{errors.contrasena1 && <p className='text-red-500 text-sm'>{errors.contrasena1}</p>}
			</div>

			{/* Campo para verificar la contraseña */}
			<div className='mb-4'>
				<label className='block mt-2 text-primary dark:text-dark-bg'>Confirma tu contraseña*</label>
				<input
					type='password'
					className='w-full p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-2 z-10 relative'
					value={contrasena2}
					onChange={e => setContrasena2(e.target.value)}
					required
				/>
				{errors.contrasena2 && <p className='text-red-500 text-sm'>{errors.contrasena2}</p>}
			</div>

			 {/* Selección de género */}
			 <div className="mb-4">
			<label className="block mt-2 text-primary dark:text-dark-bg">
				Género
			</label>
			<div className="relative w-2/3 mt-2">
				<select
				className="p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg w-full appearance-none"
				style={{ backgroundImage: "none", color: genero ? "black" : "grey"}} 
				value={genero}
				onChange={(e) => setGenero(e.target.value)}
				>
				<option value="" className="text-black"></option>
				<option value="Masculino" className="text-black">Masculino</option>
				<option value="Femenino" className="text-black">Femenino</option>
				</select>

				{/* Flecha SVG personalizada */}
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary dark:text-dark-bg">
				<box-icon
					name="chevron-down"
					class="fill-current"
					size="md"
				></box-icon>
				</div>
			</div>
			{errors.genero && <p className='text-red-500 text-sm'>{errors.genero}</p>}
			</div>

			{/* Selección de fecha de nacimiento */}
			<label className="block text-primary dark:text-dark-bg">
			Fecha de nacimiento
			</label>
			<div className="mb-4 flex w-4/5 justify-between gap-1">
			<div className="">
				<div className="relative items-center text-center object-center">
				<select
					className="w-15 p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-2 z-10"
					style={{ backgroundImage: "none", color: dia ? "black" : "gray" }} 
					value={dia}
					onChange={(e) => setDia(e.target.value)}
				>
					<option value="" disabled hidden>
					DD
					</option>
					{/* Generar días del 1 al 31 */}
					{Array.from({ length: 31 }, (_, i) => (
					<option className="text-black" key={i + 1} value={i + 1}>
						{i + 1}
					</option>
					))}
				</select>
				{/* Flecha SVG personalizada */}
				<div className="pointer-events-none absolute inset-y-0 right-0 top-2 flex items-center pr-1 text-secondary dark:text-dark-bg">
					<box-icon
					name="chevron-down"
					class="fill-current"
					size="md"
					></box-icon>
				</div>
				</div>
			</div>
			<div className="">
				<div className="relative items-center text-center object-center">
				<select
					className="w-15 p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-2 z-10"
					style={{ backgroundImage: "none", color: mes ? "black" : "gray" }} 
					value={mes}
					onChange={(e) => setMes(e.target.value)}
					>
					<option value="" disabled hidden>
						MM
					</option>
					{/* Generar meses del 1 al 12 */}
					{Array.from({ length: 12 }, (_, i) => (
						<option className="text-black" key={i + 1} value={i + 1}>
						{i + 1}
						</option>
					))}
				</select>
				{/* Flecha SVG personalizada */}
				<div className="pointer-events-none absolute inset-y-0 right-0 top-2 flex items-center pr-1 text-secondary dark:text-dark-bg">
					<box-icon
					name="chevron-down"
					class="fill-current"
					size="md"
					></box-icon>
				</div>
				</div>
			</div>
			<div className="">
				<div className="relative items-center text-center object-center">
				<select
					className="w-15 p-2 border border-gray-300 bg-primary dark:bg-dark-tertiary rounded-lg mt-2 text-gray-400 dark:text-gray-600 z-10"
					style={{ backgroundImage: "none", color: ano ? "black" : "gray" }} 
					value={ano}
					onChange={(e) => setAno(e.target.value)}
				>
					<option
					className="text-secondary dark:text-gray-600"
					value=""
					disabled
					hidden
					>
					YYYY
					</option>
					{/* Generar años desde 1900 hasta el presente */}
					{Array.from(
					{ length: new Date().getFullYear() - 1899 },
					(_, i) => (
						<option
						className="text-black"
						key={i + 1900}
						value={i + 1900}
						>
						{i + 1900}
						</option>
					)
					)}
				</select>
				{/* Flecha SVG personalizada */}
				<div className="pointer-events-none absolute inset-y-0 right-0 top-2 flex items-center pr-1 text-secondary dark:text-dark-bg">
					<box-icon
					name="chevron-down"
					class="fill-current"
					size="md"
					></box-icon>
				</div>
				</div>
			</div>
			</div>
			{/* Botón de registro */}
			<button
				type='submit'
				className='w-full bg-transparent text-primary dark:text-black py-4 px-0 flex items-center justify-end rounded-none underline font-normal z-10 relative'
			>
				<div className='text-secondary dark:text-dark-bg'>
					<box-icon name='chevron-right' size='md' class="fill-current"></box-icon>
				</div>
				Continuar
			</button>
			
		</form>
		</>
	);
};
