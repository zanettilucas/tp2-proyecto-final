const turnos = require('../dao/turno.dao');
const mailerService = require('./mailer.service');

const getAll = () => turnos.getAll();

const buscarTurno = (turno) => -1;

const validarDisponibilidad = (turno) => {
  if (buscarTurno(turno) === -1) {
    return true;
  }
  return false;
};

const get = (id) => turnos.get(id);

const agregar = async (turnoNuevo) => {
  if (validarDisponibilidad(turnoNuevo)) {
    //    await mailerService.sendConfirmOrder(turnoNuevo);
    console.log('entre para crear el turno');
    return turnos.agregarTurno(turnoNuevo);
  }
  return 'Ya existe el turno';
};

const eliminar = (id) => turnos.eliminarTurno(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
