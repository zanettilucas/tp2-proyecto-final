
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
