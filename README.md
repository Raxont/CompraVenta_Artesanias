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

VITE_TUNNEL_URL_BACKEND=
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
- `VITE_TUNNEL_URL_BACKEND`: URL de un túnel externo (opcional, usado en desarrollo remoto).
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

### Dependencias

- **bcryptjs**: Biblioteca para hash y verificación de contraseñas de manera segura.
- **boxicons**: Iconos para utilizar en el frontend del proyecto.
- **cookie-parser**: Middleware para analizar cookies en las solicitudes HTTP.
- **cors**: Permite configurar políticas de CORS (Cross-Origin Resource Sharing) en el servidor.
- **express**: Framework para manejar rutas y solicitudes HTTP en Node.js.
- **express-fileupload**: Middleware para manejar la carga de archivos en Express.
- **express-rate-limit**: Limita la tasa de peticiones para proteger contra ataques de fuerza bruta.
- **express-session**: Maneja sesiones del usuario en Express.
- **express-validator**: Conjunto de middlewares para la validación de datos en Express.
- **flowbite**: Complemento de Tailwind CSS que ofrece componentes UI predefinidos.
- **fs**: Módulo para interactuar con el sistema de archivos.
- **https**: Módulo para hacer peticiones HTTPS.
- **jsonwebtoken**: Permite generar y verificar tokens JWT para autenticación.
- **mongodb**: Driver oficial para conectar y manipular bases de datos MongoDB.
- **morgan**: Middleware para registrar las solicitudes HTTP en el servidor.
- **node-fetch**: Biblioteca para realizar peticiones HTTP desde el servidor.
- **passport**: Middleware de autenticación para Express, utilizado con diversas estrategias de autenticación.
- **passport-discord**: Estrategia de autenticación para Passport con OAuth de Discord.
- **passport-github**: Estrategia de autenticación para Passport con OAuth de GitHub.
- **passport-github2**: Otra versión del autenticador de GitHub con características adicionales.
- **passport-google-oauth20**: Estrategia de autenticación para Passport con OAuth de Google.
- **react**: Biblioteca para construir interfaces de usuario (frontend).
- **react-dom**: Soporte para manipular el DOM con React.
- **react-qr-code**: Generador de códigos QR en React.
- **react-router-dom**: Maneja las rutas de navegación en aplicaciones React.
- **redis**: Base de datos en memoria utilizada para almacenar sesiones y caché.
- **socket.io**: Permite comunicación en tiempo real entre el servidor y el cliente.
- **socket.io-client**: Cliente de Socket.IO para conectarse al servidor en tiempo real.

### Dependencias de Desarrollo

- **@eslint/js**: Reglas básicas de ESLint para asegurar la calidad del código.
- **@types/react**: Tipos para TypeScript al trabajar con React.
- **@types/react-dom**: Tipos para React DOM en TypeScript.
- **@vitejs/plugin-react**: Plugin para integrar React en proyectos con Vite.
- **autoprefixer**: Añade automáticamente prefijos CSS para asegurar compatibilidad entre navegadores.
- **concurrently**: Ejecuta múltiples scripts de npm al mismo tiempo.
- **cookie-parser**: Igual que en dependencias, para manejar cookies.
- **eslint**: Linter para identificar y corregir problemas en el código JavaScript.
- **eslint-plugin-react**: Reglas específicas de React para ESLint.
- **eslint-plugin-react-hooks**: Reglas de ESLint para asegurar el uso correcto de hooks en React.
- **eslint-plugin-react-refresh**: Permite hacer recargas rápidas en desarrollo de React.
- **express**: Igual que en dependencias, para manejo de rutas y solicitudes HTTP.
- **express-rate-limit**: Igual que en dependencias, para limitar la tasa de peticiones.
- **express-session**: Igual que en dependencias, para manejo de sesiones.
- **express-validator**: Igual que en dependencias, para validación de datos.
- **globals**: Define variables globales que se pueden utilizar en el proyecto.
- **jsonwebtoken**: Igual que en dependencias, para generación y verificación de JWT.
- **mongodb**: Igual que en dependencias, para conexión con bases de datos MongoDB.
- **postcss**: Procesador de CSS que permite utilizar plugins como `autoprefixer`.
- **tailwindcss**: Framework de CSS para diseño de interfaces basado en utilidades.
- **vite**: Herramienta rápida de construcción para el desarrollo de aplicaciones web modernas.



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
      "id": "4589123476",
      "nombre": "Carlos",
      "correo": "carlitos123@gmail.com",
      "password": "123456",
      "tipo": "comprador",
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

## **Endpoints de Autenticación**

### 1. Iniciar sesión con GitHub

- **Método**: `GET`
- **URL**: `/users/github`
- **Descripción**: Redirige al usuario a GitHub para autenticarse. Una vez autenticado, el usuario será redirigido de vuelta al sitio con un token de sesión.

### 2. Iniciar sesión con Discord

- **Método**: `GET`
- **URL**: `/users/discord`
- **Descripción**: Redirige al usuario a discord para autenticarse. Una vez autenticado, el usuario será redirigido de vuelta al sitio con un token de sesión.

### 3. Iniciar sesión con Google

- **Método**: `GET`
- **URL**: `/users/google`
- **Descripción**: Redirige al usuario a google para autenticarse. Una vez autenticado, el usuario será redirigido de vuelta al sitio con un token de sesión.

### 4. Iniciar sesión con cuenta local

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

### 5. Cerrar sesión

- **Método**: `POST`
- **URL**: `/users/logout`
- **Descripción**: Cierra la sesión del usuario actual, invalidando su token de sesión.

### 6. Obtener la session

- **Método**: `GET`
- **URL**: `/users/session-data`
- **Descripción**: Obtiene la sesión del usuario actual, con su id y su token de sesión.
- **Bearer:** Agregar token en el campo de Auth.

## **Endpoints del Carrito**

### 1. Obtener carrito de un usuario
- **Método**: `POST`
- **URL**: `/users/cart`
- **Descripción**: Obtiene los productos en el carrito de un usuario específico.
- **Cuerpo de la solicitud**:
  - Ejemplo:
    ```json
    {
      "id": "7360435733"
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

------



## Productos

### 1. **Obtener todos los productos**
   - **URL:** `products/`
   - **Método:** `GET`
   - **Descripción:** Obtiene una lista de todos los productos.
   - **Solicitud:**
     - Sin parámetros
   - **Respuestas:**
     - `200 OK`: Devuelve la lista de productos.
     - `400 Bad Request`: Errores de validación o petición malformada.
     - `500 Error interno del servidor`: Cualquier otro error del servidor.

### 2. Obtener producto por ID
   - **URL: **`/:id`.
   - **Método:** `GET`
   - **Descripción:** Recupera un producto por su ID único.
   - **Parámetros de la petición**
     - `id` (path param): El ID del producto (validado).
   - **Respuestas:**
     - `200 OK`: Devuelve los detalles del producto.
     - `400 Bad Request`: Errores de validación para el ID del producto.
     - `404 No encontrado`: Si no se encuentra el producto con el ID dado.
     - `500 Error interno del servidor`: Cualquier otro error del servidor.

### 3. **Obtener productos por categoría**
- **URL:**`/categoría/:categoría`
- **Método:** `GET`
- **Descripción:** Recupera productos por su categoría.
- **Parámetros de la petición**
     - `categoria` (path param): La categoría de los productos (validado).
- **Respuestas:**
     - `200 OK`: Devuelve la lista de productos de la categoría.
     - `400 Bad Request`: Errores de validación.
     - `500 Error interno del servidor`: Cualquier otro error del servidor.
- **Categorias:**
  - Textileria
  - Ceramica
  - Orfebreria
  - 'Talla en Piedra
  - 'Talla en Madera
  - Bordado
  - Joyeria
  - Hojalateria
  - Estampado
  - Pintura Tradicional

### 4. **Obtener productos por categoría para descuentos**
- **URL:** `/discounts/:categoria`.
- **Método:** `GET`
- **Descripción:** Recupera productos por su categoría para descuentos.
- **Parámetros de la petición**
     - `categoria` (path param): La categoría de productos para descuentos (validada).
- **Respuestas:**
     - `200 OK`: Devuelve la lista de productos con descuento.
     - `400 Bad Request`: Errores de validación.
     - `500 Error interno del servidor`: Cualquier otro error del servidor.
- **Categorias:**
  - Textileria
  - Ceramica
  - Orfebreria
  - 'Talla en Piedra
  - 'Talla en Madera
  - Bordado
  - Joyeria
  - Hojalateria
  - Estampado
  - Pintura Tradicional

### 5. **Obtener Productos Favoritos por Usuario**
- **URL:**`/favourites/:id/:categoria`.
- **Método:** `GET`
- **Descripción:** Recupera los productos favoritos de un usuario filtrados por categoría.
- **Parámetros de la petición**
     - `id` (path param): El ID del usuario (validado).
     - `categoria` (path param): La categoría del producto.
- **Respuestas:**
     - `200 OK`: Devuelve la lista de productos favoritos de la categoría especificada.
     - `400 Bad Request`: Errores de validación o datos incorrectos.
     - `404 No encontrado`: Si no se encuentra el usuario o los productos de la categoría especificada.
     - `500 Error interno del servidor`: Cualquier otro error del servidor.
- **Categorias:**
  - Textileria
  - Ceramica
  - Orfebreria
  - 'Talla en Piedra
  - 'Talla en Madera
  - Bordado
  - Joyeria
  - Hojalateria
  - Estampado
  - Pintura Tradicional


## Validadores

### Validador de productos
La API utiliza `productsValidator` para validar los datos de las solicitudes entrantes para IDs, categorías y datos de producto, asegurando que los datos están limpios y evitando entradas erróneas.

## Tratamiento de errores
Cada método captura cualquier error, y cuando se produce un error, la API devuelve el código de estado HTTP apropiado junto con una respuesta JSON que contiene el mensaje de error. Por ejemplo
- `400 Bad Request`: Para problemas de validación.
- `404 No encontrado`: Si faltan recursos (por ejemplo, productos o usuarios).
- `500 Error interno del servidor`: Para cualquier error de servidor no gestionado.

------



## Pedidos

### 1. **Obtener todas las solicitudes**

- **URL:** `requests/`
- **Método:** `GET`
- **Descripción:** Obtiene todos los pedidos del sistema.
- **Solicitud:** Sin parámetros.
- **Respuestas:**
- `200 OK`: Devuelve la lista de todas las solicitudes.
- `500 Error interno del servidor`: Si hay un problema con la obtención de datos.

### 2. **Obtener pedidos por ID de usuario**

- **URL:** `requests/user/:id`
- **Método:** `GET`
- **Descripción:** Obtiene todos los pedidos realizados por un usuario específico.
- **Parámetros de la solicitud:**
- `id`: ID de usuario (validado).
- **Respuestas:**
- `200 OK`: Devuelve los pedidos del usuario especificado.
- `400 Solicitud incorrecta`: Si el ID de usuario no es válido.
- `500 Error interno del servidor`: si hay un problema con la obtención de datos.

### 3. **Obtener pedido por ID**

- **URL:** `requests/:id`
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

- **URL:** `requests/`

- **Método:** `POST`

- **Descripción:** Crea un nuevo pedido.

- **Cuerpo de la solicitud:**

  - Ejemplo:

    ```json
     {
      usuarioId: "66ffeb1ffc73a69a66883a4d",
      productos: [
        {
          productoId: "650f4c29a5f1bc0987654346",
          cantidad: 10,
          precio: 60
        },
        {
          productoId: "650f4c29a5f1bc0987654347",
          cantidad: 5,
          precio: 30
        }
      ],
      total: 750,
      fecha: "2024-10-08T12:30:00.000Z",
      estado: "en camino"
    }
    
    ```

- **Respuestas:**

- `201 Created`: Pedido creada exitosamente.

- `400 Bad Request`: Error de validación en los datos del pedido.

- `500 Internal Server Error`: Si hay un problema con la creación del pedido.

### 5. **Eliminar pedido por ID**

- **URL:** `requests/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un pedido existente por su ID.
- **Parámetros de solicitud:**
- `id`: ID de solicitud (validada).
- **Respuestas:**
- `204 Sin contenido`: Pedido eliminada correctamente.
- `400 Solicitud incorrecta`: Error de validación o ID de solicitud no válida.
- `404 Not Found`: Si no se encuentra la solicitud con el ID especificado.
- `500 Internal Server Error`: Si hay un problema con la eliminación de la solicitud.

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



## Pagos

### 1. **Obtener todos los pagos**
- **URL:** `payments/`
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



### 3. **Crear un nuevo pago**
- **URL:** `payments/`

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
      "pedidoId": "el id del pedido recien ingresado",
      "monto": 750,
      "fecha": "2024-10-08T12:00:00Z",
      "metodoPago": "tarjeta"
  }
  ```

## Validadores

### Validador de pagos
La API utiliza `paymentsValidator` para validar los datos de solicitud entrantes para las identificaciones y los datos de pago, lo que garantiza una entrada limpia y evita datos incorrectos.

## Manejo de errores
Cada método detecta los errores y devuelve el código de estado HTTP correspondiente junto con una respuesta JSON que contiene el mensaje de error. Por ejemplo:
- `400 Solicitud incorrecta`: para problemas de validación.

- `404 No encontrado`: para recursos faltantes (por ejemplo, pagos).

- `500 Error interno del servidor`: para cualquier error del servidor no manejado.

  

------



## Talleres

### 1. **Obtener todos los talleres**
- **URL:** `workshops/`
- **Método:** `GET`
- **Descripción:** Obtiene todos los talleres del sistema.
  - **Solicitud:** Sin parámetros.

- **Respuestas:**
  - `200 OK`: Devuelve la lista de todos los talleres.
  - `500 Error interno del servidor`: Si hay un problema con la obtención de datos.


### 2. **Obtener taller por ID**
- **URL:** `workshops/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un taller específico por su ID.
- **Parámetros de la solicitud:**
  - `id`: ID del taller (validado).

- **Respuestas:**
  - `200 OK`: Devuelve los detalles del taller especificado.
  - `400 Solicitud incorrecta`: Si el ID del taller no es válido.
  - `404 Not Found`: Si no se encuentra el taller con el ID especificado.
  - `500 Internal Server Error`: Si hay un problema con la obtención de datos.


### 3. **Obtener productos del taller**
- **URL:** `workshops/products/:id`
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



## Talleres educativos

#### 1. Obtener un taller educativo por su id

- **Método**: `GET`
- **Ruta**: `/educationalWorkshops/:id`
- **Descripción**: Obtiene un taller educativo específico por su ID.
- **Parámetros**:
  - `id`: ID del taller educativo.
- **Respuesta**:
  - **200 OK**: Devuelve el taller educativo solicitado.
  - **400 Bad Request**: Si hay errores de validación en el ID.
  - **404 Not Found**: Si no se encuentra el taller con el ID especificado.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 2. Obtener todos los talleres educativos

- **Método**: `GET`
- **Ruta**: `/educationalWorkshops`
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

  ------



## Cupones

#### 1. Obtener todos los cupones

- **Método**: `GET`
- **Ruta**: `/coupons`
- **Descripción**: Obtiene una lista de todos los cupones.
- **Respuesta**:
  - **200 OK**: Devuelve un array de cupones.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 2. Obtener un cupón por su id

- **Método**: `GET`
- **Ruta**: `/coupons/:id`
- **Descripción**: Obtiene un cupón específico por su ID.
- **Parámetros**:
  - `id`: ID del cupón.
- **Respuesta**:
  - **200 OK**: Devuelve el cupón solicitado.
  - **400 Bad Request**: Si hay errores de validación en el ID.
  - **404 Not Found**: Si no se encuentra el cupón con el ID especificado.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 3. Obtener los cupones de un usuario

- **Método**: `GET`
- **Ruta**: `/coupons/user/:id`
- **Descripción**: Obtiene todos los cupones de un usuario específico por su ID.
- **Parámetros**:
  - `id`: ID del usuario.
- **Respuesta**:
  - **200 OK**: Devuelve los cupones del usuario.
  - **400 Bad Request**: Si hay errores de validación en el ID del usuario.
  - **404 Not Found**: Si no se encuentran cupones para el usuario especificado.
  - **500 Internal Server Error**: Si ocurre un error en la recuperación.

#### 4. Crear cupones

- **Método**: `POST`

- **Ruta**: `/coupons`

- **Descripción**: Crea un nuevo cupón.

- **Cuerpo de la solicitud**:

  - Ejemplo:

    ```js
    {
      codigo: "DESCUENTO46",
      descuento: 10,
      tipo: "asignado",
      fechaExpiracion: "2024-10-12T00:00:00.000Z",
      usuarioId: "5503240427",
      estado: false
    }
    ```

- **Respuesta**:
  - **201 Created**: Devuelve el cupón creado.
  - **400 Bad Request**: Si hay errores de validación.
  - **500 Internal Server Error**: Si ocurre un error al crear el cupón.

#### 5. Actualizar cupon

- **Método**: `PUT`
- **Ruta**: `/coupons/:id`
- **Descripción**: Actualiza un cupón específico por su ID.
- **Parámetros**:
  - `id`: ID del cupón.
- **Cuerpo de la solicitud**: Datos a actualizar.
- **Respuesta**:
  - **200 OK**: Devuelve el cupón actualizado.
  - **400 Bad Request**: Si hay errores de validación.
  - **404 Not Found**: Si no se encuentra el cupón con el ID especificado.
  - **500 Internal Server Error**: Si ocurre un error al actualizar el cupón.

#### 6. `deleteCoupons`

- **Método**: `DELETE`
- **Ruta**: `/coupons/:id`
- **Descripción**: Elimina un cupón específico por su ID.
- **Parámetros**:
  - `id`: ID del cupón.
- **Respuesta**:
  - **204 No Content**: Indica que la eliminación fue exitosa y no hay contenido adicional.
  - **400 Bad Request**: Si hay errores de validación.
  - **404 Not Found**: Si no se encuentra el cupón con el ID especificado.
  - **500 Internal Server Error**: Si ocurre un error al eliminar el cupón.

## Rutas

Las rutas están definidas en el enrutador de Express y utilizan los métodos del controlador `CouponsController`. A continuación se listan las rutas:

| Método | Ruta                | Descripción                        |
| ------ | ------------------- | ---------------------------------- |
| GET    | `/coupons/search`   | Busca cupones por nombre.          |
| GET    | `/coupons/user/:id` | Obtiene cupones por ID de usuario. |
| GET    | `/coupons/:id`      | Obtiene un cupón por ID.           |
| GET    | `/coupons`          | Obtiene todos los cupones.         |
| POST   | `/coupons`          | Crea un nuevo cupón.               |
| PUT    | `/coupons/:id`      | Actualiza un cupón por ID.         |
| DELETE | `/coupons/:id`      | Elimina un cupón por ID.           |

## Dependencias

- **Express.js**: Framework web para Node.js.
- **Express-validator**: Middleware para validar los datos de entrada.
- **bcryptjs**: Librería para encriptar contraseñas.
- **jsonwebtoken**: Librería para gestionar tokens JWT.

## Notas

- La validación de datos se realiza utilizando `express-validator` para asegurar que los datos sean correctos antes de procesarlos.
- Se maneja la encriptación de contraseñas al crear cupones, garantizando así la seguridad de los datos de usuario.
