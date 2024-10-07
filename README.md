# Proyecto Express - Aplicación de Compra y Venta de Artesanías

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de una **Aplicación de Compra y Venta de Artesanías**. La aplicación conecta a artesanos de **Bucaramanga** con compradores interesados en productos artesanales únicos. La plataforma es solicitada y gestionada por **Campuslands**, una empresa comprometida con la promoción y comercialización de productos locales, artesanales y tecnológicos.

### Problemas que Soluciona

1. **Limitada Visibilidad y Alcance**: Los artesanos locales tienen dificultades para exponer sus productos fuera de su área geográfica.
2. **Dificultades en la Gestión de Ventas**: Los artesanos carecen de herramientas eficientes para gestionar inventarios, precios y pedidos.
3. **Falta de Acceso a Recursos de Comercialización**: Los artesanos no disponen de plataformas para promocionar sus productos ni ofrecer descuentos.
4. **Comunicación Ineficiente con Compradores**: Los compradores tienen dificultades para contactar directamente a los artesanos.

## Características Principales

1. **Gestión de Usuarios**
   - Registro e inicio de sesión.
   - Perfiles de usuarios (compradores), con opciones para actualizar información, foto de perfil, ver favoritos, historial de compras y talleres inscritos.
   - Chat directo entre compradores y artesanos.

2. **Gestión de Productos**
   - Listado y visualización de productos artesanales.
   - Los artesanos pueden crear cupones de descuento.

3. **Búsqueda y Filtrado**
   - Búsqueda por nombre o descripción de productos.
   - Filtrado de productos por categorías y talleres por criterios relevantes.

4. **Carrito y Proceso de Compra**
   - Carrito de compras con cupones aplicables y proceso de pago.

5. **Talleres Artesanales**
   - Información detallada sobre talleres presenciales y virtuales, incluyendo fechas, duración y materiales.

6. **Comunicación Directa**
   - Mensajería instantánea entre compradores y artesanos para preguntas y respuestas rápidas.

## Variables de Entorno

El archivo `.env` contiene las configuraciones necesarias para el correcto funcionamiento de la aplicación, tanto en el entorno de desarrollo como en producción. Asegúrate de configurar correctamente cada una de las siguientes variables de entorno antes de ejecutar el proyecto:

# Claves y secretos para el manejo de autenticación y sesiones

KEY_SECRET=
SESSION_SECRET=

# Configuraciones del servidor

VITE_EXPRESS_EXPIRE=600000
VITE_HOST=localhost
VITE_PORT_BACKEND=3001
VITE_PORT_FRONTEND=3000

# Configuraciones opcionales para túnel

VITE_TUNNEL_URL=
VITE_USE_TUNNEL=false

# Configuraciones de la base de datos MongoDB

VITE_MONGO_ACCESS=
VITE_MONGO_USER=
VITE_MONGO_PWD=
VITE_MONGO_HOST=
VITE_MONGO_PORT=
VITE_MONGO_DB_NAME=


### Explicación de las Variables

- `KEY_SECRET`: Clave secreta para el manejo de tokens (JWT o similares).
- `SESSION_SECRET`: Secreto para el manejo de sesiones del lado del servidor.
- `VITE_EXPRESS_EXPIRE`: Tiempo de expiración de tokens, establecido en milisegundos.
- `VITE_HOST`: Nombre del host donde se está ejecutando la aplicación.
- `VITE_PORT_BACKEND`: Puerto donde corre el backend del proyecto.
- `VITE_PORT_FRONTEND`: Puerto donde corre el frontend del proyecto.
- `VITE_TUNNEL_URL`: URL de un túnel externo (opcional, usado en desarrollo remoto).
- `VITE_USE_TUNNEL`: Booleano para habilitar o deshabilitar el uso del túnel.
- `VITE_MONGO_ACCESS`: URL de conexión para la base de datos de MongoDB.
- `VITE_MONGO_USER`: Usuario para la conexión a MongoDB.
- `VITE_MONGO_PWD`: Contraseña del usuario de MongoDB.
- `VITE_MONGO_HOST`: Host del servidor MongoDB.
- `VITE_MONGO_PORT`: Puerto del servidor MongoDB.
- `VITE_MONGO_DB_NAME`: Nombre de la base de datos a la que se conectará la aplicación.

### Instrucciones para el Uso del Proyecto

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   ```

2. Clona el repositorio:

   ```bash
   npm install
   ```

3. Clona el repositorio:

   ```bash
   npm run dev
   ```