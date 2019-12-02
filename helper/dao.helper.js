const fs = require('fs');

const getElemento = (id, data) => {
  try{
  const array = JSON.parse(fs.readFileSync(data));
  return array.find((p) => p.id === Number(id));}
  catch(e){
    return "no encontrado" 
  }
};

const getElementos = (data) => JSON.parse(fs.readFileSync(data));

const buscarElemento = (id, array) => array.findIndex((elemento) => elemento.id === id);

const agregarElemento = (elemento, data) => {
  const array = JSON.parse(fs.readFileSync(data));
  if (buscarElemento(Number(elemento.id), array) === -1) {
    array.push(elemento);
    fs.writeFileSync(data, JSON.stringify(array));
    return true;
  }
  return false;
};

const eliminarElemento = (id, data) => {
  console.log(id);
  const array = JSON.parse(fs.readFileSync(data));
  const index = buscarElemento(Number(id), array);
  if (index !== -1) {
    array.splice(index, 1);
    fs.writeFileSync(data, JSON.stringify(array));
    return true;
  }
  return false;
};

module.exports = {
  getElemento,
  getElementos,
  agregarElemento,
  eliminarElemento,
};
