const pacientes = require('../dao/paciente.dao');
const distanceService = require('./distance.service');
const medicoDao = require('../dao/medico.dao');
const especialidadService = require('./especialidad.service');

const getAll = () => pacientes.getAll();

const get = (id) => pacientes.get(id);

const agregar = (paciente) => pacientes.agregarPaciente(paciente);

const eliminar = (id) => pacientes.eliminarPaciente(id);

const getMedicosYDistanciaPorEspecialidad = async (idPaciente, filtrosMedico) => {
  const paciente = get(idPaciente);
  let medicos;
  if (especialidadService.validar(filtrosMedico.especialidad)) {
    medicos = await medicoDao.getForEspecialidad(filtrosMedico.especialidad);
  }
  const medicosYDistanciaPromise = [];
  if (medicos !== undefined) {
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
  }
  return 'especialidad no valida';
};

module.exports = {
  getAll, get, agregar, eliminar, getMedicosYDistanciaPorEspecialidad,
};
