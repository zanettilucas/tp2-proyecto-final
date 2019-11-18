const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET medico/paciente/:idPaciente caso feliz', () => {
  it('medicos más cercanos ordenados del paciente', (done) => {
    chai.request(server)
      .get('/medico/paciente/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET medico/paciente/:idPaciente caso triste', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/medico/paciente/300')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
