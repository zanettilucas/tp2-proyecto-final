const distance = require('google-distance-matrix');

// var origins = ['-34.609999, -58.429088'];
// var destinations = ['-34.603651, -58.381678'];

/**
 * Enviador de mails
 * @param {string} origin Origen a calcular
 * @param {string} destination Destino a calcular.
 * @returns {Promise<object>} Distancia y duracion.
 */
const calcularDistancia = async (origin, destination) => {
  distance.key('AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk');
  return new Promise((resolve, reject) => {
    distance.matrix([origin], [destination], (err, distances) => {
      console.log('hola');
      if (err) {
        return console.error(err);
      }
      if (!distances) {
        return console.error('no distances');
      }
      console.log('distances');
      console.log(distances);
      console.log('distances.rows');
      console.log(distances.rows);
      console.log('distances.rows0');
      console.log(distances.rows[0]);
      return resolve(distances.rows[0].elements);
    });
  });
};

module.exports = { calcularDistancia };
