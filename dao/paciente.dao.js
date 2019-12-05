const helperDao = require('../helper/dao.helper');

const config = require('../config/config');

const data = `${config.data}pacientes.json`;

const get = (id) => {
  const paciente = helperDao.getElemento(id, data);
  if (paciente) {
    return paciente;
  }
  throw new Error('Paciente no encontrado');
};

const getAll = () => {
  const pacientes = helperDao.getElementos(data);
  if (pacientes) {
    return pacientes;
  }
  throw new Error('No hay pacientes');
};

const agregarPaciente = (paciente) => {
  if (Number.isInteger(paciente.id) && paciente.nombre) {
    if (helperDao.agregarElemento(paciente, data)) {
      return 'Paciente agregado exitosamente';
    }
    throw new Error('Error agregando paciente');
  }
  throw new Error('Envie un paciente valido.');
};

const eliminarPaciente = (id) => {
  if (!Number.isNaN(id)) {
    if (helperDao.eliminarElemento(id, data)) {
      return 'Paciente eliminado exitosamente';
    }
    throw new Error('El id de paciente no se encuentra');
  }
  throw new Error('Envie un id de paciente valido.');
};

module.exports = {
  get, getAll, agregarPaciente, eliminarPaciente,
};
