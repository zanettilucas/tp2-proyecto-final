const fs = require('fs');
const distance = require('google-distance-matrix');

const medicos = JSON.parse(fs.readFileSync('./data/medicos.json'));
const pacientes = JSON.parse(fs.readFileSync('./data/pacientes.json'));

const obtenerUbicacion = async (id, array) => array.find((x) => x.id === id).ubicacion;

/**
 * calcula distancias.
 * @param {string} origin Origen a calcular
 * @param {string} destination Destino a calcular.
 * @returns {Promise<object>} Distancia y duracion.
 */
const calcularDistancia = async (origin, destination) => {
  distance.key('AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk');
  return new Promise((resolve, reject) => {
    distance.matrix([origin], [destination], (err, distances) => {
      if (err) {
        return reject(new Error(`No se puede calcular distancia: ${err}`));
      }
      if (!distances) {
        return reject(new Error('No hay distancias que calcular.'));
      }
      return resolve(...distances.rows[0].elements);
    });
  });
};

const calcularDistanciaMP = async (pacienteId, medicoId) => {
  const ubicacionPaciente = await obtenerUbicacion(pacienteId, pacientes);
  const ubicacionMedico = await obtenerUbicacion(medicoId, medicos);
  const distanciaYDuracion = await calcularDistancia(ubicacionPaciente, ubicacionMedico);
  distanciaYDuracion.medicoId = medicoId;
  return distanciaYDuracion;
};

const medicosYDistancia = async (pacienteId) => {
  const arrayPromisesDistancia = [];
  medicos.forEach((medico) => {
    arrayPromisesDistancia.push(calcularDistanciaMP(pacienteId, medico.id));
  });
  return Promise.all(arrayPromisesDistancia);
};

module.exports = {
  calcularDistanciaMP,
  medicosYDistancia,
};
