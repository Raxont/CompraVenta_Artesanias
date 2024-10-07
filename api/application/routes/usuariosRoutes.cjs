// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require("express");
const UserController = require("../controllers/usuariosController.cjs");
const UserValidator = require("../validator/usuariosValidator.cjs");
const path = require("path");
const fs = require("fs");
const {
  authenticateToken
} = require("../../infrastructure/middlewares/authMiddleware.cjs");
const passportGithub = require("../../infrastructure/middlewares/githubAuth.cjs");
const passportGoogle = require("../../infrastructure/middlewares/googleAuth.cjs");
const passportDiscord = require("../../infrastructure/middlewares/discordAuth.cjs");

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

/**
 * Obtiene los datos de sesión del usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get("/session-data",  (req, res) => {  
  if (req.session?.passport?.user) {
    const userId = req.session.passport.user; // Obtén el ID del usuario
    const token = req.session.token || null;  // Obtén el token del usuario (si existe)
    
    res.json({ userId, token });
  } else {
    res.status(404).json({ error: "No session data found" });
  }
});

router.post('/cart/', (req, res) => userController.getCarritoByUserId(req, res)); //recibe el id del usuario por el parametro

/**
 * Ruta para iniciar la autenticación con Github.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/github",
  passportGithub.authenticate("github", {
    session: false,
  })
);

/**
 * Ruta de callback para la autenticación con Github.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/github/callback",
  passportGithub.authenticate("github", {
    session: false,
    failureRedirect: "http://localhost:3000/register",
  }),
  async (req, res) => {
    try {
      // Carga node-fetch de manera dinámica
      const fetch = (await import("node-fetch")).default;
      // Verifica si el usuario está registrado o no
      if (!req.user.isRegistered) {
        // URL de la foto de perfil
        const photoUrl = req.user.photos[0].value;

        // Genera un nombre único para la imagen
        const fileName = Date.now() + "-profile.jpg";
        const uploadPath = path.join(__dirname, "../../fotosPerfil/", fileName);

        // Descarga la foto de perfil
        const response = await fetch(photoUrl);

        if (!response.ok) {
          throw new Error("Error descargando la foto de perfil");
        }

        // Guarda la imagen descargada en el directorio
        const fileStream = fs.createWriteStream(uploadPath);
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on("error", reject);
          fileStream.on("finish", resolve);
        });

        // Crea el nuevo usuario con la foto guardada localmente
        const newUser = {
          id: req.user.id,
          nombre: req.user.username,
          correo: "none@gmail.com",
          password: "",
          tipo: "comprador",
          fotoPerfil: fileName, // Guarda solo el nombre de la foto en la base de datos
          genero: "None",
          fechaNacimiento: "0000-0-0",
          direccion: "",
          telefono: "+00 000000000",
          favoritos: [],
          compras: [],
          talleresInscritos: [],
          cupones: [],
          provider: req.user.provider,
          carritoCompras:[]
        };

        // Realiza la petición con fetch para crear el usuario
        const userResponse = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (userResponse.ok) {
          userController.handlePassportLogin(req, res, "checks");
        } else {
          const errorData = await userResponse.json();
          res.status(userResponse.status).json(errorData);
        }
      } else {
        // Si ya está registrado, redirigir a 'home'
        userController.handlePassportLogin(req, res, "home");
      }
    } catch (error) {
      console.error("Error guardando el usuario en la base de datos: ", error);
      res.status(500).send("Error en la autenticación con Github");
    }
  }
);

/**
 * Ruta para iniciar la autenticación con Google.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/google",
  passportGoogle.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Ruta de callback para la autenticación con Google.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/google/callback",
  passportGoogle.authenticate("google", {
    failureRedirect: "http://localhost:3001/login",
  }),
  async (req, res) => {
    try {
      // Carga node-fetch de manera dinámica
      const fetch = (await import("node-fetch")).default;
      // Verifica si el usuario está registrado o no
      if (!req.user.isRegistered) {
        // URL de la foto de perfil
        const photoUrl = req.user.photos[0].value;

        // Genera un nombre único para la imagen
        const fileName = Date.now() + "-profile.jpg";
        const uploadPath = path.join(__dirname, "../../fotosPerfil/", fileName);

        // Descarga la foto de perfil
        const response = await fetch(photoUrl);

        if (!response.ok) {
          throw new Error("Error descargando la foto de perfil");
        }

        // Guarda la imagen descargada en el directorio
        const fileStream = fs.createWriteStream(uploadPath);
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on("error", reject);
          fileStream.on("finish", resolve);
        });

        // Crea el nuevo usuario con la foto guardada localmente
        const newUser = {
          id: req.user.id,
          nombre: req.user.displayName,
          correo: req.user.emails[0].value || "none@gmail.com",
          password: "",
          tipo: "comprador",
          fotoPerfil: fileName, // Guarda solo el nombre de la foto en la base de datos
          genero: "None",
          fechaNacimiento: "0000-0-0",
          direccion: "",
          telefono: "+00 000000000",
          favoritos: [],
          compras: [],
          talleresInscritos: [],
          cupones: [],
          provider: req.user.provider,
          carritoCompras:[]
        };

        // Realiza la petición con fetch para crear el usuario
        const userResponse = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (userResponse.ok) {
          userController.handlePassportLogin(req, res, "checks");
        } else {
          const errorData = await userResponse.json();
          res.status(userResponse.status).json(errorData);
        }
      } else {
        // Si ya está registrado, redirigir a 'home'
        userController.handlePassportLogin(req, res, "home");
      }
    } catch (error) {
      console.error("Error guardando el usuario en la base de datos: ", error);
      res.status(500).send("Error en la autenticación con Google");
    }
  }
);

/**
 * Ruta para iniciar la autenticación con Discord.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/discord",
  passportDiscord.authenticate("discord", {
    session: false,
  })
);

/**
 * Ruta de callback para la autenticación con Discord.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get(
  "/discord/callback",
  passportDiscord.authenticate("discord", {
    failureRedirect: "http://localhost:3001/login",
  }),
  async (req, res) => {
    try {
      // Carga node-fetch de manera dinámica
      const fetch = (await import("node-fetch")).default;
      // Verifica si el usuario está registrado o no
      if (!req.user.isRegistered) {
        // URL de la foto de perfil
        const photoUrl = req.user.avatar;

        // Genera un nombre único para la imagen
        const fileName = Date.now() + "-profile.jpg";
        const uploadPath = path.join(__dirname, "../../fotosPerfil/", fileName);

        // Descarga la foto de perfil
        const response = await fetch(
          `https://cdn.discordapp.com/avatars/${req.user.id}/${photoUrl}.png`
        );

        if (!response.ok) {
          throw new Error("Error descargando la foto de perfil");
        }

        // Guarda la imagen descargada en el directorio
        const fileStream = fs.createWriteStream(uploadPath);
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on("error", reject);
          fileStream.on("finish", resolve);
        });

        // Crea el nuevo usuario con la foto guardada localmente
        const newUser = {
          id: req.user.id,
          nombre: req.user.username,
          correo: "none@gmail.com",
          password: "",
          tipo: "comprador",
          fotoPerfil: fileName, // Guarda solo el nombre de la foto en la base de datos
          genero: "None",
          fechaNacimiento: "0000-0-0",
          direccion: "",
          telefono: "+00 000000000",
          favoritos: [],
          compras: [],
          talleresInscritos: [],
          cupones: [],
          provider: req.user.provider,
          carritoCompras:[]
        };

        // Realiza la petición con fetch para crear el usuario
        const userResponse = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (userResponse.ok) {
          userController.handlePassportLogin(req, res, "checks");
        } else {
          const errorData = await userResponse.json();
          res.status(userResponse.status).json(errorData);
        }
      } else {
        // Si ya está registrado, redirigir a 'home'
        userController.handlePassportLogin(req, res, "home");
      }
    } catch (error) {
      console.error("Error guardando el usuario en la base de datos: ", error);
      res.status(500).send("Error en la autenticación con Discord");
    }
  }
);

//rutas de crud usuarios
router.get("/search",  (req, res) => userController.searchUsers(req, res));

router.get("/:id", (req, res) => userController.getUser(req, res));

router.get("/", (req, res) => userController.getUsers(req, res));

router.post("/upload-profile-picture",  async (req, res) => {
    const userId = req.session.passport.user;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No se ha subido ningún archivo." });
    }
  
    const file = req.files.file;
    const newImageName = Date.now() + "-" + file.name; // Genera un nombre único para la imagen
    const uploadPath = path.join(__dirname, "../../fotosPerfil/", newImageName);
  
    try {
      // Mueve el archivo a la carpeta de destino
      file.mv(uploadPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error al subir la imagen." });
        }
  
        // Encuentra al usuario en la base de datos
        const user = await userController.findUserById(userId);
        console.log("🚀 ~ file.mv ~ user:", user)
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado." });
        }
  
        // Si el usuario ya tiene una imagen, elimina la antigua
        if (user.fotoPerfil) {
          const oldImagePath = path.join(
            __dirname,
            "../../fotosPerfil/",
            user.fotoPerfil
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Elimina la imagen antigua
          }
        }
  
        // Actualiza la imagen de perfil en la base de datos
        const updatedUser = await userController.updateUserById(userId, {
          fotoPerfil: newImageName,
        });
  
        if (!updatedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
  
        // Envía la respuesta con la nueva ruta de la imagen
        res.status(200).json({ newImagePath: newImageName });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al actualizar la imagen de perfil." });
    }
});

/**
 * Ruta para loguearse con un usuario creado con email o telefono.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/loginAccount", async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});

/**
 * Ruta para desloguear la sesion.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/logout",  async (req, res) => {
  try {
    await userController.logout(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
});

/**
 * Ruta para crear un nuevo usuario con el correo o el numero de telefono.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/", (req, res) => userController.createUser(req, res));

router.put('/addFavourite/:userId/:productId',   userValidator.validateUpdateFavouriteProducts(), (req, res) => userController.pushFavouriteProductsToUser(req, res));

router.put('/removeFavourite/:userId/:productId',   userValidator.validateUpdateFavouriteProducts(), (req, res) => userController.pullFavouriteProductsToUser(req, res));

router.put('/addToCart/:userId',  (req, res) => userController.addToCart(req, res));
router.put('/cart/increase',  (req, res) => userController.increaseProduct(req, res)); 
router.put('/cart/decrease',  (req, res) => userController.decreaseProduct(req, res)); 
/**
 * Ruta para actualizar la informacion de un usuario.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.put("/:id",  (req, res) => userController.updateUserForms(req, res));

router.delete('/cart',  (req, res) => userController.removeToCart(req, res)); 

/**
 * Ruta para eliminar un usuario creado.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.delete("/:id", (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router;