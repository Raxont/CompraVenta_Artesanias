// Importa los módulos necesarios para la gestión de usuarios.
const { validationResult } = require("express-validator");
const UserService = require("../services/usuariosService.cjs");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");

/**
 * Clase UserController que gestiona las peticiones HTTP relacionadas con usuarios.
 */
class UserController {
  constructor() {
    this.userService = new UserService(); // Inicializa el servicio de usuarios.
  }

  /**
   * Obtiene todos los usuarios.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      if (!users) {
        return res.status(404).json({ message: "Users not found" });
      }

      res.status(200).json(users);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Busca un usuario por su ID.
   * @param {string} userId - El ID del usuario a buscar.
   * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
   */
  async findUserById(userId) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return null; // No se encontró el usuario
      }
      return user; // Retorna el usuario encontrado
    } catch (error) {
      throw new Error("Error al obtener el usuario"); // Manejo de errores
    }
  }

  /**
   * Crea un nuevo usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      // Encripta la contraseña antes de guardarla
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Verifica si un usuario ya existe.
   * @param {Object} user - Los datos del usuario a verificar.
   * @returns {Promise<Object|boolean>} - Devuelve un objeto de error si el usuario existe, de lo contrario false.
   */
  async userExiste(user) {
    try {
      const userExiste = await this.userService.getUserById(user.id);

      if (userExiste) {
        return {
          status: 409,
          message: "Datos de usuario duplicados",
          field: userExiste.firstMatch,
        };
      }

      return false; // Si el usuario no existe, devolvemos false
    } catch (error) {
      console.error("Error al verificar si el usuario existe:", error);

      try {
        const errorObj = JSON.parse(error.message);
        return {
          status: errorObj.status || 500,
          message: errorObj.message || "Error interno del servidor",
        };
      } catch (jsonError) {
        return {
          status: 500,
          message: "Error interno del servidor",
        };
      }
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUserForms(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.updateUserForm(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario por su ID y datos proporcionados.
   * @param {string} userId - El ID del usuario a actualizar.
   * @param {Object} updatedData - Los nuevos datos del usuario.
   * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no se encontró.
   */
  async updateUserById(userId, updatedData) {
    try {
      const user = await this.userService.updateUserForm(userId, updatedData);
      if (!user) {
        return null; // Retorna null si no encuentra el usuario
      }
      return user; // Retorna el usuario actualizado
    } catch (error) {
      throw new Error("Error al actualizar el usuario"); // Lanza un error para que lo maneje el llamador
    }
  }

  /**
   * Elimina un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Busca usuarios por su nombre.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async searchUsers(req, res) {
    try {
      const users = await this.userService.searchUsersByName(req.query.name);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async passportLogin(req, res) {
    try {
      const userData = req.user;
      const token = jwtUtils.generateToken(userData);

      req.session.token = token;
      return { token, userData };
    } catch (error) {
      console.error(error);
      return { error: "Error al autenticarse" };
    }
  }

  /**
   * Maneja la respuesta de inicio de sesión y redirige al usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {string} redireccion - La URL a la que redirigir.
   * @returns {Promise<void>}
   */
  async handlePassportLogin(req, res, redireccion) {
    const result = await this.passportLogin(req, res);

    if (res.headersSent) return;

    if (result.error) {
      return res.status(500).json({ message: result.error });
    }
    req.session.token = result.token;

    res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
        <body></body>
        <script>
            if (window.opener) {
                window.opener.location.href = 'http://localhost:3000/${redireccion}';
                window.close();
            } else {
                console.error('No opener window found.');
            }
        </script>
        </html>`);
  }

  /**
   * Inicia sesión un usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const body = await this.userService.searchUsersByquery(req.body.user);
      const usuario = body.length > 0 ? body[0] : null;

      if (!usuario) {
        return res.status(400).json({ message: 'Invalid name, email or phone' });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, usuario.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwtUtils.generateToken(usuario);
      const user = usuario.id;
      req.session.passport = { user: user };
      req.session.token = token;

      res.status(200).json({ token, usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Cierra sesión del usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async logout(req, res) {
    try {
      // Limpiar la cookie del token
      res.clearCookie("connect.sid", {
        httpOnly: false,
        secure: "false",
        domain: "localhost",
        sameSite: "strict",
      });
      // Destruir la sesión y enviar la respuesta solo cuando se complete
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al destruir la sesión:", err);
          return res.status(500).json({ message: "Error al cerrar la sesión" });
        }

        res.status(200).json({ message: "Logout successful" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async pushFavouriteProductsToUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.pushFavouriteProductsToUser(req.params.userId, req.params.productId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async pullFavouriteProductsToUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.pullFavouriteProductsToUser(req.params.userId, req.params.productId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async addToCart(req, res) {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        await this.userService.addProductToCart(userId, productId);
        return res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        const errorObj = JSON.parse(error.message);
        return res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async removeToCart(req, res) {
      try {
          const { usuarioId, productoId } = req.body;
          await this.userService.removeProductToCart(usuarioId, productoId);
          return res.status(200).json({ message: 'Producto retirado del carrito exitosamente' });
      } catch (error) {
          const errorObj = JSON.parse(error.message);
          return res.status(errorObj.status).json({ message: errorObj.message });
      }
  }

  async increaseProduct(req, res) {
    try {
        const { usuarioId, productoId } = req.body;
        await this.userService.increaseProductToCart(usuarioId, productoId);
        return res.status(200).json({ message: 'Producto retirado del carrito exitosamente' });
    } catch (error) {
        const errorObj = JSON.parse(error.message);
        return res.status(errorObj.status).json({ message: errorObj.message });
    }
}

async decreaseProduct(req, res) {
  try {
      const { usuarioId, productoId } = req.body;
      await this.userService.decreaseProductToCart(usuarioId, productoId);
      return res.status(200).json({ message: 'Producto retirado del carrito exitosamente' });
  } catch (error) {
      const errorObj = JSON.parse(error.message);
      return res.status(errorObj.status).json({ message: errorObj.message });
  }
}

  async getCarritoByUserId(req, res){
      try {
          const userId = req.params.id; 
          const cuponCode = req.body?.codigo || undefined;
      
          const carrito = await this.userService.getCarritoData(userId);
          const aPagar = await this.userService.calcularAPagar(carrito, cuponCode, userId)

          res.status(200).json({carrito, aPagar})
          
      } catch (error) {
          console.log(error);
          
          res.status(500).json({ error: error, message: "error de servidor" })
      }
  }

  async addToCartCupon(req, res) {
        try {
    
            const { usuarioId, cupon } = req.body;
            await this.userService.addCuponToCart(usuarioId, cupon);
            return res.status(200).json({ message: 'Descuento realizado exitosamente' });
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            return res.status(errorObj.status).json({ message: errorObj.message });
        }
  }

}

// Exporta la clase UserController para su uso en otras partes de la aplicación.
module.exports = UserController;
