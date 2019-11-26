const distance = require('google-distance-matrix');

/**
 * calcula distancias.
 * @param {string} origin Origen a calcular
 * @param {string} destination Destino a calcular.
 * @returns {Promise<object>} Distancia y duracion.
 */
const calcularDistanciaMatrix = async (origin, destination) => {
  distance.key('AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk');
  // AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk api gonza
  // AIzaSyDQ-gTxue4SexJuOWk1tAMI8-TnKFy5xYs api zane
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

const calcularDistancia = async (ubicacionPaciente, ubicacionMedico) => {
  try {
    const distanciaYDuracion = await calcularDistanciaMatrix(ubicacionPaciente, ubicacionMedico);
    return distanciaYDuracion;
  } catch (e) {
    return 'Error obteniendo ubicación';
  }
};

module.exports = {
  calcularDistancia,
};
