const medico = require('../dao/medico.dao');
const especialidadService = require('./especialidad.service');

const getAll = () => medico.getAll();

const get = (id) => medico.get(id);

const agregar = (medicoNuevo) => medico.agregarMedico(medicoNuevo);

const eliminar = (id) => medico.eliminarMedico(id);

const listadoPorEspecialidad = (filtros) => {
  if (especialidadService.validar(filtros.especialidad)) {
    const medicos = medico.getForEspecialidad(filtros.especialidad);
    if (filtros.limit) {
      return medicos.slice(0, Number.parseInt(filtros.limit, 10));
    }
    return medicos;
  }
  return 'especialidad no valida';
};
module.exports = {
  getAll, get, agregar, eliminar, listadoPorEspecialidad,
};
