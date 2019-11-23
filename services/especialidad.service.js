const especialidad = require('../dao/especialidad.dao');

const getAll = () => especialidad.getAll();

const get = (id) => especialidad.get(id);

const agregar = (especialidadNueva) => especialidad.agregarEspecialidad(especialidadNueva);

const eliminar = (id) => especialidad.eliminarEspecialidad(id);

module.exports = {
  getAll, get, agregar, eliminar,
};
