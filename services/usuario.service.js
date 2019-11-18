const fs = require('fs');

const getUsuario = (id, data) => {
  const array = JSON.parse(fs.readFileSync(data));
  return array.find((p) => p.id === Number(id));
};

const getUsuarios = (data) => JSON.parse(fs.readFileSync(data));

const buscarUsuario = (id, array) => array.findIndex((usuario) => usuario.id === id);

const agregarUsuario = (usuario, data) => {
  const array = JSON.parse(fs.readFileSync(data));
  if (buscarUsuario(Number(usuario.id), array)) {
    array.push(usuario);
    fs.writeFileSync(data, JSON.stringify(array));
    return true;
  }
  return false;
};

const eliminarUsuario = (id, data) => {
  const array = JSON.parse(fs.readFileSync(data));
  const index = buscarUsuario(Number(id), array);
  if (index !== -1) {
    array.splice(index, 1);
    fs.writeFileSync(data, JSON.stringify(array));
    return true;
  }
  return false;
};

module.exports = {
  getUsuario,
  getUsuarios,
  agregarUsuario,
  eliminarUsuario,
};
