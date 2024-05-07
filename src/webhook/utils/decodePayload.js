module.exports = (uri) => {
  // Decodifica a URI
  const decodedUri = decodeURIComponent(uri);

  // Divide os parâmetros em pares chave=valor
  const paramsArray = decodedUri.split('&');

  // Inicializa o objeto onde os parâmetros serão armazenados
  const paramsObject = {};

  // Itera sobre cada parâmetro e adiciona ao objeto
  paramsArray.forEach(param => {
    const [key, value] = param.split('=');
    const nestedKeys = key.split('[').map(str => str.replace(']', ''));

    let currentObj = paramsObject;
    for (let i = 0; i < nestedKeys.length; i++) {
      const nestedKey = nestedKeys[i];
      if (!currentObj[nestedKey]) {
        if (i === nestedKeys.length - 1) {
          currentObj[nestedKey] = decodeURIComponent(value);
        } else {
          currentObj[nestedKey] = {};
        }
      }
      currentObj = currentObj[nestedKey];
    }
  });

  return paramsObject;
}