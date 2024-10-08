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



## **Usuarios**

### 1. Obtener todos los usuarios
- **Método**: `GET`
- **URL**: `/users/`
- **Descripción**: Recupera una lista de todos los usuarios registrados en el sistema. Este endpoint puede paginar los resultados si se implementa la funcionalidad.

### 2. Obtener un usuario por ID
- **Método**: `GET`
- **URL**: `/users/:id`
- **Descripción**: Obtiene los detalles de un usuario específico utilizando su ID único.
- **Parámetros**:
  - `id`: ID del usuario a recuperar.

### 3. Crear un nuevo usuario
- **Método**: `POST`
- **URL**: `/users`
- **Descripción**: Crea un nuevo usuario en el sistema. Se espera que el cuerpo de la solicitud contenga los datos necesarios como nombre, correo electrónico, contraseña, etc.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "usuarioId": "4589123476",
      "nombre": "Carlos",
      "correo": "carlitos123@gmail.com",
      "password": "123456",
      "tipo": "vendedor",
      "fotoPerfil": "https://example.com/perfil/carlos.jpg",
      "genero": "Masculino",
      "fechaNacimiento": "1990-03-15",
      "direccion": "calle 14 #33-24",
      "telefono": "+51 987654321",
      "favoritos": [],
      "compras": [],
      "talleresInscritos": [],
      "cupones": [],
      "provider": "email",
      "carritoCompras": []
    }
    
    ```

### 4. Actualizar un usuario
- **Método**: `PUT`
- **URL**: `/users/:id`
- **Descripción**: Actualiza la información de un usuario existente. Los datos a actualizar se pasan en el cuerpo de la solicitud.
- **Parámetros**:
  - `id`: _id del usuario a actualizar.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "nombre": "Carlitos"
    }
    ```

### 5. Eliminar un usuario
- **Método**: `DELETE`
- **URL**: `/users/:id`
- **Descripción**: Elimina un usuario del sistema usando su ID único.
- **Parámetros**:
  - `id`: _id del usuario a eliminar.

### 6. Buscar usuarios
- **Método**: `GET`
- **URL**: `/users/search/?name=jm_gq`
- **Descripción**: Busca usuarios por nombre o algún otro criterio de búsqueda. Puede utilizar parámetros de consulta.
- **Parámetros de consulta**:
  - `name`: Nombre del usuario a buscar.

## **Endpoints de Autenticación**

### 1. Iniciar sesión con GitHub
- **Método**: `GET`
- **URL**: `/users/github`
- **Descripción**: Redirige al usuario a GitHub para autenticarse. Una vez autenticado, el usuario será redirigido de vuelta al sitio con un token de sesión.

### 2. Iniciar sesión con cuenta local
- **Método**: `POST`
- **URL**: `/users/loginAccount`
- **Descripción**: Inicia sesión utilizando un usuario registrado con correo electrónico o teléfono.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "user": "laurasofia@gmail.com",
      "password": "juanmiesposo8"
    }
    ```

### 3. Cerrar sesión
- **Método**: `POST`
- **URL**: `/users/logout`
- **Descripción**: Cierra la sesión del usuario actual, invalidando su token de sesión.

## **Endpoints del Carrito**

### 1. Obtener carrito de un usuario
- **Método**: `POST`
- **URL**: `/users/cart`
- **Descripción**: Obtiene los productos en el carrito de un usuario específico.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "userId": "7360435733"
    }
    ```

### 2. Agregar producto al carrito
- **Método**: `PUT`
- **URL**: `/users/addToCart/:userId`
- **Descripción**: Agrega un producto al carrito de un usuario.
- **Parámetros**:
  - `userId`: ID del usuario al que se le agregará el producto.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "productId": "650f4c29a5f1bc0987654344",
      "quantity": 1
    }
    ```

### 3. Eliminar producto del carrito
- **Método**: `DELETE`
- **URL**: `/users/cart`
- **Descripción**: Elimina un producto específico del carrito de un usuario.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "usuarioId": "7360435733",
      "productoId": "650f4c29a5f1bc0987654344"
    }
    ```

### 4. Incrementar cantidad de producto
- **Método**: `PUT`
- **URL**: `/users/cart/increase`
- **Descripción**: Incrementa la cantidad de un producto en el carrito.
- **Cuerpo de la solicitud**:
  
  - Ejemplo:
    ```json
    {
      "usuarioId": "7360435733",
      "productoId": "650f4c29a5f1bc0987654344"
    }
    ```

### 5. Decrementar cantidad de producto
- **Método**: `PUT`
- **URL**: `/users/cart/decrease`
- **Descripción**: Decrementa la cantidad de un producto en el carrito.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "usuarioId": "7360435733",
      "productoId": "650f4c29a5f1bc0987654344"
    }
    ```

## **Otros Endpoints**

### 1. Subir foto de perfil
- **Método**: `POST`
- **URL**: `/users/upload-profile-picture`
- **Descripción**: Sube una nueva foto de perfil para el usuario. Se espera que la imagen se envíe como un archivo en el cuerpo de la solicitud.

### 2. Agregar a favoritos
- **Método**: `PUT`
- **URL**: `/users/addFavourite/:userId/:productId`
- **Descripción**: Agrega un producto a los favoritos de un usuario.
- **Parámetros**:
  - `userId`: ID del usuario.
  - `productId`: ID del producto a agregar.

### 3. Eliminar de favoritos
- **Método**: `PUT`
- **URL**: `/users/removeFavourite/:userId/:productId`
- **Descripción**: Elimina un producto de los favoritos de un usuario.
- **Parámetros**:
  - `userId`: ID del usuario.
  - `productId`: ID del producto a eliminar.

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
- **URL:** `payments/:id`

- **Método:** `GET`

- **Descripción:** Recupera un pago por su ID único.

- **Parámetros de la solicitud:**
  - `id` (parámetro de ruta): El ID del pago (validado).

- **Respuestas:**
  - `200 OK`: Devuelve los detalles del pago.
  - `400 Bad Request`: Errores de validación para el ID de pago.
  - `404 Not Found`: Si no se encuentra el pago con el ID indicado.
  - `500 Internal Server Error`: Cualquier otro error del servidor.

- **Ejemplo:** 

  ```js
  http://localhost:3001/payments/66ffeb1ffc73a69a66883a4e
  ```

  


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

- **Ejemplo:** 

  ```js
  {
      "usuarioId": "534778591859441674",
      "pedidoId": "67890",
      "monto": 100,
      "fecha": "2024-10-07T12:00:00Z",
      "metodoPago": "tarjeta"
  }
  ```



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


### 3. **Buscar talleres por nombre**
- **URL:** `/search`
- **Método:** `GET`
- **Descripción:** Busca talleres por su nombre utilizando el parámetro de consulta `name`.
- **Parámetros de la consulta de la solicitud:**
  - `name`: Nombre del taller que se buscará.

- **Respuestas:**
  - `200 OK`: Devuelve los talleres que coinciden.
  - `500 Error interno del servidor`: Si hay un problema con la búsqueda.


### 4. **Obtener productos del taller**
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

------



# API de Talleres Educativos

## Descripción
Esta API gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) relacionadas con talleres educativos. Utiliza Express.js y cuenta con validaciones de datos.

## Controlador: `EducationalWorkshopsController`

### Métodos

#### 1. `getEducationalWorkshops`

- **Método**: `GET`
- **Ruta**: `/educational-workshops`
- **Descripción**: Obtiene una lista de todos los talleres educativos.
- **Respuesta**:
  - **200 OK**: Devuelve un array de talleres educativos.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 2. `getWorkshop`

- **Método**: `GET`
- **Ruta**: `/educational-workshops/:id`
- **Descripción**: Obtiene un taller educativo específico por su ID.
- **Parámetros**:
  - `id`: ID del taller educativo.
- **Respuesta**:
  - **200 OK**: Devuelve el taller educativo solicitado.
  - **400 Bad Request**: Si hay errores de validación en el ID.
  - **404 Not Found**: Si no se encuentra el taller con el ID especificado.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 3. `searchEducationalWorkshops`

- **Método**: `GET`
- **Ruta**: `/educational-workshops/search`
- **Descripción**: Busca talleres educativos por nombre.
- **Parámetros de consulta**:
  - `name`: Nombre del taller educativo a buscar.
- **Respuesta**:
  - **200 OK**: Devuelve un array de talleres que coinciden con la búsqueda.
  - **500 Internal Server Error**: Si ocurre un error en la búsqueda.

#### 4. `getAllEducationalWorkshops`

- **Método**: `GET`
- **Ruta**: `/educational-workshops/all`
- **Descripción**: Obtiene todos los talleres educativos sin filtrar.
- **Respuesta**:
  - **200 OK**: Devuelve un array de todos los talleres educativos.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

## Rutas

Las rutas están definidas en el enrutador de Express y utilizan los métodos del controlador `EducationalWorkshopsController`. A continuación se listan las rutas:

| Método | Ruta                            | Descripción                            |
| ------ | ------------------------------- | -------------------------------------- |
| GET    | `/educational-workshops`        | Obtiene todos los talleres educativos. |
| GET    | `/educational-workshops/:id`    | Obtiene un taller educativo por ID.    |
| POST   | `/educational-workshops`        | Crea un nuevo taller educativo.        |
| PUT    | `/educational-workshops/:id`    | Actualiza un taller educativo por ID.  |
| DELETE | `/educational-workshops/:id`    | Elimina un taller educativo por ID.    |
| GET    | `/educational-workshops/search` | Busca talleres educativos por nombre.  |
| GET    | `/educational-workshops/all`    | Obtiene todos los talleres educativos. |

## Dependencias

- **Express.js**: Framework web para Node.js.
- **Express-validator**: Middleware para validar los datos de entrada.
- **bcryptjs**: Librería para encriptar contraseñas.
- **jsonwebtoken**: Librería para gestionar tokens JWT.

## Notas

- La validación de datos se realiza utilizando `express-validator` para asegurar que los datos sean correctos antes de procesarlos.
- Se maneja la encriptación de contraseñas al crear talleres educativos, garantizando así la seguridad de los datos de usuario.
