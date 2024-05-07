const express = require('express');
const webhookRouter = express.Router();
const WebhookController = require('../controllers/webhookController');
const webhookController = new WebhookController();

webhookRouter.post('/generate-speech', webhookController.sendMessage);

module.exports = webhookRouter;