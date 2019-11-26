const turnos = require('../dao/turno.dao');

const buscarTurno = (turno, array) => array.findIndex((medico) => medico.medicoId === turno.medicoId && medico.dia === turno.dia && medico.hora === turno.hora);

const validarDisponibilidad = (turno, array) => {
  if (buscarTurno(turno, array) === -1) {
    return true;
  }
  return false;
};


const getAll = () => turnos.getAll();

const get = (id) => turnos.get(id);

const agregar = (turnoNuevo) => turnos.agregarTurno(turnoNuevo);

const eliminar = (id) => turnos.eliminarTurno(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
