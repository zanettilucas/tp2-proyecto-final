const turnos = require('../dao/turno.dao');
const mailerService = require('./mailer.service');

const getAll = () => turnos.getAll();

const buscarTurno = (turno) => getAll().findIndex((turnoExistente) => turnoExistente.medicoId === turno.medicoId && turnoExistente.fecha === turno.fecha && turnoExistente.pacienteId === turno.pacienteId && turnoExistente.horario === turno.horario);

const validarDisponibilidad = (turno) => {
  if (buscarTurno(turno) === -1) {
    return true;
  }
  return false;
};

const get = (id) => turnos.get(id);

const agregar = async (turnoNuevo) => {
  if (validarDisponibilidad(turnoNuevo)) {
    await mailerService.sendConfirmOrder(turnoNuevo);
    return turnos.agregarTurno(turnoNuevo);
  }
  return 'Ya existe el turno';
};

const eliminar = (id) => turnos.eliminarTurno(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
