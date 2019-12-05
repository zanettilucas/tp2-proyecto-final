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
    if (medicos.length === 0) {
      const error = new Error();
      error.status = 404;
      error.desc = { msg: 'No hay medicos con esa especialidad.' };
      throw error;
    }
    if (filtros.limit) {
      if (filtros.limit === '0') {
        const error = new Error();
        error.status = 410;
        error.desc = { msg: 'El limite no puede ser 0.' };
        throw error;
      }
      return medicos.slice(0, Number.parseInt(filtros.limit, 10));
    }
    return medicos;
  }
  const error = new Error();
  error.status = 404;
  error.desc = { msg: 'Especialidad no encontrada.' };
  throw error;
};

const getDistanciaMedicosPorPaciente = async (filtros) => {
  let paciente;
  try {
    paciente = pacienteService.get(filtros.pacienteId);
  } catch (error) {
    error.status = 404;
    error.desc = { msg: 'Paciente no encontrado.' };
    throw error;
  }
  if (filtros.distanceMax === '0') {
    const error = new Error();
    error.status = 410;
    error.desc = { msg: 'La distancia máxima no puede ser 0.' };
    throw error;
  }
  const medicos = getAll();
  const medicosYDistanciaPromise = [];
  medicos.forEach((m) => {
    const distancePromise = distanceService.calcularDistancia(paciente.ubicacion, m.ubicacion);
    medicosYDistanciaPromise.push(distancePromise.then((distance) => ({ distance, medico: m })));
  });
  return Promise.all(medicosYDistanciaPromise).then((distancias) => {
    distancias.sort((d1, d2) => d1.distance.distance.value - d2.distance.distance.value);
    if (filtros.distanceMax) {
      const distanciasMenores = distancias.filter((d) => d.distance.distance.value < Number.parseInt(filtros.distanceMax, 10));
      if (distanciasMenores.length === 0) {
        const error = new Error();
        error.status = 404;
        error.desc = { msg: 'No se encuentran medicos tan cercanos, amplifique la distancia maxima.' };
        throw error;
      }
      return distanciasMenores;
    }
    return distancias;
  });
};


module.exports = {
  getAll, get, agregar, eliminar, listadoPorEspecialidad, getDistanciaMedicosPorPaciente,
};
