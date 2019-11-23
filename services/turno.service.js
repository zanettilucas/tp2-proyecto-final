/*
const buscarTurno = (turno, array) => array.findIndex((medico) => medico.medicoId === turno.medicoId && medico.dia === turno.dia && medico.hora === turno.hora);

const validarDisponibilidad = (turno, array) => {
  if (buscarTurno(turno, array) === -1) {
    return true;
  }
  return false;
};

module.exports = {
  validarDisponibilidad,
};
*/
const turno = require('../dao/turno.dao');

const getAll = () => turno.getAll();

const get = (id) => turno.get(id);

const agregar = (turnoNuevo) => turno.agregarTurno(turnoNuevo);

const eliminar = (id) => turno.eliminarTurno(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
