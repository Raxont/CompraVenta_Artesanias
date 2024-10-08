import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import SearchBar from "../../components/SearchBar";
import { initTheme } from '../../tools/theme';
import { useNavigate } from 'react-router-dom';

export function User() {
  initTheme();

  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    fotoPerfil: '',
    genero: '',
    fechaNacimiento: '',
    telefono: ''
  });
  const [originalUserData, setOriginalUserData] = useState(null); // Para mantener los datos originales
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/users/session-data', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          // Asegúrate de que el userId esté presente
          if (data.userId) {
            setUserId(data.userId);
            fetchUserData(data.userId);
          } else {
            console.error('No estás autenticado'); // Si no hay userId, manejar el error
            navigate('/login'); // Redirigir al login
          }
        } else {
          console.error('No estás autenticado'); // Si la respuesta no es OK
          navigate('/login'); // Redirigir al login
        }
      } catch (error) {
        console.error('Error al obtener el id del usuario:', error);
        navigate('/login'); // Redirigir al login en caso de error
      }
    };
  
    const fetchUserData = async (id) => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setOriginalUserData(data); // Guardamos los datos originales

        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };
  
    fetchUserId();
  }, []);

  const handleEdit = () => {
    setOriginalUserData(userData); // Guardamos los datos actuales antes de editar
    setIsEditing(true);
  };

  const handleSave = async () => {
    const userInfo = {
      nombre: userData.nombre,
      correo: userData.correo,
      genero: userData.genero === 'M' ? 'Masculino' : userData.genero === 'F' ? 'Femenino' : userData.genero,
      fechaNacimiento: userData.fechaNacimiento,
      telefono: `${countryCode} ${phoneNumber}`
    }
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error('Error al guardar la información');
      }
    } catch (error) {
      console.error('Error al guardar la información:', error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("/api/users/upload-profile-picture", {
          method: "POST",
          body: formData,
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          // Actualiza la foto de perfil en la base de datos y el frontend
          setUserData((prev) => ({ ...prev, fotoPerfil: data.newImagePath }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleCancel = () => {
    setUserData(originalUserData); // Restauramos los datos originales
    setIsEditing(false); // Salimos del modo de edición
  };
  const [countryCode, phoneNumber] = userData.telefono.split(' ');
  return (
    <>
    <SearchBar usuario={userId} setSearchQuery={setSearchQuery} />
    <div className="flex flex-col h-full w-full text-black pt-[4.5em]">
      {/* Imagen para el modo oscuro */}
      <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-1 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-1 rotate-180 hidden dark:block' src="../../../Rectangle 47.svg" alt="Background flecha Derecha" />
      {/* Imagen para el modo claro */}
      <img className='fixed bottom-[5rem] left-0 w-[13rem] -z-1 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha izquierda" />
			<img className='fixed top-[5rem] right-0 w-[13rem] -z-1 rotate-180 block dark:hidden' src="../../../Rectangle 47-color.svg" alt="Background flecha Derecha" />
      <main className="flex-1 p-4 z-10">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
          <h1 className="mt-4 text-xl text-red-800 dark:text-dark-bg pb-2">Foto de perfil</h1>
          <div className="relative inline-block">
            <img
              alt="Profile picture"
              className="rounded-full border-2 border-red-800 dark:border-0 w-33 h-33 object-cover"
              height="180"
              src={`/api/fotos-de-perfil/${userData.fotoPerfil}`}
              style={{
                aspectRatio: "180/180",
                objectFit: "cover",
              }}
              width="180"
            />
            <button
              className="absolute -bottom-2 right-[4.2rem] bg-transparent p-2"
              size="icon"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <box-icon name="edit-alt"></box-icon>
            </button>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
            
          </div>
          <div className="space-y-8 pl-2 pt-2">
            <div className="flex items-center gap-8 text-red-800 dark:text-dark-bg">
              <label className="text-base font-semibold" htmlFor="nombre">
                Usuario:
              </label>
              <div className="flex items-center">
                <input
                  className="w-64 h-10 mr-2 border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md pl-5 text-black"
                  id="nombre"
                  value={userData.nombre}
                  onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                  disabled={!isEditing}
                />
                <button size="icon" onClick={handleEdit} className="w-15 bg-transparent p-0">
                  <box-icon name='edit-alt' class="fill-current"></box-icon>
                </button>
              </div>
            </div>
           <div className="flex items-center gap-[2.3rem] text-red-800 dark:text-dark-bg">
              <label className="text-base font-semibold" htmlFor="correo">
                Correo:
              </label>
              <div className="flex items-center ">
                <input
                  className="w-64 h-10 mr-2 pl-5 border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 text-black"
                  id="correo"
                  value={userData.correo}
                  onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
                  disabled={!isEditing}
                />
                <button size="icon" onClick={handleEdit} className="w-15 bg-transparent p-0">
                  <box-icon name='edit-alt' class="fill-current"></box-icon>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-9 text-red-800 dark:text-dark-bg">
              <label className="text-base font-semibold" htmlFor="telefono">
                Celular:
              </label>
              <div className="flex items-center">
                <input 
                  className="w-10 h-10 mr-2 flex text-center border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md text-black" 
                  value={countryCode || ''} // Muestra el indicativo
                  onChange={(e) => setUserData({ ...userData, telefono: `${e.target.value} ${phoneNumber}` })}
                  disabled={!isEditing}
                />
                <input
                  className="w-[13rem] h-[2.5rem] mr-2 pl-5 text-base border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 text-black"
                  id="telefono"
                  placeholder="Añadir número de celular"
                  value={phoneNumber || ''} // Muestra el número
                  onChange={(e) => setUserData({ ...userData, telefono: `${countryCode} ${e.target.value}` })}
                  disabled={!isEditing}
                />
                <button size="icon" onClick={handleEdit} className="w-15 bg-transparent p-0">
                  <box-icon name='edit-alt' class="fill-current"></box-icon>
                </button>
              </div>
            </div>
            <div className="flex w-full gap-4 text-red-800 dark:text-dark-bg">
                <div className="flex items-center gap-1">
                <label htmlFor="genero" className="text-base font-semibold">Genero:</label>
                <div className="flex items-center">
                  <select 
                    className="w-13 h-9 mr-1 border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 flex text-center text-black"
                    value={userData.genero}
                    onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
                    disabled={!isEditing}
                  >
                    <option value='M'>M</option>
                    <option value='F'>F</option>
                  </select>
                  <button size="icon" onClick={handleEdit} className="w-15 bg-transparent p-0">
                  <box-icon name='edit-alt' class="fill-current"></box-icon>
                  </button>
                </div>
                </div>
                <div className="flex items-center">
                <label className="text-base font-semibold w-[6.2rem]" htmlFor="fechaNacimiento">
                    Fecha de nacimiento:
                </label>
                <div className="flex items-center">
                    <input className="w-28 h-8 mr-2 border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 flex text-center text-black" 
                    id="fechaNacimiento"
                    type="string" 
                    value={userData.fechaNacimiento.slice(0, 10)}
                    onChange={(e) => setUserData({ ...userData, fechaNacimiento: e.target.value })}
                    disabled={!isEditing}/>
                    <button size="icon" onClick={handleEdit} className="w-6 bg-transparent p-0">
                    <box-icon name='edit-alt' class="fill-current"></box-icon>
                    </button>
                </div>
                </div>
            </div>
            {isEditing && (
                  <div className="flex space-x-4">
                    <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
                    <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancelar</button>
                  </div>
                )}
          </div>
          <div className="space-y-5 text-primary dark:text-dark-bg pt-8 pl-2">
            <h2 className="text-xl font-semibold ">Métodos de pago</h2>
            <div className="p-4 shadow w-[95%] border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 h-12 text-quintier dark:text-dark-primary">
              <p className='m-[-3px] pl-2'>Visa Mastercard</p>
            </div>
            <button className="w-[95%] h-12 border-gray-300 bg-primary dark:bg-dark-tertiary rounded-md border-0 text-start text-quintier dark:text-dark-primary font-semibold" >
              Añadir método de pago
            </button>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
    
    </>          
  )
}