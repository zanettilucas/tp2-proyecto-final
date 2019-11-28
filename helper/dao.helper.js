const fs = require('fs');

const getElemento = (id, data) => {
  try {
    const array = JSON.parse(fs.readFileSync(data));
    return array.find((p) => p.id === Number(id));
  }
  catch (e) {
    return 'no encontrado';
  }
};

const getElementos = (data) => JSON.parse(fs.readFileSync(data));

const buscarElemento = (id, array) => -1;
const buscarElementodelete = (id, array) => array.findIndex((elemento) => elemento.id === id);

const eliminarElemento = (id, data) => {
  console.log(id);
  const array = JSON.parse(fs.readFileSync(data));
  const index = buscarElementodelete(Number(id), array);
  if (index !== -1) {
    const nuevaarray = array.filter((e) => e.id != id);
    console.log(nuevaarray);
    fs.writeFileSync(data, JSON.stringify(nuevaarray));
    return true;
  }
  return false;
};

const agregarElemento = (elemento, data) => {
  eliminarElemento(elemento.id, data);
  const array = JSON.parse(fs.readFileSync(data));
  if (buscarElemento(Number(elemento.id), array) === -1) {
    array.push(elemento);
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
