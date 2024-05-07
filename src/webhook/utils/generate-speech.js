require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');

async function generateAndUploadAudio(text, client, lead_id) {
  try {
    console.log('Gerando áudio...');
    const audio = await client.generate({
      voice: 'Rachel',
      model_id: 'eleven_multilingual_v2',
      text
    });

    console.log('Áudio gerado!');

    const fileName = `${lead_id}.opus`;

    const fileBuffer = await streamToBuffer(audio); // Convertendo o áudio para buffer
    console.log('Áudio convertido para buffer');
    console.log(fileBuffer);

    // Enviando o arquivo para file.io via API
    console.log('Enviando arquivo para file.io...');
    const uploadResponse = await uploadFileToExternalService(fileBuffer, fileName);
    console.log('Arquivo enviado para file.io:', uploadResponse);

    return uploadResponse.link; // Retorna o link para o arquivo enviado
  } catch (error) {
    console.error('Erro ao gerar ou enviar áudio:', error);
    throw error;
  }
}

// Função auxiliar para converter um stream em buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// Função para enviar o arquivo para https://file.io/ via API
async function uploadFileToExternalService(fileBuffer, fileName) {
  const uploadUrl = 'https://file.io/?expires=1w'; // URL da API do file.io
  const formData = new FormData();
  formData.append('file', fileBuffer, {
    filename: fileName,
    contentType: 'audio/ogg' // Especifique o tipo MIME correto do arquivo de áudio
  });

  // Enviar pelo axios e autorizando com basic auth
  const { data } = await axios.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Basic ' + process.env.ELEVENLABS_API_KEY
    }
  });

  return data; // Retorna a resposta da API
}

module.exports = generateAndUploadAudio;