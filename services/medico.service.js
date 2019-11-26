const medico = require('../dao/medico.dao');
const especialidadService = require('./especialidad.service');
const pacienteService = require('./paciente.service');
const distanceService = require('./distance.service');

const getAll = () => medico.getAll();

const get = (id) => medico.get(id);

const agregar = (medicoNuevo) => medico.agregarMedico(medicoNuevo);

const eliminar = (id) => medico.eliminarMedico(id);

const listadoPorEspecialidad = async (filtros) => {
  if (especialidadService.validar(filtros.especialidad)) {
    const medicos = medico.getForEspecialidad(filtros.especialidad);
    if (filtros.limit) {
      return medicos.slice(0, Number.parseInt(filtros.limit, 10));
    }
    return medicos;
  }
  return 'Especialidad no valida';
};

const getDistanciaMedicosPorPaciente = async (filtros) => {
  try {
    const paciente = pacienteService.get(filtros.pacienteId);
    const medicos = getAll();
    const medicosYDistanciaPromise = [];
    medicos.forEach((m) => {
      const distancePromise = distanceService.calcularDistancia(paciente.ubicacion, m.ubicacion);
      medicosYDistanciaPromise.push(distancePromise.then((distance) => ({ distance, m })));
    });
    return Promise.all(medicosYDistanciaPromise).then((distancias) => {
      distancias.sort((d1, d2) => d1.distance.distance.value - d2.distance.distance.value);
      if (filtros.distanceMax) {
        return distancias.filter((d) => d.distance.distance.value < Number.parseInt(filtros.distanceMax, 10));
      }
      return distancias;
    });
  } catch (e) {
    return 'Paciente no encontrado';
  }
};


module.exports = {
  getAll, get, agregar, eliminar, listadoPorEspecialidad, getDistanciaMedicosPorPaciente,
};
