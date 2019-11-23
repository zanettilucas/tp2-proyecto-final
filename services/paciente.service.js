const paciente = require('../dao/paciente.dao');

const getAll = () => paciente.getAll();

const get = (id) => paciente.get(id);

const agregar = (pacienteNuevo) => paciente.agregarPaciente(pacienteNuevo);

const eliminar = (id) => paciente.eliminarPaciente(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
