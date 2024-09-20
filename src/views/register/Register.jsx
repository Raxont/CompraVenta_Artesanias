import 'boxicons'

export default function Component() {
  return (
    
    <div className="min-h-screen bg-[url('../../../public/fondo.webp')] bg-zinc-700 bg-cover bg-center bg-blend-overlay flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full space-y-8  p-10 ">
        <h1 className="text-3xl text-center text-black">
          Regístrate ahora y obtén las mejores promociones en{" "}
          <span className="text-black font-bold">artesanías peruanas</span>
        </h1>

        <div className="space-y-4 text-black text-xl">
          <button className="w-full flex items-center white bg-white hover:bg-white gap-2">
            <box-icon type='logo' name='facebook-circle'></box-icon>
                Regístrate con Facebook
          </button>

          <button className="w-full flex items-center white bg-white hover:bg-white gap-2">
          <box-icon name='instagram' type='logo' ></box-icon>
            Regístrate con Instagram
          </button>

          <button className="w-full flex items-center bg-white hover:bg-white gap-2">
          <box-icon name='gmail' type='logo' ></box-icon>
            Regístrate con Gmail
          </button>

          <button className="w-full flex items-center white bg-white hover:bg-white gap-2">
          <box-icon name='envelope' ></box-icon>
            Regístrate con tu correo
          </button>

          <button className="w-full flex items-center white bg-white hover:bg-white gap-2">
          <box-icon name='phone' ></box-icon>
            Regístrate con tu celular
          </button>
        </div>

        <div className="text-center text-black text-3xl">
          <p>¿Ya tienes una cuenta?</p>
          <a href="#" className="text-black  underline">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
