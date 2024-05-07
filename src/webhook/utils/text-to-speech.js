const { createWriteStream } = require('fs');
const path = require('path');

module.exports = async (text, client, lead_id) => {
  return new Promise(async (res, rej) => {
    try {
      console.log('Gerando audio...');
      const audio = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_multilingual_v2',
        text
      });
      
      console.log('Audio gerado!');
      const fileName = `${lead_id}.opus`; // Nome do arquivo de áudio
      const filePath = path.join(__dirname, '../../assets/audios', fileName); // Caminho do arquivo de áudio
      const file = createWriteStream(filePath); // Cria um arquivo de escrita
      
      audio.pipe(file); // Escreve o áudio no arquivo
      file.on('finish', () => { // Quando terminar de escrever o arquivo
        res(filePath);
      });
      file.on('error', rej);
    } catch (e) {
      rej(e);
    };
  })
};