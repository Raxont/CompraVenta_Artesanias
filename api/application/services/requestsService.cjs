// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const { ObjectId } = require("mongodb");
const RequestRepository = require("../../domain/repositories/requestsRepository.cjs");
const PaymentsRepository = require("../../domain/repositories/paymentsRepository.cjs");
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");
const CouponsRepository = require("../../domain/repositories/couponsRepository.cjs");

class RequestService {
  constructor() {
    this.requestRepository = new RequestRepository();
    this.paymentsRepository = new PaymentsRepository();
    this.userRepository = new UserRepository();
    this.couponsRepository = new CouponsRepository();
  }

  async getRequests() {
    const request = await this.requestRepository.getAll();
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }

  async getRequestById(id) {
    const request = await this.requestRepository.getById(id);
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }

  async getRequestsByUserId(id) {
    const request = await this.requestRepository.getRequestsByUserId(id);
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }
  async createRequest(usuarioId, carrito, aPagar, cuponCode) {
    // Construir el array de productos para la solicitud
    const productos = carrito.map((item) => ({
      productoId: new ObjectId(item.productoId),
      cantidad: item.cantidad,
      precio: item.precio,
    }));

    // Crear el objeto de datos
    const data = {
      usuarioId: usuarioId,
      productos: productos,
      total: aPagar.total,
      fecha: new Date(),
      estado: "en preparacion",
    };

    //guardar la informacion del pago en la db

    // Guardar la solicitud en la base de datos
    const request = await this.requestRepository.save(data);
    const { acknowledged, insertedId } = request;
    if (!acknowledged)
      return { error: true, message: "No se pudo crear el pedido..." };
    const paymentData = {
      usuarioId: usuarioId,
      pedidoId: new ObjectId(insertedId),
      monto: aPagar.total,
      fecha: new Date(),
      metodoPago: "Tansferencia Bancaria",
    };
    const payment = await this.paymentsRepository.save(paymentData);

    //eliminar el carrito del usaurio
    const resDeleteCart = await this.userRepository.updateUserIdForm(
      usuarioId,
      { carritoCompras: [] }
    );

    //cambiar el estado del cupon

    // logica para cambiar el estado del cupon a false...
    let cuponUpdate = {};
    if (cuponCode) {
      const updateData = {
        estado: false,
      };
      cuponUpdate = await this.couponsRepository.updateByCode(
        cuponCode,
        updateData
      );
    }
    return { request, payment, resDeleteCart, cuponUpdate };
  }

  async updateRequest(id, data) {
    const updatedRequest = await this.requestRepository.updateById(id, data);
    if (!updatedRequest) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "Request not found or could not be updated",
        })
      );
    }
    return updatedRequest;
  }

  async deleteRequest(id) {
    const deletedRequest = await this.requestRepository.deleteById(id);
    if (!deletedRequest) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "Request not found or could not be deleted",
        })
      );
    }
    return deletedRequest;
  }

  async searchRequestsByName(name) {
    return await this.requestRepository.searchByName(name);
  }
}

module.exports = RequestService;
