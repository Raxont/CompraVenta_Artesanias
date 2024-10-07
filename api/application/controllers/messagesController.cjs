// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult, body } = require('express-validator');
const MessagesService = require('../services/messagesService.cjs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class MessagesController {
    constructor() {
        this.requestService = new MessagesService();
    }

    async getMessagess(req, res) {
        try {
            const messages = await this.requestService.getMessages();
            res.status(200).json(messages);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getMessages(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.getMessagesById(req.params.id);
            res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async createMessages(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const  {password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;

            // // validar que el nuevo mensaje no exista aun.
            // const mensajeExiste = await this.requestExiste(req.body)
            // if (mensajeExiste) return res.status(mensajeExiste?.status).json({message:mensajeExiste?.message, fieldDuplicate: mensajeExiste?.field});
            
            const request = await this.requestService.createMessages(req.body);
            res.status(201).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    // async requestExiste(request){
    //     try {
    //         const requestExiste = await this.requestService.getMessagesNickOrEmailOrCedula(request?.nick, request?.email, request?.cedula);
    //         console.log(requestExiste);
            
    //         if (requestExiste)return {status:409, message:'datos de mensaje duplicados', field: requestExiste?.firstMatch }
            
    //         return false
    //     } catch (error) {
    //         const errorObj = JSON.parse(error.message);
    //         res.status(errorObj.status).json({ message: errorObj.message });
    //     }
    // }

    async updateMessages(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.updateMessages(req.params.id, req.body);
            res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteMessages(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const request = await this.requestService.deleteMessages(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(request);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(request);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchMessagess(req, res) {
        try {
            const messages = await this.requestService.searchMessagessByName(req.query.name);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = MessagesController;