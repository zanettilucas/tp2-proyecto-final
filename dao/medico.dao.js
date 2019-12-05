const helperDao = require('../helper/dao.helper');
const config = require('../config/config');

const data = `${config.data}medicos.json`;

const get = (id) => {
  const medico = helperDao.getElemento(id, data);
  if (medico) {
    return medico;
  }
  throw new Error('Medico no encontrado');
};

const getAll = () => {
  const medicos = helperDao.getElementos(data);
  if (medicos) {
    return medicos;
  }
  throw new Error('No hay medicos');
};

const agregarMedico = (medico) => {
  if (Number.isInteger(medico.id) && medico.nombre) {
    if (helperDao.agregarElemento(medico, data)) {
      return 'Medico agregado exitosamente';
    }
    throw new Error('Error agregando medico');
  }
  throw new Error('Envie una medico valido.');
};

const eliminarMedico = (id) => {
  if (!Number.isNaN(id)) {
    if (helperDao.eliminarElemento(id, data)) {
      return 'Medico eliminado exitosamente';
    }
    throw new Error('El id de medico no se encuentra');
  }
  throw new Error('Envie un id de medico valido.');
};

const getForEspecialidad = (especialidad) => {
  const medicos = getAll();
  return medicos.filter((medico) => medico.especialidad === especialidad);
};

module.exports = {
  get, getAll, agregarMedico, eliminarMedico, getForEspecialidad,
};
