// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");
const ProductRepository = require("../../domain/repositories/productsRepository.cjs");
const CouponsRepository = require("../../domain/repositories/couponsRepository.cjs");
const { ObjectId } = require("mongodb");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.productRepository = new ProductRepository();
    this.couponsRepository = new CouponsRepository();
  }

  // Método para obtener todos los usuarios
  async getUsers() {
    const user = await this.userRepository.getAll(); // Llama al método del repositorio para obtener todos los usuarios
    // Si no se encuentran usuarios, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      ); // Lanza un error 404 si no hay usuarios
    }
    return user; // Devuelve la lista de usuarios
  }

  async getUserByObjectId(id) {
    const user = await this.userRepository.getByObjectId(id);
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user;
  }

  async getUserById(id) {
    const user = await this.userRepository.getById(id); // Llama al repositorio para obtener el usuario por ID
    // Si no se encuentra el usuario, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user; // Devuelve el usuario encontrado
  }

  // Método para obtener un usuario por su correo electrónico
  async getUserbyEmail(email) {
    const user = await this.userRepository.getByEmail(email); // Llama al repositorio para obtener el usuario por email
    // Si no se encuentra el usuario, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user; // Devuelve el usuario encontrado
  }

  // Método para crear un nuevo usuario
  async createUser(data) {
    // Puedes agregar validaciones o lógica adicional aquí antes de guardar
    return await this.userRepository.save(data); // Llama al repositorio para guardar el nuevo usuario
  }

  // Método para actualizar un usuario existente
  async updateUser(id, data) {
    const updatedUser = await this.userRepository.updateById(id, data); // Llama al repositorio para actualizar el usuario por ID
    // Si no se actualiza el usuario, lanza un error
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      ); // Lanza un error 404 si el usuario no se encuentra o no se puede actualizar
    }
    return updatedUser; // Devuelve el usuario actualizado
  }

  async updateUserForm(id, data) {
    const updatedUser = await this.userRepository.updateUserIdForm(id, data); // Llama al repositorio para actualizar el usuario por ID
    // Si no se actualiza el usuario, lanza un error
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      ); // Lanza un error 404 si el usuario no se encuentra o no se puede actualizar
    }
    return updatedUser; // Devuelve el usuario actualizado
  }

  // Método para eliminar un usuario por ID
  async deleteUser(id) {
    const deletedUser = await this.userRepository.deleteById(id); // Llama al repositorio para eliminar el usuario por ID
    // Si no se elimina el usuario, lanza un error
    if (!deletedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be deleted",
        })
      ); // Lanza un error 404 si el usuario no se encuentra o no se puede eliminar
    }
    return deletedUser; // Devuelve el usuario eliminado
  }

  // Método para buscar usuarios por una consulta
  async searchUsersByquery(query) {
    const user = await this.userRepository.searchQuery(query); // Llama al repositorio para buscar usuarios según la consulta
    // Si no se encuentran usuarios, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "query not found" })
      ); // Lanza un error 404 si no se encuentra la consulta
    }
    return user; // Devuelve la lista de usuarios que coinciden con la consulta
  }

  async addProductToCart(usuarioId, productoId) {
    try {
      // Verificar si el producto existe y tiene suficiente stock
      const producto = await this.productRepository.getById(productoId);

      if (!producto || producto.stock < 1) {
        throw new Error(
          JSON.stringify({
            status: 404,
            message: "Producto no encontrado o sin stock suficiente",
          })
        );
      }

      // Buscar si el producto ya está en el carrito del usuario
      const carrito = await this.userRepository.findProductInCart(
        usuarioId,
        productoId
      );

      if (!carrito) {
        // Si no está en el carrito, añadirlo con cantidad 1
        await this.userRepository.addProductToCart(usuarioId, productoId);
      } else if (producto.stock > carrito.cantidad) {
        // Si está en el carrito, incrementar la cantidad
        await this.userRepository.incrementProductQuantity(
          usuarioId,
          productoId
        );
        // Reducir el stock del producto
        // await this.productRepository.decrementStock(productoId); // // Reduce el stock de un producto
      } else {
        throw new Error(
          JSON.stringify({
            status: 400,
            message: "No hay suficiente stock disponible",
          })
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async removeProductToCart(usuarioId, productoId) {
    try {
      // Verificar si el producto existe
      const producto = await this.productRepository.getById(productoId);

      if (!producto) {
        throw new Error(
          JSON.stringify({ status: 404, message: "Producto no encontrado" })
        );
      }

      // Buscar si el producto está en el carrito del usuario
      const carrito = await this.userRepository.findProductInCart(
        usuarioId,
        productoId
      );

      if (!carrito) {
        // Si no está en el carrito, lanzar un error
        throw new Error(
          JSON.stringify({
            status: 404,
            message: "Producto no está en el carrito",
          })
        );
      }

      // Eliminar el producto del carrito
      await this.userRepository.removeProductFromCart(usuarioId, productoId);
    } catch (err) {
      throw err;
    }
  }

  async increaseProductToCart(usuarioId, productoId) {
    try {
      // Verificar si el producto existe
      const producto = await this.productRepository.getById(productoId);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      // Buscar si el producto está en el carrito del usuario
      const carrito = await this.userRepository.findProductInCart(
        usuarioId,
        productoId
      );
      if (!carrito) {
        throw new Error("Producto no está en el carrito");
      }

      // Aumentar la cantidad en 1
      await this.userRepository.incrementProductQuantity(usuarioId, productoId);
    } catch (err) {
      // Manejo de errores
      console.error("Error al aumentar la cantidad del producto:", err);
      throw err; // Re-lanzar el error para manejo superior
    }
  }

  async decreaseProductToCart(usuarioId, productoId) {
    try {
      // Verificar si el producto existe
      const producto = await this.productRepository.getById(productoId);

      if (!producto) {
        throw new Error(
          JSON.stringify({ status: 404, message: "Producto no encontrado" })
        );
      }

      // Buscar si el producto está en el carrito del usuario
      const carrito = await this.userRepository.findProductInCart(
        usuarioId,
        productoId
      );
      if (!carrito) {
        throw new Error("Producto no está en el carrito");
      }

      // Disminuir la cantidad
      const nuevaCantidad = carrito.cantidad - 1; // Decrementar la cantidad

      if (nuevaCantidad > 0) {
        // Si la cantidad es mayor que 0, actualizar la cantidad en el carrito
        await this.userRepository.decrementProductQuantity(
          usuarioId,
          productoId
        );
      } else {
        // Si la cantidad es 0 o menos, eliminar el producto del carrito
        await this.userRepository.removeProductFromCart(usuarioId, productoId);
      }
    } catch (err) {
      // await session.abortTransaction();
      throw err; // Re-lanzar el error para manejarlo en otro lugar
    }
  }

  async getCarritoData(userid) {
    const carrito = await this.userRepository.getCarritoData(userid);
    if (!carrito) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Carrito not found" })
      );
    }
    return carrito;
  }

  async calcularAPagar(carrito, cuponCode, userId) {
    let subtotal = 0; // Subtotal sin aplicar promociones
    let totalEnvio = 0;
    let total = 0; // Total incluyendo promociones y costos de envío
    let descuentoCupon = 0;

    // Calcular el subtotal y aplicar promociones por producto
    carrito.forEach((producto) => {
      const cantidad = parseInt(producto.cantidad);
      const precio = producto.precio;

      // Calcular subtotal del producto sin promociones
      subtotal += cantidad * precio;

      // Calcular cantidad a pagar según la promoción
      let cantidadConPromocion = cantidad;
      if (producto.promocion) {
        const [lleva, paga] = producto.promocion.split("x").map(Number);
        if (cantidad >= lleva) {
          const promocionesAplicadas = Math.floor(cantidad / lleva);
          const productosSinPromocion = cantidad % lleva;
          cantidadConPromocion =
            promocionesAplicadas * paga + productosSinPromocion;
        }
      }

      // Calcular el total del producto aplicando promociones
      total += cantidadConPromocion * precio;

      // Sumar el costo de envío
      totalEnvio += producto.envio;
    });

    // Aplicar el cupón de descuento, si existe
    if (cuponCode) {
      // Obtener el cupón de la base de datos usando el código
      const cupon = await this.couponsRepository.getByCode(cuponCode);

      if (!cupon) {
        console.log("Cupón no encontrado");
      } else {
        // Verificar si el cupón es válido para el usuario o si tiene stock
        if (cupon.tipo === "asignado") {
          if (
            cupon.usuarioId.toString() === userId.toString() &&
            cupon.estado === true
          ) {
            // Aplicar descuento basado en el porcentaje de descuento del cupón
            descuentoCupon = total * cupon.descuento;
            total -= descuentoCupon;
          } else {
            console.log("Cupón no válido para este usuario o ya utilizado");
          }
        } else {
          // Si el cupón no está asignado a un usuario específico, revisar el stock
          if (cupon.stock > 0) {
            descuentoCupon = total * (cupon.descuento / 100);
            total -= descuentoCupon;
          } else {
            console.log("Cupón no válido o sin stock");
          }
        }
      }
    }

    // Retornar el resultado con los valores calculados
    return {
      subtotal,
      totalEnvio,
      descuentoCupon,
      total: total + totalEnvio, // Sumar costos de envío al total final
    };
  }

  async pushFavouriteProductsToUser(userId, productId) {
    const updatedUser = await this.userRepository.pushFavouriteProduct(
      userId,
      productId
    );
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      );
    }
    return updatedUser;
  }

  async pullFavouriteProductsToUser(userId, productId) {
    const updatedUser = await this.userRepository.pullFavouriteProduct(
      userId,
      productId
    );
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      );
    }
    return updatedUser;
  }

  async searchUsersByName(name) {
    return await this.userRepository.searchByName(name);
  }

  async addCuponToCart(usuarioId, cupon) {
    // const session = await this.userRepository.startSession();  //// codigo para el manejo de transacciones
    // session.startTransaction(); //// codigo para el manejo de transacciones
    try {
      await this.userRepository.addCuponToCart(usuarioId, cupon);
    } catch (err) {
      // await session.abortTransaction();
      throw err;
    } finally {
      // session.endSession();
    }
  }
}

module.exports = UserService; // Exporta la clase UserService para su uso en otros módulos
