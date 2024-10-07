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



# Explicación de los Endpoints



## Pagos

### 1. **Obtener todos los pagos**
- **URL:** `/`
- **Método:** `GET`
- **Descripción:** Recupera una lista de todos los pagos.
- **Solicitud:**
  - Sin parámetros

- **Respuestas:**
  - `200 OK`: Devuelve la lista de pagos.
  - `400 Solicitud incorrecta`: Errores de validación o solicitud mal formada.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.


### 2. **Obtener pago por ID**
- **URL:** `/:id`
- **Método:** `GET`
- **Descripción:** Recupera un pago por su ID único.
- **Parámetros de la solicitud:**
  - `id` (parámetro de ruta): El ID del pago (validado).

- **Respuestas:**
  - `200 OK`: Devuelve los detalles del pago.
  - `400 Bad Request`: Errores de validación para el ID de pago.
  - `404 Not Found`: Si no se encuentra el pago con el ID indicado.
  - `500 Internal Server Error`: Cualquier otro error del servidor.


### 3. **Crear un nuevo pago**
- **URL:** `/`
- **Método:** `POST`
- **Descripción:** Crea un nuevo pago.
- **Cuerpo de la solicitud:**
  - Datos del pago (validados)

- **Respuestas:**
  - `201 Created`: Pago creado correctamente.
  - `400 Bad Request`: Errores de validación en los datos de la solicitud.
  - `500 Internal Server Error`: Cualquier otro error del servidor.


### 4. **Actualizar pago por ID**
- **URL:** `/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza un pago existente por su ID.
- **Parámetros de la solicitud:**
  - `id` (parámetro de ruta): el ID del pago (validado).

- **Cuerpo de la solicitud:**
  - Datos de pago actualizados (validados)

- **Respuestas:**
  - `200 OK`: Pago actualizado correctamente.
  - `400 Solicitud incorrecta`: Errores de validación o solicitud mal formada.
  - `404 No encontrado`: Si no se encuentra el pago con el ID indicado.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.


### 5. **Eliminar pago por ID**
- **URL:** `/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un pago por su ID único.
- **Parámetros de la solicitud:**
  - `id` (parámetro de ruta): el ID del pago (validado).

- **Respuestas:**
  - `204 Sin contenido`: Pago eliminado correctamente.
  - `400 Bad Request`: errores de validación o solicitud mal formada.
  - `404 Not Found`: si no se encuentra el pago con la identificación dada.
  - `500 Internal Server Error`: cualquier otro error del servidor.


### 6. **Buscar pagos por nombre**
- **URL:** `/search`
- **Método:** `GET`
- **Descripción:** busca pagos por su nombre utilizando el parámetro de consulta `name`.
- **Parámetros de consulta de solicitud:**
  - `name`: el nombre del pago que se buscará.

- **Respuestas:**
  - `200 OK`: devuelve los pagos que coinciden con los criterios de búsqueda.
  - `500 Internal Server Error`: cualquier otro error del servidor.


## Validadores

### Validador de pagos
La API utiliza `paymentsValidator` para validar los datos de solicitud entrantes para las identificaciones y los datos de pago, lo que garantiza una entrada limpia y evita datos incorrectos.

## Manejo de errores
Cada método detecta los errores y devuelve el código de estado HTTP correspondiente junto con una respuesta JSON que contiene el mensaje de error. Por ejemplo:
- `400 Solicitud incorrecta`: para problemas de validación.

- `404 No encontrado`: para recursos faltantes (por ejemplo, pagos).

- `500 Error interno del servidor`: para cualquier error del servidor no manejado.

  

------



## Pedidos

### 1. **Obtener todas las solicitudes**
- **URL:** `/`
- **Método:** `GET`
- **Descripción:** Obtiene todos los pedidos del sistema.
- **Solicitud:** Sin parámetros.
- **Respuestas:**
- `200 OK`: Devuelve la lista de todas las solicitudes.
- `500 Error interno del servidor`: Si hay un problema con la obtención de datos.

### 2. **Obtener pedidos por ID de usuario**
- **URL:** `/user/:id`
- **Método:** `GET`
- **Descripción:** Obtiene todos los pedidos realizados por un usuario específico.
- **Parámetros de la solicitud:**
- `id`: ID de usuario (validado).
- **Respuestas:**
- `200 OK`: Devuelve los pedidos del usuario especificado.
- `400 Solicitud incorrecta`: Si el ID de usuario no es válido.
- `500 Error interno del servidor`: si hay un problema con la obtención de datos.

### 3. **Obtener pedido por ID**
- **URL:** `/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un solo pedido por su ID.
- **Parámetros de la solicitud:**
- `id`: ID del pedido (validada).
- **Respuestas:**
- `200 OK`: devuelve los detalles del pedido.
- `400 Solicitud incorrecta`: error de validación para una ID de pedido no válido.
- `404 No encontrado`: si no se encuentra el pedido con la ID especificada.
- `500 Error interno del servidor`: si hay un problema con la obtención de datos.

### 4. **Crear un nuevo pedido**
- **URL:** `/`
- **Método:** `POST`
- **Descripción:** Crea un nuevo pedido.
- **Cuerpo de la solicitud:**
- `usuarioId`: ID del usuario.
- `carrito`: Detalles del carrito de compras.
- `aPagar`: Monto del pago.
- **Respuestas:**
- `201 Created`: Pedido creada exitosamente.
- `400 Bad Request`: Error de validación en los datos del pedido.
- `500 Internal Server Error`: Si hay un problema con la creación del pedido.

### 5. **Actualizar pedido por ID**
- **URL:** `/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza un pedido existente.
- **Parámetros de la solicitud:**
- `id`: ID del pedido (validada).
- **Cuerpo de la solicitud:**
- Datos de la solicitud actualizados (validados).
- **Respuestas:**
- `200 OK`: Pedido actualizado exitosamente.
- `400 Bad Request`: Error de validación o datos de la solicitud no válidos.
- `404 Not Found`: Si no se encuentra la solicitud con el ID especificado.
- `500 Internal Server Error`: Si hay un problema con la actualización de la solicitud.

### 6. **Eliminar pedido por ID**
- **URL:** `/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un pedido existente por su ID.
- **Parámetros de solicitud:**
- `id`: ID de solicitud (validada).
- **Respuestas:**
- `204 Sin contenido`: Pedido eliminada correctamente.
- `400 Solicitud incorrecta`: Error de validación o ID de solicitud no válida.
- `404 Not Found`: Si no se encuentra la solicitud con el ID especificado.
- `500 Internal Server Error`: Si hay un problema con la eliminación de la solicitud.

### 7. **Buscar solicitudes por nombre**
- **URL:** `/search`
- **Método:** `GET`
- **Descripción:** Busca solicitudes por su nombre utilizando el parámetro de consulta `name`.
- **Parámetros de consulta de solicitud:**
- `name`: Nombre de la solicitud que se buscará.
- **Respuestas:**
- `200 OK`: Devuelve las solicitudes coincidentes.
- `500 Error interno del servidor`: Si hay un problema con la búsqueda.

## Validadores

### Validador de solicitudes
La validación se administra utilizando `express-validator` para garantizar la integridad de los datos entrantes:
- Valida `id` para las solicitudes, lo que garantiza que tenga un formato válido.
- Valida los datos del cuerpo de la solicitud al crear o actualizar una solicitud para evitar datos mal formados.

## Manejo de errores
Cada método incluye el manejo de errores con los códigos de estado HTTP adecuados:
- `400 Solicitud incorrecta`: Si se producen errores de validación.
- `404 No encontrado`: si no se encuentra el recurso (por ejemplo, la solicitud).
- `500 Error interno del servidor`: para problemas o excepciones no controlados del servidor.

------



### **Endpoints de Usuarios**

* **Obtener todos los usuarios:** (Como se mostró en el ejemplo anterior)
* **Obtener un usuario por ID:**
    * Método: GET
    * URL: /users/:id
    * Descripción: Obtiene los detalles de un usuario específico por su ID.
* **Crear un nuevo usuario:**
    * Método: POST
    * URL: /users
    * Descripción: Crea un nuevo usuario.
* **Actualizar un usuario:**
    * Método: PUT
    * URL: /users/:id
    * Descripción: Actualiza la información de un usuario existente.
* **Eliminar un usuario:**
    * Método: DELETE
    * URL: /users/:id
    * Descripción: Elimina un usuario.
* **Buscar usuarios:**
    * Método: GET
    * URL: /users/search
    * Descripción: Busca usuarios por nombre.

### **Endpoints de Autenticación**
* **Iniciar sesión con GitHub:**
    * Método: GET
    * URL: /github
    * Descripción: Redirige al usuario a GitHub para autenticarse.
    * ... (otros endpoints de autenticación similares para Google y Discord)
* **Iniciar sesión con cuenta local:**
    * Método: POST
    * URL: /loginAccount
    * Descripción: Inicia sesión con un usuario creado con correo electrónico o teléfono.
* **Cerrar sesión:**
    * Método: POST
    * URL: /logout
    * Descripción: Cierra la sesión del usuario actual.

### **Endpoints del carrito**
* **Obtener carrito de un usuario:**
    * Método: POST
    * URL: /cart/
    * Descripción: Obtiene los productos en el carrito de un usuario específico.
* **Agregar producto al carrito:**
    * Método: PUT
    * URL: /addToCart/:userId
    * Descripción: Agrega un producto al carrito de un usuario.
* **Eliminar producto del carrito:**
    * Método: DELETE
    * URL: /cart
    * Descripción: Elimina un producto del carrito.
* **Incrementar cantidad de producto:**
    * Método: PUT
    * URL: /cart/increase
    * Descripción: Incrementa la cantidad de un producto en el carrito.
* **Decrementar cantidad de producto:**
    * Método: PUT
    * URL: /cart/decrease
    * Descripción: Decrementa la cantidad de un producto en el carrito.

### **Otros Endpoints**
* **Subir foto de perfil:**
    * Método: POST
    * URL: /upload-profile-picture
    * Descripción: Sube una nueva foto de perfil para el usuario.
* **Agregar a favoritos:**
    * Método: PUT
    * URL: /addFavourite/:userId/:productId
    * Descripción: Agrega un producto a los favoritos de un usuario.
* **Eliminar de favoritos:**
    * Método: PUT
    * URL: /removeFavourite/:userId/:productId
    * Descripción: Elimina un producto de los favoritos de un usuario.



## Talleres

### 1. **Obtener todos los talleres**
- **URL:** `/`
- **Método:** `GET`
- **Descripción:** Obtiene todos los talleres del sistema.
- **Solicitud:** Sin parámetros.
- **Respuestas:**
- `200 OK`: Devuelve la lista de todos los talleres.
- `500 Error interno del servidor`: Si hay un problema con la obtención de datos.

### 2. **Obtener taller por ID**
- **URL:** `/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un taller específico por su ID.
- **Parámetros de la solicitud:**
- `id`: ID del taller (validado).
- **Respuestas:**
- `200 OK`: Devuelve los detalles del taller especificado.
- `400 Solicitud incorrecta`: Si el ID del taller no es válido.
- `404 Not Found`: Si no se encuentra el taller con el ID especificado.
- `500 Internal Server Error`: Si hay un problema con la obtención de datos.

### 3. **Crear un nuevo taller**
- **URL:** `/`
- **Método:** `POST`
- **Descripción:** Crea un nuevo taller.
- **Cuerpo de la solicitud:**
- `name`: Nombre del taller.
- `description`: Descripción del taller.
- `date`: Fecha del taller.
- `password`: Contraseña para la administración del taller (codificada antes de guardar).
- **Respuestas:**
- `201 Created`: Taller creado correctamente.
- `400 Bad Request`: Error de validación en los datos de la solicitud.
- `500 Internal Server Error`: Si hay un problema con la creación del taller.

### 4. **Actualizar taller por ID**
- **URL:** `/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza un taller existente por su ID.
- **Parámetros de la solicitud:**
- `id`: ID del taller (validado).
- **Cuerpo de la solicitud:**
- Datos del taller actualizados.
- **Respuestas:**
- `200 OK`: Taller actualizado correctamente.
- `400 Solicitud incorrecta`: Error de validación o datos del taller no válidos.
- `404 No encontrado`: Si no se encuentra el taller con el ID especificado.
- `500 Error interno del servidor`: Si hay un problema con la actualización del taller.

### 5. **Eliminar taller por ID**
- **URL:** `/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un taller existente por su ID.
- **Parámetros de la solicitud:**
- `id`: ID del taller (validado).
- **Respuestas:**
- `204 Sin contenido`: Taller eliminado correctamente.
- `400 Solicitud incorrecta`: Error de validación o ID de taller no válido.
- `404 No encontrado`: Si no se encuentra el taller con el ID especificado.
- `500 Error interno del servidor`: Si hay un problema con la eliminación del taller.

### 6. **Buscar talleres por nombre**
- **URL:** `/search`
- **Método:** `GET`
- **Descripción:** Busca talleres por su nombre utilizando el parámetro de consulta `name`.
- **Parámetros de la consulta de la solicitud:**
- `name`: Nombre del taller que se buscará.
- **Respuestas:**
- `200 OK`: Devuelve los talleres que coinciden.
- `500 Error interno del servidor`: Si hay un problema con la búsqueda.

### 7. **Obtener productos del taller**
- **URL:** `/products/:id`
- **Método:** `GET`
- **Descripción:** Obtiene todos los productos asociados con un taller específico por su ID.
- **Parámetros de la solicitud:**
- `id`: ID del taller (validado).
- **Respuestas:**
- `200 OK`: Devuelve la lista de productos para el taller especificado.
- `400 Bad Request`: Error de validación para un ID de taller no válido.
- `404 Not Found`: Si no se encuentra el taller con el ID especificado.
- `500 Internal Server Error`: Si hay un problema con la obtención de datos.

## Validadores

### Validador del taller
La validación se administra mediante `express-validator` para garantizar la integridad de los datos entrantes:
- Valida `id` para los talleres, asegurándose de que esté en un formato válido.
- Valida los datos del cuerpo de la solicitud al crear o actualizar un taller para evitar datos mal formados.

## Manejo de errores
Cada método incluye el manejo de errores con los códigos de estado HTTP adecuados:
- `400 Solicitud incorrecta`: si se producen errores de validación.
- `404 No encontrado`: si no se encuentra el recurso (por ejemplo, taller).
- `500 Error interno del servidor`: para cualquier excepción o problema del servidor no manejado.



