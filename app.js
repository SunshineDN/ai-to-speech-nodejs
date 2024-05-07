const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const webhookRouter = require('./src/webhook/routes/webhook.js');
const PORT = 3333;

// Usar string no corpo da requisição
app.use(bodyParser.text({type: '*/*'}));
app.use(cors());
app.use('/webhook', webhookRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// const username = 'AI_Atende';
// const apiToken = 'E16SJ460UUXQ92XHCH5O9QVAIVHMW3WX';
// const domain = 'cpanel.institutodentalsante.com.br';

// const loginUrl = `https://${domain}:2083/execute/cpanel::uapi::Session::create`;

// // Dados de login
// const loginData = {
//   username: 'esolarec',
//   password: '#DentalSante2@23'
// };

// console.log('Fazendo login...');
// console.log({
//   'Authorization': `cpanel ${username}:${apiToken}`
// });

// axios.post(loginUrl, loginData, {
//   headers: {
//     'Authorization': `cpanel ${username}:${apiToken}`
//   }
// })
// .then(response => {
//   const { data } = response;
//   if (data.status === 1) {
//     const cpsession = data.data.cpsession;
//     console.log('Login bem-sucedido. cpsession:', cpsession);

//     // Agora você pode usar cpsession para outras operações na API do cPanel
//     // Por exemplo, realizar outras chamadas usando cpsession
//   } else {
//     console.error('Falha no login:', data.error);
//   }
// })
// .catch(error => {
//   console.error('Erro ao fazer login:', error);
// });