import 'dotenv/config';
import { ElevenLabsClient } from "elevenlabs";

const xiKey = process.env.ELEVENLABS_API_KEY;
const id = '123456';
const client = new ElevenLabsClient({
  apiKey: xiKey,
});
createAudioFromText('Olá Douglas!', client, id);