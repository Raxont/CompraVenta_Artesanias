// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const WorkshopRepository = require('../../domain/repositories/workshopsRepository.cjs'); // Importa el repositorio de talleres

class WorkshopService {
    constructor() {
        this.workshopRepository = new WorkshopRepository(); // Crea una instancia del repositorio de talleres
    }

    // Método para obtener todos los talleres
    async getWorkshops() {
        const workshop = await this.workshopRepository.getAll(); // Llama al método del repositorio para obtener todos los talleres
        // Si no se encuentran talleres, lanza un error
        if (!workshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found'})); // Lanza un error 404 si no se encuentran talleres
        }
        return workshop; // Devuelve la lista de talleres
    }

    // Método para obtener un taller por su ID
    async getWorkshopById(id) {
        const workshop = await this.workshopRepository.getById(id); // Llama al repositorio para obtener el taller por ID
        // Si no se encuentra el taller, lanza un error
        if (!workshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found'})); // Lanza un error 404 si el taller no se encuentra
        }
        return workshop; // Devuelve el taller encontrado
    }

    // Método para crear un nuevo taller
    async createWorkshop(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.workshopRepository.save(data); // Llama al repositorio para guardar el nuevo taller
    }

    // Método para actualizar un taller existente
    async updateWorkshop(id, data) {
        const updatedWorkshop = await this.workshopRepository.updateById(id, data); // Llama al repositorio para actualizar el taller por ID
        // Si no se actualiza el taller, lanza un error
        if (!updatedWorkshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found or could not be updated'})); // Lanza un error 404 si el taller no se encuentra o no se puede actualizar
        }
        return updatedWorkshop; // Devuelve el taller actualizado
    }

    // Método para eliminar un taller por ID
    async deleteWorkshop(id) {
        const deletedWorkshop = await this.workshopRepository.deleteById(id); // Llama al repositorio para eliminar el taller por ID
        // Si no se elimina el taller, lanza un error
        if (!deletedWorkshop) {
            throw new Error(JSON.stringify({status: 404, message: 'Workshop not found or could not be deleted'})); // Lanza un error 404 si el taller no se encuentra o no se puede eliminar
        }        
        return deletedWorkshop; // Devuelve el taller eliminado
    }
    
    // Método para buscar talleres por nombre
    async searchWorkshopsByName(name) {
        return await this.workshopRepository.searchByName(name); // Llama al repositorio para buscar talleres por nombre
    }

    async getProductsByWorkshopId(arg) {
        return await this.workshopRepository.getProductsByWorkshop(arg);
    }

    async getProductsByWorkshopId(arg) {
        return await this.workshopRepository.getProductsByWorkshop(arg);
    }
}

module.exports = WorkshopService; // Exporta la clase WorkshopService para su uso en otros módulos
