const medico = require('../dao/medico.dao');

const getAll = () => medico.getAll();

const get = (id) => medico.get(id);

const agregar = (medicoNuevo) => medico.agregarMedico(medicoNuevo);

const eliminar = (id) => medico.eliminarMedico(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
