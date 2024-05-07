require('dotenv').config();
const axios = require('axios');
const decodePayload = require('../utils/decodePayload.js');

module.exports = class WebhookController {
  constructor() {
    this.generateAndUploadAudio = require('../utils/generate-speech.js');
    this.client = require('../config/eleven-labs-config.js');
  }

  async sendMessage(req, res) {
    const decoded = decodePayload(req.body);
    const { leads: { add: { '0': { id: lead_id } } }, account } = decoded;
    res.send({lead_id, account});
  }

  async generateAndUploadAudio(text, lead_id) {
    return this.generateAndUploadAudio(text, this.client, lead_id);
  }

  async getToken(client_id) {
    try {
      const { data } = axios.post('https://tokenapi.institutodentalsante.com.br/auth/access_token', {
        client_id
      });
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
  }
}