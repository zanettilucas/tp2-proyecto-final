const request = require('http');
const assert = require('assert');
const describe = require('mocha/lib/interfaces/common');
const app = require('../index');

describe('GET /medico/:medicoId/paciente/:pacienteId', () => {
  assert('caso feliz', (done) => {
    request(app)
      .get('/medico/1/paciente/4')
      .expect(200, done);
  });

  assert('caso triste', (done) => {
    request(app)
      .get('/medico/99/paciente/55')
      .expect(418, done);
  });
});
