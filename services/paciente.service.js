const pacientes = require('../dao/paciente.dao');
const distanceService = require('./distance.service');
const medicoDao = require('../dao/medico.dao');
const especialidadService = require('./especialidad.service');

const getAll = () => pacientes.getAll();

const get = (id) => pacientes.get(id);

const agregar = (paciente) => pacientes.agregarPaciente(paciente);

const eliminar = (id) => pacientes.eliminarPaciente(id);

const getMedicosYDistanciaPorEspecialidad = async (idPaciente, filtrosMedico) => {
  if (!especialidadService.validar(filtrosMedico.especialidad)) {
    const error = new Error();
    error.status = 404;
    error.desc = { msg: 'Especialidad no encontrada.' };
    throw error;
  }
  if (filtrosMedico.limit === '0') {
    const error = new Error();
    error.status = 410;
    error.desc = { msg: 'El limite no puede ser 0.' };
    throw error;
  }
  let paciente;
  try {
    paciente = get(idPaciente);
  } catch (error) {
    error.status = 404;
    error.desc = { msg: 'Paciente no encontrado.' };
    throw error;
  }
  const medicos = await medicoDao.getForEspecialidad(filtrosMedico.especialidad);
  if (medicos.length === 0) {
    const error = new Error();
    error.status = 404;
    error.desc = { msg: 'No hay medicos con esa especialidad.' };
    throw error;
  }

  const medicosYDistanciaPromise = [];
  medicos.forEach((medico) => {
    const distancePromise = distanceService.calcularDistancia(paciente.ubicacion, medico.ubicacion);
    medicosYDistanciaPromise.push(distancePromise.then((distance) => ({ distance, medico })));
  });
  return Promise.all(medicosYDistanciaPromise).then((distancias) => {
    distancias.sort((d1, d2) => d1.distance.distance.value - d2.distance.distance.value);
    if (filtrosMedico.limit) {
      return distancias.slice(0, Number.parseInt(filtrosMedico.limit, 10));
    }
    return distancias;
  });
};

module.exports = {
  getAll, get, agregar, eliminar, getMedicosYDistanciaPorEspecialidad,
};
