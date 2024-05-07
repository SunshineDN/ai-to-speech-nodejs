require('dotenv').config();
const { ElevenLabsClient } = require("elevenlabs");

const xiKey = process.env.ELEVENLABS_API_KEY;
const client = new ElevenLabsClient({
  apiKey: xiKey,
});

module.exports = client;