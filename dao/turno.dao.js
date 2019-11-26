const helperDao = require('../helper/dao.helper');

const data = './data/turnos.json';

const get = (id) => {
  const turno = helperDao.getElemento(id, data);
  if (turno) {
    return turno;
  }
  throw new Error('Turno no encontrado');
};

const getAll = () => {
  const turnos = helperDao.getElementos(data);
  if (turnos) {
    return turnos;
  }
  throw new Error('No hay turnos');
};

const agregarTurno = (turno) => {
  if (Number.isInteger(turno.id)) {
    if (helperDao.agregarElemento(turno, data)) {
      return 'Turno agregado exitosamente';
    }
    throw new Error('Error agregando turno');
  }
  throw new Error('Envie un turno valido.');
};

const eliminarTurno = (id) => {
  console.log(id);
  if (!Number.isNaN(id)) {
    if (helperDao.eliminarElemento(id, data)) {
      return 'Turno eliminado exitosamente';
    }
    throw new Error('El id de turno no se encuentra');
  }
  throw new Error('Envie un id de turno valido.');
};

module.exports = {
  get, getAll, agregarTurno, eliminarTurno,
};
