const helperDao = require('../helper/dao.helper');

const data = './data/especialidades.json';

const get = (id) => {
  const especialidad = helperDao.getElemento(id, data);
  if (especialidad) {
    return especialidad;
  }
  throw new Error('Especialidad no encontrada');
};

const getAll = () => {
  const especialidades = helperDao.getElementos(data);
  if (especialidades) {
    return especialidades;
  }
  throw new Error('No hay especialidades');
};

const agregarEspecialidad = (especialidad) => {
  if (Number.isInteger(especialidad.id) && especialidad.nombre) {
    if (helperDao.agregarElemento(especialidad, data)) {
      return 'Especialidad agregada exitosamente';
    }
    throw new Error('Error agregando especialidad');
  }
  throw new Error('Envie una especialidad valida.');
};

const eliminarEspecialidad = (id) => {
  console.log(id);
  if (!Number.isNaN(id)) {
    if (helperDao.eliminarElemento(id, data)) {
      return 'Especialidad eliminada exitosamente';
    }
    throw new Error('El id de especialidad no se encuentra');
  }
  throw new Error('Envie un id de especialidad valida.');
};

module.exports = {
  get, getAll, agregarEspecialidad, eliminarEspecialidad,
};
