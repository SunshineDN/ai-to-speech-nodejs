import { createWriteStream } from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const __dirname = path.resolve();

export default createAudioFromText = async (text, client, lead_id) => {
  return new Promise(async (res, rej) => {
    try {
      console.log('Gerando audio...');
      const audio = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_multilingual_v2',
        text
      });
      console.log('Audio gerado!');
      const fileName = `${title}.opus`;
      const filePath = path.join(__dirname, 'assets/audios', fileName);
      const file = createWriteStream(filePath);
      
      audio.pipe(file);
      file.on('finish', () => {
        res(filePath);
      });
      file.on('error', rej);
    } catch (e) {
      rej(e);
    };
  })
};