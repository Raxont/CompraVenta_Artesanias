// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const MessagesController = require('../controllers/messagesController.cjs');
const MessagesValidator = require('../validator/messagesValidator.cjs');

const router = express.Router();
const messagesController = new MessagesController();
const messagesValidator = new MessagesValidator();

router.get('/search', (req, res) => messagesController.searchMessagess(req, res));
router.get('/', (req, res) => messagesController.getMessages(req, res));
router.get('/:id', messagesValidator.validateMessagesId(), (req, res) => messagesController.getMessagesById(req, res));
router.post('/', messagesValidator.validateMessagesData(), (req, res) => messagesController.createMessages(req, res));
router.put('/:id', messagesValidator.validateMessagesData(), (req, res) => messagesController.updateMessages(req, res));
router.delete('/:id', messagesValidator.validateMessagesId(), (req, res) => messagesController.deleteMessages(req, res));

module.exports = router;